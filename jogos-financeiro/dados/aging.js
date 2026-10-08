/* Jogo 5 · Corrida contra o Aging · Crédito e Cobrança (FIN-30 a FIN-32)
   Cada carta é uma fatura de um cliente fictício. Acertou: a fatura é recebida.
   Errou: ela escorrega para "+45 dias" no aging.
   tipo "escolha": opcoes + correta (índice).
   tipo "sequencia": passos na ORDEM CERTA; a tela embaralha e o time monta a ordem. */
window.DADOS_AGING = [
  {
    cliente: 'Agência Rota do Sol (fictícia)', valor: 48000, tipo: 'sequencia',
    pergunta: 'Cliente novo quer faturar a prazo. Coloque a abertura da linha de crédito na ordem certa.',
    passos: [
      'Pedido de crédito por chamado no portal (Credit Management)',
      'Consulta de crédito',
      'Contrato no modelo do Grupo assinado pelo hotel e pelo cliente',
      'Primeiro faturamento a prazo, dentro do limite configurado no PMS'
    ],
    explicacao: 'Depois que o contrato com prazo é assinado, não há volta: a consulta vem antes de assinar. O limite é definido pela consulta, aprovado pela alçada e configurado no PMS.',
    fin: 'FIN-30'
  },
  {
    cliente: 'Brisa Eventos Ltda. (fictícia)', valor: 120000, tipo: 'escolha',
    pergunta: 'A consulta de crédito da empresa deu negativa, mas ela quer fechar um evento. O que o hotel faz?',
    opcoes: [
      'Faturamento a prazo com limite menor.',
      'Pré-pagamento antes da chegada.',
      'Aceita, se o vendedor garantir que conhece o cliente.',
      'Prazo de 60 dias para compensar o risco.'
    ],
    correta: 1,
    explicacao: 'Consulta negativa ou impossível: pré-pagamento antes da chegada.',
    fin: 'FIN-30'
  },
  {
    cliente: 'Sr. Prazildo (hóspede individual)', valor: 6500, tipo: 'escolha',
    pergunta: 'Hóspede individual, cliente frequente, pede para pagar a conta "daqui a 30 dias, por boleto".',
    opcoes: [
      'Pode, se ele for cliente frequente.',
      'Pode, com aprovação do gerente de plantão.',
      'Não: hóspede individual nunca vira devedor.',
      'Pode, com limite de uma diária.'
    ],
    correta: 2,
    explicacao: 'Hóspede individual nunca vira devedor. Linha de crédito é para empresas e agências com contrato.',
    fin: 'FIN-30'
  },
  {
    cliente: 'Operadora Horizonte Tur (fictícia)', valor: 75000, tipo: 'escolha',
    pergunta: 'De quanto em quanto tempo refazer a consulta de crédito de uma operadora de turismo?',
    opcoes: ['A cada 6 meses.', 'Todo ano.', 'Só no primeiro contrato.', 'A cada 3 anos.'],
    correta: 0,
    explicacao: 'Agências, operadoras, aéreas e PMEs: a cada 6 meses. Demais contas com crédito recorrente: todo ano. Novo cliente: sempre antes do contrato. Saldo incomum: refazer.',
    fin: 'FIN-30'
  },
  {
    cliente: 'Construtora Pedra Firme (fictícia)', valor: 32000, tipo: 'escolha',
    pergunta: 'Qual o prazo de pagamento recomendado numa linha de crédito?',
    opcoes: ['Até 15 dias.', 'Até 30 dias.', 'Até 60 dias.', 'Até 90 dias.'],
    correta: 1,
    explicacao: 'Prazo de pagamento recomendado: até 30 dias.',
    fin: 'FIN-30'
  },
  {
    cliente: 'Grupo Congresso Mar Azul (fictício)', valor: 210000, tipo: 'escolha',
    pergunta: 'A parcela do depósito do grupo venceu ontem e não foi paga. O que o contrato permite?',
    opcoes: [
      'Nada: só cobrar no check-out.',
      'A reserva pode ser cancelada.',
      'Dobrar a próxima parcela automaticamente.',
      'Transformar o grupo em hóspedes individuais com crédito.'
    ],
    correta: 1,
    explicacao: 'Adiantamentos cobrados conforme o contrato assinado pelas duas partes. Não pago na data: a reserva pode ser cancelada. O adiantamento é lançado no fólio antes da chegada.',
    fin: 'FIN-31'
  },
  {
    cliente: 'Casamento Lua & Mar (fictício)', valor: 90000, tipo: 'escolha',
    pergunta: 'O evento foi cancelado e o depósito está no PMS. O que acontece com o valor?',
    opcoes: [
      'Fica no PMS até o cliente reclamar.',
      'Vira receita automaticamente.',
      'Decisão formal da gestão: reembolso, adiamento ou multa. O valor não fica parado no PMS.',
      'É devolvido em dinheiro pelo caixa da recepção.'
    ],
    correta: 2,
    explicacao: 'Evento cancelado: decisão formal da gestão (reembolso, adiamento ou multa). O valor não fica parado no PMS.',
    fin: 'FIN-31'
  },
  {
    cliente: 'Laboratório Alfa Bio (fictício)', valor: 27000, tipo: 'escolha',
    pergunta: 'O grupo do laboratório saiu hoje. Em quanto tempo a fatura deve ser enviada?',
    opcoes: ['Até 48h após a saída.', 'Até o fim do mês.', 'Até 30 dias.', 'Quando o cliente pedir.'],
    correta: 0,
    explicacao: 'Faturar em até 48h após a saída, exceto eventos complexos. O prazo é conferido por amostra todo mês. Indicador: prazo médio de envio de faturas, meta até 48h.',
    fin: 'FIN-32'
  },
  {
    cliente: 'Escritório Pena & Tinta Advogados (fictício)', valor: 14000, tipo: 'escolha',
    pergunta: 'O cliente diz que ninguém cobrou. A equipe jura que ligou três vezes. O que faltou na pasta de cobrança?',
    opcoes: [
      'Nada: ligação vale como cobrança.',
      'Uma foto da agenda.',
      'Ligação confirmada por e-mail, guardada no histórico de cobrança.',
      'Um áudio da ligação no celular pessoal.'
    ],
    correta: 2,
    explicacao: 'Pasta de cobrança completa: FNRH e RPS assinadas, garantias, comandas, contrato e histórico de cobrança por e-mail (ligação confirmada por e-mail).',
    fin: 'FIN-32'
  },
  {
    cliente: 'Agência Bons Ventos (fictícia)', valor: 8000, tipo: 'escolha',
    pergunta: 'O aging mostra um saldo CREDOR de R$ 8.000 para a agência (ela pagou a mais). O que fazer?',
    opcoes: [
      'Deixar lá; um dia ela usa.',
      'Lançar como receita do mês.',
      'Devolver ou converter em depósito.',
      'Transferir para outro cliente devedor.'
    ],
    correta: 2,
    explicacao: 'Saldo credor no aging: devolver ou converter em depósito.',
    fin: 'FIN-32'
  },
  {
    cliente: 'Clínica Sorriso Pleno (fictícia)', valor: 19000, tipo: 'escolha',
    pergunta: 'A fatura saiu com 2 diárias a mais. Como corrigir?',
    opcoes: [
      'Apagar a fatura e emitir outra com o mesmo número.',
      'Nota de crédito ou fatura complementar, sempre documentada.',
      'Dar desconto na próxima estadia.',
      'Corrigir à mão na fatura impressa.'
    ],
    correta: 1,
    explicacao: 'Erro de faturamento: nota de crédito ou fatura complementar, sempre documentada.',
    fin: 'FIN-32'
  },
  {
    cliente: 'Empresa Fuga Rápida (fictícia)', valor: 23000, tipo: 'sequencia',
    pergunta: 'A empresa saiu sem pagar. Coloque o tratamento na ordem certa.',
    passos: [
      'Manter em contas a receber',
      'Provisionar (PCLD conforme a regra do país)',
      'Se irrecuperável: validação do GM',
      'Lançar como perda'
    ],
    explicacao: 'Saída sem pagamento: manter em contas a receber e provisionar; irrecuperável, perda após validação do GM.',
    fin: 'FIN-32'
  },
  {
    cliente: 'Incentivo Viagens Premium (fictícia)', valor: 56000, tipo: 'escolha',
    pergunta: 'O cliente foi indicado pelo Grupo Accor. Precisa de prova de solvência no hotel?',
    opcoes: [
      'Não: indicação do Grupo dispensa análise.',
      'Sim: cliente referenciado pelo Grupo também exige prova de solvência guardada no hotel.',
      'Só se o valor passar de R$ 100 mil.',
      'Só na renovação.'
    ],
    correta: 1,
    explicacao: 'Cliente referenciado pelo Grupo também exige prova de solvência guardada no hotel.',
    fin: 'FIN-30'
  },
  {
    cliente: 'Fim do mês · Comitê de crédito', valor: 0, tipo: 'sequencia',
    pergunta: 'Fechamento do mês em crédito e cobrança. Coloque na ordem.',
    passos: [
      'Aging do mês extraído',
      'Aging comentado pelo GM e chefes de departamento',
      'Reunião de crédito',
      'Ata da reunião de crédito arquivada'
    ],
    explicacao: 'Fim do mês: aging comentado pelo GM e chefes de departamento; reunião de crédito com ata. Evidência: aging assinado, ata, cálculo da PCLD, notas de crédito com suporte.',
    fin: 'FIN-32'
  }
];
