# Jogos do Financeiro · Sofitel Rio de Janeiro Ipanema

Pacote de jogos de treinamento para apresentar **ao vivo**, projetados numa tela, com a equipe
dividida em times. Conteúdo em português do Brasil, tirado do **Livro do Financeiro**
(FIN-00 a FIN-52, base FOCUS 2025).

## Demo offline (um arquivo só)

`demo-offline.html` tem todos os jogos dentro de um único arquivo. Funciona sem internet e sem as
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

O placar é um só e soma os pontos de todos os jogos. Ele fica guardado no navegador, então use o
mesmo computador a reunião toda. **Zerar placar** fica no menu.

## Os jogos

**Foco: Controladoria, Compras, Almoxarifado e Recebimento**

| Setor | Jogo | Mecânica | Itens | Procedimentos |
|---|---|---|---|---|
| Compras e Contas a Pagar | **Balcão do Fornecedor** | Fornecedor caricato + barra de paciência; acerto rápido vale bônus | 14 | FIN-40, FIN-41, FIN-03, FIN-51 |
| Recebimento | **Doca de Recebimento** | Esteira: aceitar, recusar, anotar divergência ou alerta de controle antes da caixa cair | 16 | FIN-40, FIN-41, FIN-42 |
| Almoxarifado e A&B | **O Mistério da Garrafa Sumida** | Detetive: abrir envelopes de pista (livro de chaves, requisição, inventário, transferência, PDV, perdas) e apontar a linha onde o controle falhou | 11 casos | FIN-42, FIN-43, FIN-10 |
| Tesouraria e Governança | **Fuga do Cofre** | Escape room: cadeados revelam dígitos do código; erro dispara alarme e tira 30 s da sala | 22 | FIN-01, FIN-02, FIN-20 a FIN-25, regras de ouro |
| Controladoria | **Fechamento do Mês** | Cada carta é uma tarefa do fechamento; erro vira "Pendência"; inclui cartas de montar sequência | 20 | FIN-00 a FIN-03, FIN-41, FIN-50 a FIN-52 |

**Outros setores** (continuam disponíveis no menu)

| Setor | Jogo | Itens | Procedimentos |
|---|---|---|---|
| Recepção / Front Office | **Check-in do Caos** | 15 | FIN-10 a FIN-16 |
| Crédito e Cobrança | **Corrida contra o Aging** | 14 | FIN-30 a FIN-32 |

Balcão e Check-in usam a mesma mecânica (`assets/mec-paciencia.*`); Fechamento e Aging também
(`assets/mec-tabuleiro.*`). Cada página só define os textos e qual arquivo de `dados/` carrega.

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

- `dados/fornecedor.js` · `dados/doca.js` · `dados/garrafa.js` · `dados/cofre.js` · `dados/fechamento.js`
- `dados/checkin.js` · `dados/aging.js` (outros setores)

Cada item tem o texto, as opções, a certa, a explicação e o `fin`. Regra do pacote: **nada
de regra, prazo ou número que não esteja no Livro ou no FOCUS**. Personagens, empresas, valores
de nota e quantidades de garrafa são cenário fictício.

Fotos: veja `midia/LEIA-ME.md`.

## Pendências

- **FOCUS 2025 não foi recebido.** O conteúdo não foi conferido contra ele. Veja `DIVERGENCIAS.md`.
- **Briefing original cortado no item 5.** A mecânica da Corrida contra o Aging foi criada para o
  pacote. Depois, o foco foi ajustado para Controladoria, Compras, Almoxarifado e Recebimento.
- **Parâmetros do Anexo em branco** (alçadas, valor de fundos, limites). Nenhum jogo pergunta
  esses valores, porque o hotel ainda não os definiu.
