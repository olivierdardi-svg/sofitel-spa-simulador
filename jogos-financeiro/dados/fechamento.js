/* Jogo · Fechamento do Mês · Controladoria (FIN-00 a FIN-03, FIN-41, FIN-50, FIN-51, FIN-52)
   Cada carta é uma tarefa do fechamento. Acertou: "Conciliado". Errou: vira "Pendência".
   tipo "escolha": opcoes + correta (índice).
   tipo "sequencia": passos na ORDEM CERTA; a tela embaralha e o time monta a ordem. */
window.DADOS_FECHAMENTO = [
  {
    titulo: 'Três documentos, um pagamento', tipo: 'sequencia',
    pergunta: 'Do pedido ao pagamento ao fornecedor. Coloque na ordem.',
    passos: [
      'Pedido com preço, quantidade e total, aprovado antes da compra',
      'Recebimento conferido contra o pedido por quem não comprou',
      'Nota fiscal conferida contra pedido e recebimento, lançada por quem não recebeu',
      'Pagamento aprovado por duas pessoas, conforme a procuração'
    ],
    explicacao: 'Pedido = recebimento = nota fiscal (preço e quantidade · o que chegou · o que foi cobrado). Pede o chefe de departamento, aprova a alçada, recebe quem não comprou, lança quem não recebeu.',
    fin: 'FIN-40 · FIN-41'
  },
  {
    titulo: 'Conciliação da receita', tipo: 'escolha',
    pergunta: 'Na conciliação de receita do mês, qual é a ordem?',
    opcoes: [
      'Primeiro contabilidade = banco; o PMS não entra.',
      'Primeiro PDV (A&B, spa) = PMS; depois PMS = contabilidade.',
      'Primeiro PMS = contabilidade; o PDV se ajusta depois.',
      'Só o PMS, que já tem tudo.'
    ],
    correta: 1,
    explicacao: 'Receita: primeiro PDV (A&B, spa) = PMS; depois PMS = contabilidade.',
    fin: 'FIN-50'
  },
  {
    titulo: 'A conta esquecida', tipo: 'escolha',
    pergunta: 'Uma conta bancária do hotel está parada, sem movimento, há 3 meses. O que fazer?',
    opcoes: [
      'Deixar aberta, pode ser útil um dia.',
      'Parar de conciliar, já que não mexe.',
      'Encerrar. Até lá, conciliar todas as contas, inclusive as inativas.',
      'Transferir o saldo para o fundo fixo.'
    ],
    correta: 2,
    explicacao: 'Bancos: todas as contas, inclusive inativas, conciliadas, com natureza e idade de cada pendência. Conta parada há 3 meses: encerrar.',
    fin: 'FIN-50'
  },
  {
    titulo: 'Provisões do mês', tipo: 'escolha',
    pergunta: 'Provisões de A&B, PCLD, folha, férias, bônus, litígios e fees. O que se faz no fechamento?',
    opcoes: [
      'Somar a nova provisão à do mês anterior.',
      'Estornar a do mês anterior e lançar a nova.',
      'Lançar provisão só no fim do ano.',
      'Manter a do mês anterior se o valor for parecido.'
    ],
    correta: 1,
    explicacao: 'Provisões: estornar a do mês anterior e lançar a nova. Cada conciliação vai para a pasta de fechamento, datada e assinada pelo Controller e com ciência do GM.',
    fin: 'FIN-50'
  },
  {
    titulo: 'Fee da administradora', tipo: 'escolha',
    pergunta: 'O que conferir antes de lançar um fee?',
    opcoes: [
      'Só se o valor é parecido com o do mês passado.',
      'Base, percentual, cálculo e prazo, contra o contrato.',
      'Nada: quem calcula é a sede.',
      'Só o prazo de pagamento.'
    ],
    correta: 1,
    explicacao: 'Fees: base, percentual, cálculo e prazo conferidos contra o contrato antes de lançar.',
    fin: 'FIN-50'
  },
  {
    titulo: 'Colchões novos', tipo: 'escolha',
    pergunta: 'O hotel troca TODOS os colchões de um andar. OPEX ou CAPEX?',
    opcoes: ['OPEX: é manutenção.', 'CAPEX: substituição integral.', 'Depende de quem comprou.', 'Nenhum dos dois: é estoque.'],
    correta: 1,
    explicacao: 'CAPEX: compra inicial, substituição integral, melhoria ou troca de padrão. OPEX: reparo parcial, manutenção, marketing, treinamento, gastos pré-operacionais. Critério: natureza, valor e vida útil.',
    fin: 'FIN-50'
  },
  {
    titulo: 'Ar-condicionado do 304', tipo: 'escolha',
    pergunta: 'Troca de uma peça do ar-condicionado de um quarto (reparo parcial). OPEX ou CAPEX?',
    opcoes: ['CAPEX: é equipamento.', 'OPEX: reparo parcial.', 'CAPEX, se passar de R$ 1.000.', 'Vai para o fundo FF&E.'],
    correta: 1,
    explicacao: 'Reparo parcial e manutenção são OPEX. CAPEX é compra inicial, substituição integral, melhoria ou troca de padrão.',
    fin: 'FIN-50'
  },
  {
    titulo: 'Treinamento de pré-abertura', tipo: 'escolha',
    pergunta: 'Este treinamento, feito antes da abertura do hotel. OPEX ou CAPEX?',
    opcoes: ['CAPEX: faz parte da abertura.', 'CAPEX: vai durar anos.', 'OPEX: treinamento e gastos pré-operacionais.', 'Nenhum: não é lançado.'],
    correta: 2,
    explicacao: 'Treinamento e gastos pré-operacionais são OPEX, mesmo antes da abertura.',
    fin: 'FIN-50'
  },
  {
    titulo: 'Pendência antiga', tipo: 'escolha',
    pergunta: 'Uma pendência contábil está aberta há 3 meses. O que diz o procedimento?',
    opcoes: [
      'Esperar se resolver sozinha.',
      'Lançar como perda.',
      'Pendências com mais de 2 meses são resolvidas com o centro contábil.',
      'Mover para o mês seguinte até o fim do ano.'
    ],
    correta: 2,
    explicacao: 'Todo lançamento no resultado com documento. Pendências com mais de 2 meses resolvidas com o centro contábil.',
    fin: 'FIN-50'
  },
  {
    titulo: 'Planilha de CAPEX', tipo: 'sequencia',
    pergunta: 'Na planilha de acompanhamento do CAPEX, linha a linha. Coloque as colunas na ordem do ciclo.',
    passos: [
      'Orçado: aprovado pelo proprietário no ano',
      'Comprometido: pedidos com carta de compromisso',
      'Realizado: notas recebidas e validadas'
    ],
    explicacao: 'Orçado, comprometido, realizado. Planilha por projeto e departamento, atualizada todo mês; estouro sempre justificado.',
    fin: 'FIN-51'
  },
  {
    titulo: 'Fundo de reserva FF&E', tipo: 'escolha',
    pergunta: 'Onde fica o dinheiro da reserva FF&E?',
    opcoes: [
      'Na conta principal do hotel, junto com a operação.',
      'Em conta bancária própria, conciliada com a contabilidade.',
      'No cofre do hotel.',
      'Na conta da administradora.'
    ],
    correta: 1,
    explicacao: 'FF&E reserve em conta bancária própria, conciliada com a contabilidade. No fim do ano, relatório dos investimentos realizados ao proprietário.',
    fin: 'FIN-51'
  },
  {
    titulo: 'Folha: quem faz o quê', tipo: 'escolha',
    pergunta: 'Pessoas & Cultura prepara a folha. Quem autoriza o pagamento?',
    opcoes: [
      'A própria Pessoas & Cultura, que conhece os números.',
      'O chefe de cada departamento.',
      'A Contabilidade.',
      'O GM ou Controller. Quem prepara a folha não autoriza o pagamento.'
    ],
    correta: 3,
    explicacao: 'Prepara: Pessoas & Cultura · confere ponto: chefe do departamento · contabiliza: Contabilidade · autoriza: GM ou Controller. Quem prepara a folha não autoriza o pagamento.',
    fin: 'FIN-52 · Regras de ouro'
  },
  {
    titulo: 'Folha deste mês', tipo: 'escolha',
    pergunta: 'Antes de pagar a folha, o que o GM ou Controller faz com o resumo?',
    opcoes: [
      'Assina sem comparar, porque P&C já conferiu.',
      'Assina o resumo da folha e encargos, compara com o mês anterior e explica as variações relevantes.',
      'Só confere o total do banco.',
      'Nada: a folha é paga automaticamente.'
    ],
    correta: 1,
    explicacao: 'A folha é a maior despesa do hotel. Antes de pagar: resumo assinado, comparação com o mês anterior e variações relevantes explicadas.',
    fin: 'FIN-52'
  },
  {
    titulo: 'Adiantamento salarial', tipo: 'escolha',
    pergunta: 'Um colaborador pede adiantamento. O que precisa?',
    opcoes: [
      'Pedido verbal ao chefe; sai do fundo fixo.',
      'Pedido individual assinado, aprovado pelo GM ou Controller, limitado ao valor já adquirido.',
      'Qualquer valor, desconta no mês seguinte.',
      'Pago pelo cartão corporativo.'
    ],
    correta: 1,
    explicacao: 'Adiantamento: pedido individual assinado, aprovado pelo GM ou Controller, limitado ao valor já adquirido. Nunca pago com fundo ou cartão corporativo.',
    fin: 'FIN-52 · FIN-24'
  },
  {
    titulo: 'Nova conta do colaborador', tipo: 'escolha',
    pergunta: 'Chega um e-mail: "Sou o colaborador X, troquem minha conta salário para esta." O que fazer?',
    opcoes: [
      'Trocar: o e-mail tem o nome dele.',
      'Trocar e avisar depois.',
      'Nova conta só apresentada pessoalmente e assinada pelo colaborador, com comprovante na pasta.',
      'Pagar metade em cada conta.'
    ],
    correta: 2,
    explicacao: 'Nova conta bancária do colaborador: apresentada pessoalmente e assinada por ele; comprovante na pasta.',
    fin: 'FIN-52'
  },
  {
    titulo: 'Saída de colaborador', tipo: 'escolha',
    pergunta: 'Um colaborador saiu hoje. Quando os acessos dele (PMS, PDV, banco, folha) são desativados?',
    opcoes: ['No mesmo dia.', 'Na revisão trimestral.', 'No fim do mês.', 'Quando a TI tiver tempo.'],
    correta: 0,
    explicacao: 'Na saída de um colaborador, desativar todos os acessos no mesmo dia. A cada trimestre, lista de usuários de cada sistema revisada, assinada e arquivada (ACDC: todo mês).',
    fin: 'FIN-02'
  },
  {
    titulo: 'Login de time', tipo: 'escolha',
    pergunta: 'O bar quer um login "BAR01" para todo mundo usar no PDV. Pode?',
    opcoes: [
      'Pode, se a senha for trocada todo mês.',
      'Pode, só no turno da noite.',
      'Não: todo acesso é nominal. Login genérico é proibido.',
      'Pode, se o gerente souber a senha.'
    ],
    correta: 2,
    explicacao: 'Todo acesso é nominal: PMS, PDV, ACDC, banco, folha, extranets. Login genérico é proibido. Senhas trocadas a cada 3 meses; telas bloqueiam após 15 minutos sem uso.',
    fin: 'FIN-02'
  },
  {
    titulo: 'Contrato vencendo', tipo: 'escolha',
    pergunta: 'Com que frequência a lista de datas críticas (contratos, seguros, alvarás, impostos) é revisada e assinada?',
    opcoes: ['Todo mês.', 'Uma vez por ano.', 'Só quando algo vence.', 'Na auditoria.'],
    correta: 0,
    explicacao: 'Lista no modelo Accor Critical Date List, revisada e assinada todo mês; renovar antes do vencimento. Seguros conferidos uma vez por ano.',
    fin: 'FIN-03'
  },
  {
    titulo: 'Arquivo do controle', tipo: 'escolha',
    pergunta: 'Como arquivar um controle digitalizado?',
    opcoes: [
      'Planilha editável, para corrigir depois.',
      'Foto no celular de quem fez.',
      'PDF não editável, com data, executor e supervisor identificáveis; guardado pelo prazo legal ou, sem prazo legal, 1 ano.',
      'Não precisa arquivar se foi feito no sistema.'
    ],
    correta: 2,
    explicacao: 'Controle não documentado é controle não feito. Digitalizar só em formato não editável (PDF). Arquivo organizado por procedimento e por mês.',
    fin: 'FIN-00'
  },
  {
    titulo: 'A nota da auditoria', tipo: 'escolha',
    pergunta: 'Na nota da Auditoria Interna, a partir de quanto o resultado é satisfatório?',
    opcoes: ['Acima de 50%.', 'Acima de 60%.', 'Acima de 70%.', 'Só 100%.'],
    correta: 2,
    explicacao: 'Acima de 70% é satisfatório. Abaixo de 50%, o hotel não antecipa riscos de fraude.',
    fin: 'Livro, p. 02'
  }
];
