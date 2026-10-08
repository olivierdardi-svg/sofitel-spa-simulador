#!/usr/bin/env python3
"""Gera demo-offline.html: todos os jogos num único arquivo, sem depender de internet
nem das pastas assets/ e dados/.

Uso (a partir de qualquer pasta):
    python3 jogos-financeiro/ferramentas/gerar-demo.py

Rode de novo sempre que mudar uma pergunta em dados/ ou o código dos jogos.
"""
import json
import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
JOGOS = ['balcao-do-fornecedor', 'doca-de-recebimento', 'garrafa-sumida', 'fuga-do-cofre', 'fechamento-do-mes',
         'checkin-do-caos', 'corrida-do-aging']


def ler(rel):
    return (RAIZ / rel).read_text(encoding='utf-8')


def css_offline():
    # Sem internet a fonte do Google não carrega; tira o @import e usa as fontes do sistema.
    return re.sub(r"@import url\([^)]*\);\s*", '', ler('assets/estilo.css'))


def embutir(html):
    """Troca <link> e <script src> pelo conteúdo dos arquivos."""
    def estilo(m):
        css = css_offline() if m.group(1) == 'assets/estilo.css' else ler(m.group(1))
        return '<style>\n' + css + '\n</style>'
    html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', estilo, html)

    def script(m):
        codigo = ler(m.group(1)).replace('</script', '<\\/script')
        return '<script>\n' + codigo + '\n</script>'
    html = re.sub(r'<script src="([^"]+)"></script>', script, html)
    assert 'src="assets' not in html and 'src="dados' not in html and 'href="assets' not in html
    return html


def main():
    paginas = {j: embutir(ler(j + '.html')) for j in JOGOS}
    hub = embutir(ler('index.html'))

    # Os cartões do menu abrem o jogo numa camada por cima, em vez de navegar.
    for j in JOGOS:
        alvo = 'href="' + j + '.html"'
        assert alvo in hub, j
        hub = hub.replace(alvo, 'href="#" data-jogo="' + j + '"')

    dados = json.dumps(paginas, ensure_ascii=False).replace('</', '<\\/')
    camada = """
<div id="camadaJogo" style="display:none;position:fixed;inset:0;z-index:100;background:#12151c">
  <iframe id="quadroJogo" title="Jogo" allow="fullscreen; autoplay" allowfullscreen style="width:100%;height:100%;border:0;display:block"></iframe>
</div>
<script>
(function () {
  var PAGINAS = """ + dados + """;
  var camada = document.getElementById('camadaJogo');
  var quadro = document.getElementById('quadroJogo');
  window.fecharJogo = function () {
    camada.style.display = 'none';
    quadro.srcdoc = '';
    document.body.style.overflow = '';
    Motor.renderPlacar();
  };
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-jogo]');
    if (!a) return;
    e.preventDefault();
    quadro.srcdoc = PAGINAS[a.getAttribute('data-jogo')];
    camada.style.display = 'block';
    document.body.style.overflow = 'hidden';
    quadro.onload = function () { try { quadro.contentWindow.focus(); } catch (err) {} };
  });
})();
</script>
"""
    hub = hub.replace('</body>', camada + '</body>')
    hub = hub.replace('<title>Jogos do Financeiro</title>', '<title>Jogos do Financeiro (demo offline)</title>')
    saida = RAIZ / 'demo-offline.html'
    saida.write_text(hub, encoding='utf-8')
    print('Gerado:', saida, '(%d KB)' % (saida.stat().st_size // 1024))


if __name__ == '__main__':
    main()
