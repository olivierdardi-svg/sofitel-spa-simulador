/* Motor compartilhado dos Jogos do Financeiro.
   Times e placar (guardados no navegador entre um jogo e outro), sons sintetizados,
   atalhos de teclado, confete e tela de revisão. Não depende de internet. */
(function () {
  'use strict';

  var CHAVE = 'jogosFinanceiro.times.v1';
  var CORES = ['#e0564f', '#5aa0e0', '#3fb27f', '#e8a93a', '#b07be0', '#4fc6c6'];
  var NOMES_PADRAO = ['Time Ipanema', 'Time Leblon', 'Time Arpoador', 'Time Copacabana', 'Time Lagoa', 'Time Urca'];

  function lerArmazenado() {
    try {
      var bruto = localStorage.getItem(CHAVE);
      if (bruto) {
        var t = JSON.parse(bruto);
        if (Array.isArray(t) && t.length) return t;
      }
    } catch (e) { /* navegador sem armazenamento: segue com padrão */ }
    return null;
  }

  function timesPadrao(n) {
    var lista = [];
    for (var i = 0; i < n; i++) lista.push({ nome: NOMES_PADRAO[i], cor: CORES[i], pontos: 0 });
    return lista;
  }

  /* Na demo offline (arquivo único), cada jogo roda dentro de um iframe:
     o placar e o botão de menu são os da página-mãe. */
  var mae = null;
  try { if (window.parent !== window && window.parent.Motor) mae = window.parent.Motor; } catch (e) { mae = null; }

  var Motor = {
    times: mae ? mae.times : (lerArmazenado() || timesPadrao(3)),
    ativo: 0,
    mudo: false,
    CORES: CORES,
    NOMES_PADRAO: NOMES_PADRAO,

    salvar: function () {
      if (mae) { mae.salvar(); return; }
      try { localStorage.setItem(CHAVE, JSON.stringify(Motor.times)); } catch (e) { /* ignora */ }
    },

    /* Volta ao menu. Retorna false quando já tratou (demo offline), para o link não navegar. */
    irMenu: function () {
      if (mae && window.parent.fecharJogo) { window.parent.fecharJogo(); return false; }
      location.href = 'index.html';
      return false;
    },

    definirTimes: function (lista) {
      Motor.times = lista.map(function (t, i) {
        return { nome: t.nome || NOMES_PADRAO[i], cor: CORES[i % CORES.length], pontos: t.pontos || 0 };
      });
      Motor.ativo = 0;
      Motor.salvar();
      Motor.renderPlacar();
    },

    zerarPlacar: function () {
      Motor.times.forEach(function (t) { t.pontos = 0; });
      Motor.salvar();
      Motor.renderPlacar();
    },

    pontuar: function (i, pts) {
      if (i == null || !Motor.times[i]) return;
      Motor.times[i].pontos += pts;
      Motor.salvar();
      Motor.renderPlacar();
      var chip = document.querySelector('.chip[data-i="' + i + '"]');
      if (chip) { chip.classList.remove('pulso'); void chip.offsetWidth; chip.classList.add('pulso'); }
    },

    definirAtivo: function (i) {
      Motor.ativo = ((i % Motor.times.length) + Motor.times.length) % Motor.times.length;
      Motor.renderPlacar();
    },

    proximoTime: function () { Motor.definirAtivo(Motor.ativo + 1); },

    timeAtivo: function () { return Motor.times[Motor.ativo]; },

    renderPlacar: function () {
      var el = document.getElementById('placar');
      if (!el) return;
      var html = '<span class="vez">Vez de</span>';
      Motor.times.forEach(function (t, i) {
        html += '<div class="chip' + (i === Motor.ativo ? ' ativo' : '') + '" data-i="' + i + '" style="--cor:' + t.cor + '">' +
          '<span class="bola"></span><span class="nome" title="Clique para passar a vez a este time">' + esc(t.nome) + '</span>' +
          '<span class="pts">' + t.pontos + '</span>' +
          '<span class="mm"><button data-d="-50" title="Tirar 50 pontos">−</button><button data-d="50" title="Dar 50 pontos (roubo, bônus)">+</button></span></div>';
      });
      el.innerHTML = html;
    },

    /* ---------- Sons (Web Audio, sem arquivos) ---------- */
    _ctx: null,
    _audio: function () {
      if (Motor.mudo) return null;
      try {
        if (!Motor._ctx) Motor._ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (Motor._ctx.state === 'suspended') Motor._ctx.resume();
        return Motor._ctx;
      } catch (e) { return null; }
    },
    _tom: function (freq, ini, dur, tipo, vol, freqFim) {
      var ctx = Motor._audio(); if (!ctx) return;
      var o = ctx.createOscillator(), g = ctx.createGain(), t0 = ctx.currentTime + ini;
      o.type = tipo || 'sine';
      o.frequency.setValueAtTime(freq, t0);
      if (freqFim) o.frequency.linearRampToValueAtTime(freqFim, t0 + dur);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(vol || 0.2, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(ctx.destination);
      o.start(t0); o.stop(t0 + dur + 0.05);
    },
    som: {
      acerto: function () { Motor._tom(660, 0, .15, 'triangle', .25); Motor._tom(880, .12, .15, 'triangle', .25); Motor._tom(1320, .24, .3, 'triangle', .22); },
      erro: function () { Motor._tom(220, 0, .25, 'sawtooth', .15, 160); Motor._tom(150, .22, .45, 'sawtooth', .15, 90); },
      tique: function () { Motor._tom(1200, 0, .05, 'square', .06); },
      clique: function () { Motor._tom(500, 0, .06, 'square', .05); },
      alarme: function () {
        for (var k = 0; k < 4; k++) { Motor._tom(600, k * .5, .25, 'square', .12, 1100); Motor._tom(1100, k * .5 + .25, .25, 'square', .12, 600); }
      },
      buzina: function () { Motor._tom(110, 0, .7, 'sawtooth', .18); Motor._tom(116, 0, .7, 'sawtooth', .12); },
      vitoria: function () { [523, 659, 784, 1047, 784, 1047].forEach(function (f, k) { Motor._tom(f, k * .13, .22, 'triangle', .22); }); },
      cofre: function () { Motor._tom(90, 0, .5, 'sine', .3, 60); Motor._tom(300, .1, .08, 'square', .08); Motor._tom(240, .22, .08, 'square', .08); }
    },

    /* ---------- Utilitários ---------- */
    embaralhar: function (arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; }
      return a;
    },
    esc: esc,

    /* Rola a tela até o elemento (resposta, pergunta-bônus) sem esconder atrás do placar. */
    mostrarNaTela: function (el) {
      if (!el) return;
      setTimeout(function () { try { el.scrollIntoView({ behavior: 'smooth', block: 'end' }); } catch (e) { /* ignora */ } }, 60);
    },

    /* Monta as opções de uma pergunta embaralhadas, guardando qual é a certa. */
    prepararOpcoes: function (q) {
      var itens = q.opcoes.map(function (txt, i) { return { txt: txt, certa: i === q.correta }; });
      return Motor.embaralhar(itens);
    },

    confete: function () {
      for (var i = 0; i < 70; i++) {
        var c = document.createElement('div');
        c.className = 'confete';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.background = CORES[i % CORES.length];
        c.style.animationDuration = (1.8 + Math.random() * 1.8) + 's';
        c.style.animationDelay = (Math.random() * .4) + 's';
        document.body.appendChild(c);
        setTimeout(function (n) { return function () { n.remove(); }; }(c), 4200);
      }
    },

    telaCheia: function () {
      try {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
      } catch (e) { /* ignora */ }
    },

    alternarSom: function () {
      Motor.mudo = !Motor.mudo;
      var b = document.getElementById('btnSom');
      if (b) b.textContent = Motor.mudo ? '🔇 Som' : '🔊 Som';
    },

    /* Pódio + tabela de revisão (pergunta, resposta, explicação, FIN). */
    renderRevisao: function (alvo, titulo, linhas) {
      var ord = Motor.times.map(function (t, i) { return { t: t, i: i }; }).sort(function (a, b) { return b.t.pontos - a.t.pontos; });
      var html = '<div class="revisao"><h2>' + esc(titulo) + '</h2><div class="podio">';
      ord.forEach(function (o, k) {
        html += '<div class="lugar' + (k === 0 ? ' primeiro' : '') + '" style="border-top:6px solid ' + o.t.cor + '">' +
          (k === 0 ? '🏆 ' : (k + 1) + 'º ') + esc(o.t.nome) + '<b>' + o.t.pontos + '</b></div>';
      });
      html += '</div><table><thead><tr><th>Situação</th><th>Resposta certa</th><th>Procedimento</th></tr></thead><tbody>';
      linhas.forEach(function (l) {
        html += '<tr><td>' + esc(l.situacao) + '</td><td>' + esc(l.resposta) + '</td><td><span class="fin">' + esc(l.fin) + '</span></td></tr>';
      });
      html += '</tbody></table><p style="margin-top:1.2em;display:flex;gap:.6em;flex-wrap:wrap">' +
        '<a class="btn" href="index.html" onclick="return Motor.irMenu()" style="text-decoration:none">← Voltar ao menu</a>' +
        '<button class="btn sec" onclick="location.reload()">Jogar de novo</button></p></div>';
      alvo.innerHTML = html;
      Motor.som.vitoria();
      Motor.confete();
    },

    /* Liga placar, botões do topo e atalhos comuns. extra(e) trata as teclas do jogo. */
    iniciarPagina: function (extra, textoAjuda) {
      Motor.renderPlacar();
      var placar = document.getElementById('placar');
      if (placar) placar.addEventListener('click', function (e) {
        var chip = e.target.closest('.chip'); if (!chip) return;
        var i = +chip.getAttribute('data-i');
        var b = e.target.closest('button');
        if (b) Motor.pontuar(i, +b.getAttribute('data-d'));
        else if (e.target.closest('.nome')) Motor.definirAtivo(i);
      });
      var bt = document.getElementById('btnTela'); if (bt) bt.onclick = Motor.telaCheia;
      var bs = document.getElementById('btnSom'); if (bs) bs.onclick = Motor.alternarSom;
      var ba = document.getElementById('btnAjuda'); if (ba) ba.onclick = function () { Motor.ajuda(textoAjuda); };
      document.addEventListener('keydown', function (e) {
        if (e.target.matches('input,select,textarea')) return;
        var k = e.key.toLowerCase();
        if (document.querySelector('.ajuda')) { document.querySelector('.ajuda').remove(); return; }
        if (k === 'f') { Motor.telaCheia(); return; }
        if (k === 'm') { Motor.alternarSom(); return; }
        if (k === 'h') { Motor.irMenu(); return; }
        if (k === '?') { Motor.ajuda(textoAjuda); return; }
        if (k === 'n') { Motor.proximoTime(); return; }
        if (extra) extra(e, k);
      });
    },

    ajuda: function (itens) {
      var comuns = [['F', 'Tela cheia'], ['M', 'Som liga/desliga'], ['N', 'Passar a vez ao próximo time'], ['H', 'Voltar ao menu'], ['?', 'Esta ajuda']];
      var html = '<div class="ajuda"><div class="cartao"><h3 class="serif" style="font-size:1.6em;margin-bottom:.4em">Atalhos do apresentador</h3><ul>';
      (itens || []).concat(comuns).forEach(function (p) { html += '<li><kbd>' + p[0] + '</kbd>' + p[1] + '</li>'; });
      html += '<li class="muted" style="margin-top:.8em">No placar: clique no nome para passar a vez; + e − dão ou tiram 50 pontos (roubo, bônus, ajuste).</li></ul><p class="muted" style="margin-top:.6em">Qualquer tecla fecha.</p></div></div>';
      var d = document.createElement('div'); d.innerHTML = html;
      var el = d.firstChild; el.onclick = function () { el.remove(); };
      document.body.appendChild(el);
    },

    /* Mostra uma foto da pasta midia/ se existir; se não carregar, fica o emoji. */
    imagemOuEmoji: function (src, emoji, classe) {
      if (!src) return '<span class="' + (classe || '') + '">' + emoji + '</span>';
      return '<img class="' + (classe || '') + '" src="' + esc(src) + '" alt="" onerror="this.outerHTML=\'<span class=&quot;' + (classe || '') + '&quot;>' + emoji + '</span>\'">';
    }
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  window.Motor = Motor;
})();
