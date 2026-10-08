# Jogos do Financeiro · Sofitel Rio de Janeiro Ipanema

Pacote de 5 jogos de treinamento para apresentar **ao vivo**, projetados numa tela, com a equipe
dividida em times. Conteúdo em português do Brasil, tirado do **Livro do Financeiro**
(FIN-00 a FIN-52, base FOCUS 2025).

## Demo offline (um arquivo só)

`demo-offline.html` tem os 5 jogos dentro de um único arquivo. Funciona sem internet e sem as
pastas `assets/` e `dados/`: dá para mandar por e-mail, pôr num pen drive e abrir com dois
cliques. Usa as fontes do sistema em vez da fonte do Google.

Ele é gerado a partir dos arquivos da pasta. Depois de mudar qualquer pergunta em `dados/`,
gere de novo:

```
python3 jogos-financeiro/ferramentas/gerar-demo.py
```

## Como abrir

1. Abra `index.html` no navegador (Chrome ou Edge). Não precisa instalar nada nem de internet;
   sem internet, só a fonte muda.
2. Monte os times (2 a 6), clique em **Salvar times**.
3. Escolha o jogo. Aperte **F** para tela cheia.

O placar é um só e soma os pontos dos 5 jogos. Ele fica guardado no navegador, então use o
mesmo computador a reunião toda. **Zerar placar** fica no menu.

## Os jogos

| # | Setor | Jogo | Mecânica | Procedimentos |
|---|---|---|---|---|
| 1 | Recepção / Front Office | **Check-in do Caos** | Hóspede caricato + barra de paciência; acerto rápido vale bônus | FIN-10 a FIN-16 |
| 2 | Caixa e Tesouraria | **Fuga do Cofre** | Escape room: cadeados revelam dígitos do código; erro dispara alarme e tira 30 s da sala | FIN-20 a FIN-25 |
| 3 | A&B | **O Mistério da Garrafa Sumida** | Detetive: abrir envelopes de pista (inventário, requisição, PDV, perdas) e apontar a linha onde a conta não fecha | FIN-10, FIN-42, FIN-43 |
| 4 | Compras e Almoxarifado | **Doca de Recebimento** | Esteira: aceitar, recusar, anotar divergência ou alerta de controle antes da caixa cair | FIN-40, FIN-41, FIN-42 |
| 5 | Crédito e Cobrança | **Corrida contra o Aging** | Cada carta é uma fatura; erro manda para "+45 dias"; inclui cartas de montar sequência | FIN-30 a FIN-32 |

Toda resposta mostra a explicação curta e o procedimento de origem. No fim de cada jogo aparece
o pódio e uma tabela de revisão com todas as situações, respostas e FIN.

## Atalhos do apresentador

| Tecla | Ação |
|---|---|
| 1 a 4 | Escolher a resposta (no jogo 4: aceitar, recusar, divergência, alerta) |
| Espaço / Enter | Próxima rodada |
| P | Pausar o relógio |
| N | Passar a vez para o próximo time |
| F | Tela cheia |
| M | Som liga/desliga |
| H | Voltar ao menu |
| ? | Ajuda |

No placar: clique no **nome** de um time para dar a vez a ele; **+** e **−** dão ou tiram 50
pontos (roubo, bônus, ajuste do apresentador).

## Duração aproximada

Estimativa, não medida: com 3 times e as quantidades padrão, cada jogo leva em torno de 15 a 25
minutos, dependendo de quanto o grupo discute cada resposta. Dá para reduzir o número de rodadas
na tela de abertura de cada jogo.

## Como editar o conteúdo

As perguntas ficam separadas do código, em `dados/`:

- `dados/checkin.js` · `dados/cofre.js` · `dados/garrafa.js` · `dados/doca.js` · `dados/aging.js`

Cada item tem o texto, as opções, a certa, a explicação e o `fin`. Regra do pacote: **nada
de regra, prazo ou número que não esteja no Livro ou no FOCUS**. Personagens, empresas, valores
de nota e quantidades de garrafa são cenário fictício.

Fotos: veja `midia/LEIA-ME.md`.

## Pendências

- **FOCUS 2025 não foi recebido.** O conteúdo não foi conferido contra ele. Veja `DIVERGENCIAS.md`.
- **Briefing cortado no item 5.** O pedido terminou em "5. Crédito e Cobrança (FIN-30 a FIN-32):".
  A mecânica do jogo 5 foi criada para o pacote. Se havia mais jogos previstos (por exemplo,
  Fechamento FIN-50 a FIN-52 ou Governança FIN-00 a FIN-03), eles ainda não existem.
- **Parâmetros do Anexo em branco** (alçadas, valor de fundos, limites). Nenhum jogo pergunta
  esses valores, porque o hotel ainda não os definiu.
