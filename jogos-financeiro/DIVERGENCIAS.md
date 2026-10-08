# Divergências FOCUS 2025 x Livro do Financeiro

## Situação: a comparação com o FOCUS não foi feita

Na pasta recebida só havia o **Livro do Financeiro** (Edição 1, out/2026, 32 páginas).
O PDF do **FOCUS 2025** e a pasta `midia/` não estavam lá. Por isso:

- **Todo o conteúdo dos jogos vem só do Livro.** Nenhuma regra foi conferida contra o FOCUS.
- **Nenhuma divergência FOCUS x Livro pode ser afirmada ou descartada.** Este arquivo lista
  o que precisa ser conferido quando o FOCUS estiver disponível.
- Se o FOCUS disser diferente em qualquer item abaixo, vale o FOCUS: corrigir o arquivo
  em `dados/` indicado e anotar aqui.

## 1. Números e prazos usados nos jogos (conferir no FOCUS)

| Regra usada no jogo | Livro | Jogo / arquivo |
|---|---|---|
| Contas PM encerradas em até 48h após o check-out (exceto grandes eventos e grupos) | FIN-12 | Check-in do Caos · `dados/checkin.js` |
| Estadia longa: nova pré-autorização toda semana, pagamento parcial a partir de 5 dias | FIN-11 | Check-in do Caos |
| Outside of stay: máximo 5 créditos por membro por dia; correção no ACDC em até 7 dias | FIN-16 | Check-in do Caos |
| Booking.com: validação até 30 dias após a saída | FIN-15 | Check-in do Caos |
| Diferença de caixa e de fundo fixo: corrigir em até 48h | FIN-20, FIN-21 | Fuga do Cofre · `dados/cofre.js` |
| Código do cofre trocado a cada 6 meses e na saída de quem o conhece | FIN-21 | Fuga do Cofre |
| Senhas dos sistemas trocadas a cada 3 meses (usado como pegadinha) | FIN-02 | Fuga do Cofre |
| Spot-check: fundo individual todo mês, compartilhado todo trimestre | FIN-20 | Fuga do Cofre |
| Certificação PCI DSS renovada todo ano (VigiTrust) | FIN-25 | Fuga do Cofre |
| Não homologado abaixo de 1 salário mínimo: basta a Carta de Compras Responsáveis | FIN-40 | Doca de Recebimento · `dados/doca.js` |
| Prazo de pagamento recomendado: até 30 dias | FIN-30 | Corrida contra o Aging · `dados/aging.js` |
| Nova consulta de crédito: 6 meses (agências, operadoras, aéreas, PMEs), 1 ano (demais) | FIN-30 | Corrida contra o Aging |
| Faturar em até 48h após a saída | FIN-32 | Corrida contra o Aging |
| Aging acima de 45 dias como indicador do mês | FIN-32 | Corrida contra o Aging |
| Fornecedor não homologado: 3 cotações, documentos legais, Carta de Compras Responsáveis, cláusula CSR, lista aprovada | FIN-40 | Balcão do Fornecedor · `dados/fornecedor.js` |
| Nota com data antiga volta ao fornecedor; só nota original é lançada | FIN-41 | Balcão do Fornecedor |
| Itens sem giro há mais de 90 dias: lista para vender primeiro | FIN-42 | Garrafa Sumida · `dados/garrafa.js` |
| Telas bloqueiam após 15 minutos sem uso; senhas a cada 3 meses | FIN-02 | Fuga do Cofre, Fechamento do Mês |
| Conta bancária parada há 3 meses: encerrar | FIN-50 | Fechamento do Mês · `dados/fechamento.js` |
| Pendências contábeis com mais de 2 meses resolvidas com o centro contábil | FIN-50 | Fechamento do Mês |
| Nota da auditoria: acima de 70% satisfatório, abaixo de 50% não antecipa fraude | Livro, p. 02 | Fechamento do Mês |

## 2. Pontos do próprio Livro que merecem confirmação

Não são contradições claras, mas podem confundir a equipe. Vale conferir no FOCUS qual é a regra.

1. **Quem aprova a compra.** FIN-40 diz "Aprova: alçada; acima dela, GM". FIN-41 diz que o pedido
   é aprovado "pelo chefe do departamento e depois pelo GM **ou Controller**". O Controller
   aparece só em um dos dois. Os jogos não perguntam sobre isso.
2. **Prazo das contas PM no calendário.** O calendário (página 04) diz "Contas PM e open folios
   (máx. 48h)", sem a exceção de grandes eventos e grupos que está no FIN-12. O jogo usa a
   versão do FIN-12, com a exceção.
3. **Amostra do consumo x vendas.** FIN-43 traz "5 alimentos por mês, incluindo proteínas" e
   "15 bebidas por mês". Não foi usado em pergunta, mas é número que vale conferir.

4. **O que fazer na doca com temperatura, validade ou aspecto fora do padrão.** O FIN-40 manda
   conferir temperatura, validade e aspecto no recebimento, mas só diz o que fazer com divergência
   de quantidade e preço (anotar e pedir nota de crédito). Por isso a Doca de Recebimento não tem
   nenhuma entrega com produto vencido ou fora da temperatura: a resposta seria inventada.
   Vale conferir no FOCUS se ele diz "recusar".

## 3. Interpretações feitas nos jogos (não são regra escrita no Livro)

- **Doca de Recebimento, botão "Alerta de controle".** O Livro diz o que é proibido (quem compra
  não recebe; dado bancário só muda com duas aprovações; compra precisa de pedido aprovado), mas
  não diz o que a doca faz na hora. O jogo agrupa esses casos como "alerta de controle", sem
  inventar um procedimento novo.
- **OPEX ou CAPEX (Fechamento do Mês).** O Livro dá o critério (natureza, valor e vida útil) e
  exemplos. As cartas usam só casos que caem direto nos exemplos: substituição integral (CAPEX),
  reparo parcial (OPEX), treinamento e gastos pré-operacionais (OPEX). Casos de fronteira dependem
  de valor e vida útil, que o Livro não fixa.
- **Garrafa Sumida.** As quantidades de garrafas são cenário fictício. As regras testadas
  (mesas abertas, requisição com três papéis, cortesia lançada no PDV, perda validada, par stock,
  inventário às cegas) estão no FIN-10, FIN-42 e FIN-43.
- **Corrida contra o Aging.** O briefing do jogo 5 chegou cortado (sem ideia de mecânica).
  A mecânica foi criada para o pacote e pode ser trocada.
- **Valores em reais** de faturas, notas e pedidos são cenário fictício, não limite nem alçada.
  As alçadas reais são "parâmetros a definir" no Anexo do Livro e ainda estão em branco.
