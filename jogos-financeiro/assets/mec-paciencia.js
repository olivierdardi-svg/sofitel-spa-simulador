/* Mecânica "paciência" (jogos de personagem + barra de tempo).
   A página define window.CFG_JOGO = { dados, item, acerto, tempo, proximo, ultimo, tituloFim }. */
(function () {
  var C = window.CFG_JOGO, D = C.dados;
  var $ = function (id) { return document.getElementById(id); };
  var fila = [], idx = 0, total = 45, resta = 45, timer = null, pausado = false, respondido = false, opcoesAtuais = [];
  var revisao = [];

  var sel = $('cfgQtd');
  for (var n = 3; n <= D.length; n++) sel.innerHTML += '<option' + (n === Math.min(10, D.length) ? ' selected' : '') + '>' + n + '</option>';

  $('btnComecar').onclick = function () {
    total = +$('cfgSeg').value;
    fila = $('cfgAleat').checked ? Motor.embaralhar(D) : D.slice();
    fila = fila.slice(0, +sel.value);
    $('telaAbertura').classList.add('oculto');
    $('telaJogo').classList.remove('oculto');
    idx = 0; mostrar();
  };

  function mostrar() {
    var h = fila[idx];
    respondido = false; pausado = false; resta = total;
    $('btnProx').classList.add('oculto');
    $('btnPausa').classList.remove('oculto');
    $('btnPausa').textContent = '⏸ Pausar (P)';
    $('resposta').innerHTML = '';
    $('contador').textContent = C.item + ' ' + (idx + 1) + ' de ' + fila.length + ' · vez do ' + Motor.timeAtivo().nome;
    var hosp = $('hospede');
    hosp.className = 'hospede chegando';
    hosp.innerHTML = Motor.imagemOuEmoji(h.midia, h.avatar, 'avatar') +
      '<div class="nome">' + Motor.esc(h.nome) + '</div>' +
      '<div class="balao">“' + Motor.esc(h.fala) + '”</div>' +
      (h.contexto ? '<div class="contexto">' + Motor.esc(h.contexto) + '</div>' : '');
    $('pergunta').textContent = h.pergunta;
    opcoesAtuais = Motor.prepararOpcoes(h);
    $('opcoes').innerHTML = opcoesAtuais.map(function (o, i) {
      return '<button class="opcao" data-i="' + i + '"><span class="tecla">' + (i + 1) + '</span><span>' + Motor.esc(o.txt) + '</span></button>';
    }).join('');
    atualizarBarra();
    clearInterval(timer);
    timer = setInterval(passo, 250);
    Motor.som.clique();
  }

  function passo() {
    if (pausado || respondido) return;
    var antes = Math.ceil(resta);
    resta = Math.max(0, resta - 0.25);
    if (Math.ceil(resta) !== antes && resta <= 10 && resta > 0) Motor.som.tique();
    atualizarBarra();
    if (resta <= 0) responder(null);
  }

  function atualizarBarra() {
    var p = resta / total;
    $('barra').style.width = (p * 100) + '%';
    $('seg').textContent = Math.ceil(resta);
    $('rosto').textContent = p > .66 ? '😊' : p > .4 ? '😐' : p > .2 ? '😠' : '🤬';
    $('paciencia').className = 'paciencia' + (p <= .2 ? ' critico' : p <= .4 ? ' alerta' : '');
  }

  function responder(i) {
    if (respondido) return;
    respondido = true;
    clearInterval(timer);
    var h = fila[idx];
    var certa = i != null && opcoesAtuais[i].certa;
    document.querySelectorAll('#opcoes .opcao').forEach(function (b, k) {
      b.disabled = true;
      if (opcoesAtuais[k].certa) b.classList.add('certa');
      else if (k === i) b.classList.add('errada');
      else b.classList.add('apagada');
    });
    var titulo, extra = '';
    if (certa) {
      var bonus = Math.round(100 * resta / total);
      Motor.pontuar(Motor.ativo, 100 + bonus);
      Motor.som.acerto();
      titulo = C.acerto + ' +' + (100 + bonus) + ' pontos (' + bonus + ' de bônus de paciência)';
    } else {
      Motor.som[i == null ? 'buzina' : 'erro']();
      $('hospede').classList.add('explodiu');
      $('hospede').insertAdjacentHTML('beforeend', '<span class="fumaca">💢</span>');
      $('rosto').textContent = '🤯';
      titulo = i == null ? C.tempo : '✘ Resposta errada!';
      if (h.reacaoErro) extra = '<p class="muted" style="margin-bottom:.4em"><i>' + Motor.esc(h.reacaoErro) + '</i></p>';
    }
    var certaTxt = opcoesAtuais.filter(function (o) { return o.certa; })[0].txt;
    $('resposta').innerHTML = '<div class="resposta' + (certa ? '' : ' mal') + '"><h3>' + titulo + '</h3>' + extra +
      '<p>' + Motor.esc(h.explicacao) + '</p><span class="fin">' + Motor.esc(h.fin) + '</span></div>';
    revisao.push({ situacao: h.nome + ': ' + h.pergunta, resposta: certaTxt, fin: h.fin });
    $('btnPausa').classList.add('oculto');
    $('btnProx').classList.remove('oculto');
    Motor.mostrarNaTela($('btnProx'));
    $('btnProx').textContent = idx + 1 < fila.length ? C.proximo + ' ▶ (Espaço)' : C.ultimo + ' ▶';
  }

  function proximo() {
    if (!respondido) return;
    idx++;
    if (idx >= fila.length) { fim(); return; }
    Motor.proximoTime();
    mostrar();
  }

  function fim() {
    $('telaJogo').classList.add('oculto');
    $('telaFim').classList.remove('oculto');
    Motor.renderRevisao($('telaFim'), C.tituloFim, revisao);
  }

  function pausar() {
    if (respondido) return;
    pausado = !pausado;
    $('btnPausa').textContent = pausado ? '▶ Continuar (P)' : '⏸ Pausar (P)';
  }

  $('opcoes').addEventListener('click', function (e) {
    var b = e.target.closest('.opcao'); if (b) responder(+b.getAttribute('data-i'));
  });
  $('btnProx').onclick = proximo;
  $('btnPausa').onclick = pausar;

  Motor.iniciarPagina(function (e, k) {
    if ($('telaJogo').classList.contains('oculto')) {
      if ((k === 'enter' || k === ' ') && !$('telaAbertura').classList.contains('oculto')) { e.preventDefault(); $('btnComecar').click(); }
      return;
    }
    if (k >= '1' && k <= '4') { var i = +k - 1; if (i < opcoesAtuais.length) responder(i); }
    else if (k === ' ' || k === 'enter') { e.preventDefault(); proximo(); }
    else if (k === 'p') pausar();
  }, [['1–4', 'Escolher a resposta'], ['P', 'Pausar a paciência'], ['Espaço', C.proximo]]);
})();
