/* Mecânica "tabuleiro" (cartas de escolha ou de sequência; acerto vai para uma coluna, erro para outra).
   A página define window.CFG_JOGO = { dados, item, itemPlural, moeda, relogio(p), carimboOk, carimboMal,
   acerto, erro, tempo, proximo, ultimo, tituloFim(ok, mal, pct) }. */
(function () {
  var C = window.CFG_JOGO, D = C.dados;
  var $ = function (id) { return document.getElementById(id); };
  var fila = [], idx = 0, total = 45, resta = 45, timer = null, pausado = false, feito = false;
  var opc = [], pool = [], montada = [], recebido = 0, vencido = 0, revisao = [];
  var brl = function (v) { return 'R$ ' + v.toLocaleString('pt-BR'); };
  // Com moeda, soma o valor das cartas; sem moeda, conta as cartas.
  var peso = function (c) { return C.moeda ? (c.valor || 0) : 1; };
  var fmt = function (v) { return C.moeda ? brl(v) : String(v); };
  var nome = function (c) { return c.titulo || c.cliente; };

  var sel = $('cfgQtd');
  for (var n = 3; n <= D.length; n++) sel.innerHTML += '<option' + (n === Math.min(10, D.length) ? ' selected' : '') + '>' + n + '</option>';

  $('btnComecar').onclick = function () {
    total = +$('cfgSeg').value;
    fila = ($('cfgAleat').checked ? Motor.embaralhar(D) : D.slice()).slice(0, +sel.value);
    $('telaAbertura').classList.add('oculto');
    $('telaJogo').classList.remove('oculto');
    idx = 0; atualizarTabuleiro(); mostrar();
  };

  function atualizarTabuleiro() {
    $('qAberto').textContent = (fila.length - idx - (feito ? 1 : 0)) + ' ' + C.itemPlural;
    $('sRec').textContent = fmt(recebido);
    $('sVenc').textContent = fmt(vencido);
    var t = recebido + vencido;
    $('pct').textContent = (t ? Math.round(100 * vencido / t) : 0) + '%';
    $('pct').style.color = vencido > 0 ? 'var(--erro)' : 'var(--ok)';
  }

  function mostrar() {
    var c = fila[idx];
    feito = false; pausado = false; resta = total; montada = [];
    $('vezTxt').innerHTML = C.item + ' ' + (idx + 1) + ' de ' + fila.length + ' · vez do <b style="color:' + Motor.timeAtivo().cor + '">' + Motor.esc(Motor.timeAtivo().nome) + '</b>';
    var html = '<div class="topo-f"><div><div class="rot">' + (c.tipo === 'sequencia' ? 'Monte a sequência' : 'Escolha a ação') + '</div><div class="cli">' + Motor.esc(nome(c)) + '</div></div>' +
      (C.moeda && c.valor ? '<div class="val">' + brl(c.valor) + '</div>' : '') + '</div>' +
      '<div class="pergunta">' + Motor.esc(c.pergunta) + '</div>' +
      '<div class="dias"><span>📅</span><div class="trilho"><div class="barra" id="barra"></div>' + (C.marca === false ? '' : '<div class="marca" style="left:66.6%"></div>') + '</div><span class="num" id="dias">' + C.relogio(0) + '</span></div>';
    if (c.tipo === 'sequencia') {
      pool = Motor.embaralhar(c.passos.map(function (t, i) { return { txt: t, pos: i }; }));
      html += '<div class="seq"><div class="rot">Passos (clique na ordem que o time ditar)</div><div class="pool" id="pool"></div>' +
        '<div class="rot">Ordem do time</div><div class="montada" id="montada"></div>' +
        '<div style="display:flex;gap:.5em;justify-content:flex-end"><button class="btn sec" id="btnLimpar" style="color:#1d1a14;border-color:#b9ad92">↺ Limpar</button><button class="btn" id="btnConferir">Conferir ordem ✓</button></div></div>';
    } else {
      opc = Motor.prepararOpcoes(c);
      html += '<div class="opcoes" id="opcoes">' + opc.map(function (o, i) {
        return '<button class="opcao" data-i="' + i + '"><span class="tecla">' + (i + 1) + '</span><span>' + Motor.esc(o.txt) + '</span></button>';
      }).join('') + '</div>';
    }
    var f = $('fatura');
    f.style.animation = 'none'; void f.offsetWidth; f.style.animation = '';
    f.innerHTML = html;
    if (c.tipo === 'sequencia') {
      desenharSeq();
      $('btnLimpar').onclick = function () { if (!feito) { montada = []; desenharSeq(); } };
      $('btnConferir').onclick = conferirSeq;
    }
    $('resposta').innerHTML = '';
    $('btnProx').classList.add('oculto');
    $('btnPausa').classList.remove('oculto');
    $('btnPausa').textContent = '⏸ Parar o relógio (P)';
    atualizarTabuleiro();
    clearInterval(timer);
    timer = setInterval(passo, 250);
    Motor.som.clique();
  }

  function desenharSeq() {
    $('pool').innerHTML = pool.map(function (p, i) {
      var usado = montada.indexOf(i) >= 0;
      return '<button class="passo' + (usado ? ' usado' : '') + '" data-p="' + i + '"><span class="n">•</span><span>' + Motor.esc(p.txt) + '</span></button>';
    }).join('');
    var h = montada.map(function (pi, k) { return '<div class="passo" data-m="' + k + '"><span class="n">' + (k + 1) + '</span><span>' + Motor.esc(pool[pi].txt) + '</span></div>'; }).join('');
    for (var k = montada.length; k < pool.length; k++) h += '<div class="vazio">' + (k + 1) + '. …</div>';
    $('montada').innerHTML = h;
  }

  function passo() {
    if (pausado || feito) return;
    var antes = Math.ceil(resta);
    resta = Math.max(0, resta - .25);
    if (Math.ceil(resta) !== antes && resta <= 5 && resta > 0) Motor.som.tique();
    var p = 1 - resta / total;
    $('barra').style.width = (p * 100) + '%';
    $('dias').textContent = C.relogio(p);
    if (resta <= 0) concluir(false, true);
  }

  function responder(i) {
    if (feito || fila[idx].tipo === 'sequencia' || i >= opc.length) return;
    document.querySelectorAll('#opcoes .opcao').forEach(function (b, k) {
      b.disabled = true;
      b.classList.add(opc[k].certa ? 'certa' : (k === i ? 'errada' : 'apagada'));
    });
    concluir(opc[i].certa, false);
  }

  function conferirSeq() {
    if (feito) return;
    if (montada.length < pool.length) { Motor.som.erro(); return; }
    var ok = montada.every(function (pi, k) { return pool[pi].pos === k; });
    document.querySelectorAll('#montada .passo').forEach(function (el, k) {
      el.classList.add(pool[montada[k]].pos === k ? 'certo' : 'errado');
    });
    concluir(ok, false);
  }

  function concluir(certo, tempo) {
    if (feito) return;
    feito = true;
    clearInterval(timer);
    var c = fila[idx];
    var f = $('fatura');
    f.insertAdjacentHTML('beforeend', '<div class="carimbo ' + (certo ? 'pago' : 'vencido') + '">' + (certo ? C.carimboOk : C.carimboMal) + '</div>');
    var ficha = '<span class="fichinha">' + Motor.esc(nome(c).replace(/\s*\(.*\)$/, '')) + (C.moeda && c.valor ? ' · ' + brl(c.valor) : '') + '</span>';
    if (certo) { recebido += peso(c); $('fRec').insertAdjacentHTML('beforeend', ficha); Motor.pontuar(Motor.ativo, 100); Motor.som.acerto(); }
    else { vencido += peso(c); $('fVenc').insertAdjacentHTML('beforeend', ficha); Motor.som[tempo ? 'buzina' : 'erro'](); }
    atualizarTabuleiro();
    var certaTxt = c.tipo === 'sequencia' ? c.passos.map(function (p, k) { return (k + 1) + '. ' + p; }).join(' → ') :
      opc.filter(function (o) { return o.certa; })[0].txt;
    var titulo = certo ? C.acerto + ' +100 pontos' : (tempo ? C.tempo : C.erro);
    $('resposta').innerHTML = '<div class="resposta' + (certo ? '' : ' mal') + '"><h3>' + titulo + '</h3>' +
      (certo ? '' : '<p><b>Resposta certa:</b> ' + Motor.esc(certaTxt) + '</p>') +
      '<p>' + Motor.esc(c.explicacao) + '</p><span class="fin">' + Motor.esc(c.fin) + '</span></div>';
    if (tempo && c.tipo !== 'sequencia') {
      document.querySelectorAll('#opcoes .opcao').forEach(function (b, k) { b.disabled = true; b.classList.add(opc[k].certa ? 'certa' : 'apagada'); });
    }
    revisao.push({ situacao: nome(c) + ': ' + c.pergunta, resposta: certaTxt, fin: c.fin });
    $('btnPausa').classList.add('oculto');
    $('btnProx').textContent = idx + 1 < fila.length ? C.proximo + ' ▶ (Espaço)' : C.ultimo + ' ▶';
    $('btnProx').classList.remove('oculto');
    Motor.mostrarNaTela($('btnProx'));
  }

  function proximo() {
    if (!feito) return;
    idx++;
    if (idx >= fila.length) {
      var t = recebido + vencido;
      $('telaJogo').classList.add('oculto');
      $('telaFim').classList.remove('oculto');
      Motor.renderRevisao($('telaFim'), C.tituloFim(fmt(recebido), fmt(vencido), t ? Math.round(100 * vencido / t) : 0), revisao);
      return;
    }
    Motor.proximoTime();
    mostrar();
  }

  function pausar() {
    if (feito) return;
    pausado = !pausado;
    $('btnPausa').textContent = pausado ? '▶ Continuar o relógio (P)' : '⏸ Parar o relógio (P)';
  }

  $('fatura').addEventListener('click', function (e) {
    var b = e.target.closest('.opcao'); if (b) { responder(+b.getAttribute('data-i')); return; }
    var p = e.target.closest('.passo[data-p]');
    if (p && !feito) {
      var i = +p.getAttribute('data-p');
      if (montada.indexOf(i) < 0) { montada.push(i); Motor.som.clique(); desenharSeq(); }
      return;
    }
    var m = e.target.closest('.passo[data-m]');
    if (m && !feito) { montada.splice(+m.getAttribute('data-m'), 1); desenharSeq(); }
  });
  $('btnProx').onclick = proximo;
  $('btnPausa').onclick = pausar;

  Motor.iniciarPagina(function (e, k) {
    if ($('telaJogo').classList.contains('oculto')) {
      if ((k === 'enter' || k === ' ') && !$('telaAbertura').classList.contains('oculto')) { e.preventDefault(); $('btnComecar').click(); }
      return;
    }
    if (k >= '1' && k <= '4') responder(+k - 1);
    else if (k === ' ' || k === 'enter') { e.preventDefault(); proximo(); }
    else if (k === 'p') pausar();
  }, [['1–4', 'Escolher a resposta'], ['Clique nos passos', 'Montar a sequência (clique num passo montado para tirar)'], ['P', 'Parar o relógio'], ['Espaço', C.proximo]]);
})();
