/* Jogo · Fuga do Cofre · Tesouraria e Governança (FIN-01, FIN-02, FIN-20 a FIN-25, regras de ouro)
   Cada cadeado é uma pergunta. "tipo": "vf" mostra só Verdadeiro/Falso
   (opcoes: ['Verdadeiro','Falso'], correta 0 ou 1). */
window.DADOS_COFRE = [
  {
    cadeado: 'O cadeado da testemunha', icone: '👀',
    pergunta: 'Um caixa vai colocar o envelope do turno no cofre. Quem precisa estar lá e o que fica registrado?',
    opcoes: [
      'Só o caixa; o envelope já vai lacrado.',
      'Quem deposita + uma testemunha. Os dois assinam o livro do cofre.',
      'O caixa, e o gerente assina no dia seguinte.',
      'Só o Income Auditor, que confere tudo de manhã.'
    ],
    correta: 1,
    explicacao: 'Envelope no cofre sempre com testemunha. O livro do cofre registra departamento, data, nº de envelopes, quem depositou + testemunha, quem retirou + testemunha e o valor de cada envelope retirado.',
    fin: 'FIN-21'
  },
  {
    cadeado: 'O cadeado vendado', icone: '🙈',
    tipo: 'vf',
    pergunta: 'No fechamento do turno, o caixa pode olhar o valor do PMS na tela enquanto conta o dinheiro, para achar a diferença mais rápido.',
    opcoes: ['Verdadeiro', 'Falso'],
    correta: 1,
    explicacao: 'Falso. A contagem é às cegas: o caixa conta sem ver o valor do PMS. Depois, PMS x físico; diferenças corrigidas em 48h.',
    fin: 'FIN-21'
  },
  {
    cadeado: 'O cadeado do segredo', icone: '🔢',
    pergunta: 'De quanto em quanto tempo o código do cofre é trocado?',
    opcoes: [
      'A cada 3 meses.',
      'Uma vez por ano.',
      'A cada 6 meses e sempre que sair alguém que conhece o código.',
      'Só quando alguém esquece.'
    ],
    correta: 2,
    explicacao: 'Código trocado a cada 6 meses e sempre que sair alguém que o conhece. (A cada 3 meses é a troca de senhas dos sistemas, FIN-02. Pegadinha!)',
    fin: 'FIN-21'
  },
  {
    cadeado: 'O cadeado do troco que sumiu', icone: '⏳',
    pergunta: 'O caixa fechou com R$ 30,00 a menos. Qual o prazo para explicar e corrigir, e o que acontece se não resolver?',
    opcoes: [
      'Até o fim do mês; se não resolver, ninguém precisa saber.',
      'Até 48h, informando a contabilidade. Não resolvida: perda, com aprovação formal do GM ou Controller.',
      'Até 7 dias; se não resolver, desconta do caixa.',
      'Na hora; se não achar, completa com o fundo de despesas.'
    ],
    correta: 1,
    explicacao: 'Diferença: explicar, informar a contabilidade e corrigir em até 48h. Não resolvida: perda, com aprovação formal do GM ou Controller.',
    fin: 'FIN-21 · FIN-20'
  },
  {
    cadeado: 'O cadeado da passagem de turno', icone: '🤝',
    pergunta: 'Troca de turno no fundo fixo da recepção. Como é feita a passagem?',
    opcoes: [
      'Quem sai deixa um bilhete com o valor.',
      'Quem entra conta sozinho depois que o outro saiu.',
      'Contagem detalhada pelos dois, ao mesmo tempo, com documento assinado pelos dois.',
      'Não precisa contar: o fundo é fixo.'
    ],
    correta: 2,
    explicacao: 'Passagem de turno: contagem detalhada pelos dois, ao mesmo tempo, com documento assinado pelos dois.',
    fin: 'FIN-20'
  },
  {
    cadeado: 'O cadeado da visita surpresa', icone: '🎲',
    pergunta: 'Spot-check do fundo fixo INDIVIDUAL: com que frequência e por quem?',
    opcoes: [
      'Todo mês, em data aleatória, por quem não é responsável pelo fundo, na presença do responsável ou de testemunha.',
      'Uma vez por ano, pelo próprio responsável.',
      'Todo trimestre, sempre no último dia útil.',
      'Só quando aparece diferença.'
    ],
    correta: 0,
    explicacao: 'Fundo individual: spot-check todo mês, em data aleatória. Fundo compartilhado: todo trimestre. Feito por quem não é responsável pelo fundo, na presença do responsável ou de testemunha.',
    fin: 'FIN-20'
  },
  {
    cadeado: 'O cadeado do motoboy', icone: '🛵',
    tipo: 'vf',
    pergunta: 'Posso pegar o dinheiro recebido hoje para pagar o motoboy e depositar só o resto.',
    opcoes: ['Verdadeiro', 'Falso'],
    correta: 1,
    explicacao: 'Falso. Depositar todo o recebimento em dinheiro do dia. Nunca usar recebimento para pagar despesa ou reembolso.',
    fin: 'FIN-22'
  },
  {
    cadeado: 'O cadeado do cartão fatiado', icone: '✂️',
    pergunta: 'O hóspede pede para passar R$ 4.000 em duas cobranças de R$ 2.000 no mesmo cartão, "porque o limite é apertado". O que fazer?',
    opcoes: [
      'Passar em duas vezes, é o mesmo valor.',
      'Passar em duas vezes, mas em dias diferentes.',
      'Nunca dividir um valor em duas cobranças no mesmo cartão.',
      'Passar uma parte no cartão e a outra em dinheiro do fundo.'
    ],
    correta: 2,
    explicacao: 'Cuidado no recebimento com cartão: nunca dividir um valor em duas cobranças no mesmo cartão.',
    fin: 'FIN-22'
  },
  {
    cadeado: 'O cadeado do dólar disfarçado', icone: '🍁',
    tipo: 'vf',
    pergunta: 'Dólar canadense e dólar americano: é tudo dólar, pode receber pela mesma taxa.',
    opcoes: ['Verdadeiro', 'Falso'],
    correta: 1,
    explicacao: 'Falso. Cuidado com moedas de mesmo nome e aparência parecida, como dólar americano e dólar canadense. A taxa do PMS é atualizada todo dia com a cotação enviada pela sede e conciliada com a taxa exibida.',
    fin: 'FIN-23'
  },
  {
    cadeado: 'O cadeado do caixinha', icone: '🧾',
    pergunta: 'Qual destas despesas PODE sair do fundo de despesas (petty cash)?',
    opcoes: [
      'Adiantamento de salário de um colaborador.',
      'Reembolso a um cliente.',
      'Compra pequena e excepcional, quando o fornecedor habitual não atende, com nota original no CNPJ do hotel.',
      'Passagem e hotel de uma viagem a trabalho.'
    ],
    correta: 2,
    explicacao: 'Fundo de despesas: só despesa pequena e excepcional, com nota original no CNPJ do hotel. Nunca: folha, viagens, CAPEX, reembolso a cliente, saque em dinheiro.',
    fin: 'FIN-24'
  },
  {
    cadeado: 'O cadeado do paid-out', icone: '📦',
    pergunta: 'O hóspede pede que a recepção pague uma entrega e lance na conta dele. O que precisa existir ANTES de o dinheiro sair?',
    opcoes: [
      'Pedido assinado pelo hóspede antes do desembolso, depois conciliado com a conta no PMS.',
      'Só o lançamento no PMS.',
      'Um e-mail do entregador.',
      'Autorização verbal do hóspede por telefone.'
    ],
    correta: 0,
    explicacao: 'Paid-out: pedido assinado pelo hóspede antes do desembolso, conciliado com a conta no PMS.',
    fin: 'FIN-24'
  },
  {
    cadeado: 'O cadeado do CVV', icone: '🛡️',
    pergunta: 'Como receber o pré-pagamento de uma reserva sem violar o PCI DSS?',
    opcoes: [
      'Pedir que o cliente mande os dados do cartão por e-mail.',
      'Pedir número, validade e CVV por telefone e anotar na ficha.',
      'Usar um formulário de outra empresa.',
      'Por SecurePayByLink. Nunca pedir cartão por e-mail e nunca guardar CVV ou PIN.'
    ],
    correta: 3,
    explicacao: 'Sempre: pré-pagamento por SecurePayByLink; documentos com cartão em armário trancado; fragmentadora DIN3. Nunca: pedir cartão por e-mail ou formulário de terceiro, guardar CVV ou PIN.',
    fin: 'FIN-25'
  },
  {
    cadeado: 'O cadeado do estorno', icone: '↩️',
    pergunta: 'Quem pode fazer estorno no terminal de cartão, e o que conferir?',
    opcoes: [
      'Qualquer pessoa do turno, desde que anote no livro.',
      'Só pessoa autorizada, com cartão de acesso restrito, conferindo que o cartão creditado é o mesmo debitado.',
      'O hóspede, sozinho, no terminal.',
      'Quem estiver com a senha do terminal, em qualquer cartão que o hóspede indicar.'
    ],
    correta: 1,
    explicacao: 'Estorno no terminal só por pessoa autorizada, com cartão de acesso restrito, conferindo que o cartão creditado é o mesmo debitado. Estornar em cartão diferente do original: nunca.',
    fin: 'FIN-25'
  },
  {
    cadeado: 'O cadeado do diploma', icone: '🎓',
    tipo: 'vf',
    pergunta: 'Fiz a certificação PCI DSS na abertura do hotel; vale para sempre.',
    opcoes: ['Verdadeiro', 'Falso'],
    correta: 1,
    explicacao: 'Falso. Certificação PCI DSS de todos os envolvidos, renovada todo ano na plataforma VigiTrust.',
    fin: 'FIN-25'
  },
  {
    cadeado: 'O cadeado das duas chaves', icone: '🗝️',
    pergunta: 'Segregação de funções. Quem altera o dado bancário de um fornecedor...',
    opcoes: [
      '...pode aprovar o pagamento, se conferir duas vezes.',
      '...não aprova o pagamento.',
      '...aprova o pagamento sozinho, para ganhar tempo.',
      '...só precisa avisar o fornecedor.'
    ],
    correta: 1,
    explicacao: 'Quem altera dado bancário não aprova o pagamento. Quem manuseia dinheiro não altera o PMS nem lança na contabilidade. Quem compra não recebe nem lança a nota. Quem prepara a folha não autoriza o pagamento.',
    fin: 'Regras de ouro · FIN-41'
  },
  {
    cadeado: 'O cadeado do caixa que lança', icone: '💼',
    tipo: 'vf',
    pergunta: 'Quem fecha o caixa pode corrigir o valor no PMS e fazer o lançamento contábil da diferença, para agilizar.',
    opcoes: ['Verdadeiro', 'Falso'],
    correta: 1,
    explicacao: 'Falso. Quem manuseia dinheiro não altera o PMS nem lança na contabilidade. Diferença de caixa: explicar, informar a contabilidade e corrigir em até 48h.',
    fin: 'Regras de ouro · FIN-21'
  },
  {
    cadeado: 'O cadeado da equipe pequena', icone: '👥',
    pergunta: 'Na pré-abertura a equipe é pequena demais para separar todas as funções. O que o procedimento manda?',
    opcoes: [
      'Ignorar a segregação até a equipe crescer.',
      'O GM ou Controller define por escrito um controle compensatório, com revisão por terceiro.',
      'Cada um confere o próprio trabalho com mais atenção.',
      'Pedir à auditoria para não avaliar esse ponto.'
    ],
    correta: 1,
    explicacao: 'Equipe pequena demais para separar? O GM ou Controller define por escrito um controle compensatório, com revisão por terceiro, escrito e assinado.',
    fin: 'Regras de ouro · FIN-02'
  },
  {
    cadeado: 'O cadeado do post-it', icone: '🟨',
    tipo: 'vf',
    pergunta: 'Pode deixar a senha do PMS num post-it no monitor, desde que seja trocada a cada 3 meses.',
    opcoes: ['Verdadeiro', 'Falso'],
    correta: 1,
    explicacao: 'Falso. Senhas trocadas a cada 3 meses e NUNCA anotadas à vista. Telas bloqueiam após 15 minutos sem uso; cada um sai do sistema ao fim do turno.',
    fin: 'FIN-02'
  },
  {
    cadeado: 'O cadeado da carta de cortesia', icone: '✉️',
    pergunta: 'Quem pode conceder uma cortesia?',
    opcoes: [
      'Qualquer gerente, de boca.',
      'Quem tem carta individual com nome e limite mensal, conforme a matriz de alçadas assinada pelo GM.',
      'Qualquer pessoa, se o cliente for importante.',
      'Só o hóspede pode pedir; ninguém precisa conceder.'
    ],
    correta: 1,
    explicacao: 'Matriz de alçadas assinada pelo GM, com nome e cargo de cada autorizado. Carta individual para quem concede cortesia e para quem tem consumo interno, com nome e limite mensal.',
    fin: 'FIN-01'
  },
  {
    cadeado: 'O cadeado do signatário', icone: '📜',
    pergunta: 'Um dos signatários bancários saiu do hotel. O que fazer com a procuração?',
    opcoes: [
      'Nada até a próxima auditoria.',
      'Atualizar as procurações quando um signatário sai ou se ausenta por período longo.',
      'Os outros signatários assinam por ele.',
      'Só tirar o nome dele da matriz de alçadas.'
    ],
    correta: 1,
    explicacao: 'Atualizar as procurações quando um signatário sai ou se ausenta por período longo. Todo pagamento a fornecedor exige duas aprovações, conforme a procuração vigente.',
    fin: 'FIN-01'
  },
  {
    cadeado: 'O cadeado dos três números', icone: '🔺',
    pergunta: 'Fundos fixos no fechamento. Quais três números precisam ser iguais?',
    opcoes: [
      'Valor contábil dos fundos = soma das cartas de responsabilidade = contagem física.',
      'Saldo do banco = PMS = orçamento.',
      'Contagem física = valor do mês anterior = budget.',
      'Soma das cartas = folha de pagamento = PMS.'
    ],
    correta: 0,
    explicacao: 'Valor contábil dos fundos = soma das cartas = contagem física. Diferença não resolvida: repor o fundo e lançar como perda, com aprovação formal do GM ou Controller.',
    fin: 'FIN-20'
  },
  {
    cadeado: 'O cadeado da linha direta', icone: '☎️',
    pergunta: 'Um colaborador desconfia de uma fraude. Qual canal ele pode usar?',
    opcoes: [
      'Só o chefe direto.',
      'Nenhum: precisa de provas antes.',
      'A Integrity Line (accor-integrity.com), seguindo a Diretriz de Reporte de Fraude. Em perigo imediato, acionar as autoridades.',
      'Publicar no grupo da equipe.'
    ],
    correta: 2,
    explicacao: 'Qualquer colaborador pode usar a Integrity Line: accor-integrity.com. Ela não é canal de emergência; em perigo imediato, acionar as autoridades.',
    fin: 'Livro, p. 03'
  }
];
