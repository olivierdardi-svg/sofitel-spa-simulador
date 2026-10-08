/* Jogo · Balcão do Fornecedor · Compras (FIN-40, FIN-41, FIN-03, FIN-51, FIN-24 e regras de ouro)
   Fornecedores e empresas são fictícios. O humor fica nos fornecedores, nunca num cargo da equipe.
   "correta" é o índice (começando em 0) da opção certa; a ordem é embaralhada na tela. */
window.DADOS_FORNECEDOR = [
  {
    nome: 'Sr. Novato da Silva Ltda.', avatar: '🆕', midia: '',
    fala: 'Sou fornecedor novo, nunca vendi pra rede. Meu preço é ótimo, fecha comigo hoje?',
    contexto: 'Ele não é homologado. A compra passa de 1 salário mínimo.',
    pergunta: 'O que Compras precisa antes de comprar dele?',
    opcoes: [
      'Só o preço dele ser o menor do mercado.',
      '3 cotações, documentos legais, Carta de Compras Responsáveis assinada, cláusula CSR no contrato e lista aprovada pelo GM ou Controller.',
      'Basta a nota fiscal na entrega.',
      'Uma indicação de alguém do hotel.'
    ],
    correta: 1,
    explicacao: 'Priorizar homologados (Mercado Eletrônico). Não homologado: 3 cotações, documentos legais, Carta de Compras Responsáveis assinada, cláusula CSR no contrato e lista aprovada pelo GM ou Controller.',
    fin: 'FIN-40',
    reacaoErro: 'Fechou com o preço "ótimo" e sem documento nenhum. A auditoria vai adorar.'
  },
  {
    nome: 'Dona Miudinha Artesanatos', avatar: '🧺', midia: '',
    fala: 'É uma comprinha de nada, abaixo de um salário mínimo. Precisa mesmo de papelada?',
    contexto: 'Fornecedora não homologada. Valor abaixo de 1 salário mínimo.',
    pergunta: 'Qual o mínimo exigido?',
    opcoes: [
      'Nada: abaixo de 1 salário mínimo é livre.',
      'As mesmas 3 cotações de qualquer compra.',
      'Ao menos a Carta de Compras Responsáveis anexada ao pedido.',
      'Só a aprovação verbal do chefe do departamento.'
    ],
    correta: 2,
    explicacao: 'Abaixo de 1 salário mínimo: ao menos a Carta de Compras Responsáveis anexada ao pedido. O pedido continua precisando de aprovação antes da compra.',
    fin: 'FIN-40',
    reacaoErro: 'Comprinha de nada, controle de nada.'
  },
  {
    nome: 'Sr. Boca-a-Boca Distribuidora', avatar: '🗣️', midia: '',
    fala: 'Me liga e fala o que quer, eu já mando. Pedido formal a gente faz depois!',
    contexto: 'Nenhum pedido foi emitido no sistema.',
    pergunta: 'Quando o pedido precisa existir?',
    opcoes: [
      'Antes da compra: com preço unitário, quantidade e total, aprovado.',
      'Depois da entrega, para bater com a nota.',
      'Só quando passar do limite da alçada.',
      'Só no fim do mês, num pedido único com tudo.'
    ],
    correta: 0,
    explicacao: 'Pedido com preço unitário, quantidade e total, aprovado antes da compra. É contra ele que o recebimento confere a entrega e o Contas a Pagar confere a nota.',
    fin: 'FIN-40',
    reacaoErro: 'Chegou mercadoria. Ninguém sabe o preço combinado.'
  },
  {
    nome: 'Sra. Contanova Pescados', avatar: '🏦', midia: '',
    fala: 'Mudamos de banco! Mandei o novo número da conta por e-mail, já pode pagar lá.',
    contexto: 'O e-mail chegou para o Contas a Pagar.',
    pergunta: 'O que o Contas a Pagar faz?',
    opcoes: [
      'Atualiza o cadastro na hora: o e-mail veio do domínio dela.',
      'Atualiza e avisa o gerente depois.',
      'Paga metade em cada conta até confirmar.',
      'A alteração só acontece justificada e aprovada por duas pessoas, por quem foi autorizado a alterar dados bancários.'
    ],
    correta: 3,
    explicacao: 'Alteração de dado bancário é o golpe mais comum contra hotéis. Justificada e aprovada por duas pessoas, com registro manual se o sistema não separar as funções. Quem altera dado bancário não aprova o pagamento.',
    fin: 'FIN-41',
    reacaoErro: 'O pagamento foi para a conta de um golpista. A peixaria continua esperando.'
  },
  {
    nome: 'Sr. Retrô Materiais', avatar: '📼', midia: '',
    fala: 'Achei essa nota de março aqui na gaveta. Paga ela junto com a deste mês?',
    contexto: 'A nota tem data de vários meses atrás.',
    pergunta: 'O que acontece com a nota?',
    opcoes: [
      'Lança normalmente: a dívida existe.',
      'Volta ao fornecedor: só nota original é lançada, e nota com data antiga é devolvida.',
      'Lança e paga com multa.',
      'Lança no mês de março, retroativo.'
    ],
    correta: 1,
    explicacao: 'Conferir os dados legais da nota: data, razão social do hotel, impostos, totais. Só nota original é lançada; nota com data antiga volta ao fornecedor.',
    fin: 'FIN-41',
    reacaoErro: 'Nota de março lançada em outubro. O fechamento agradece a surpresa.'
  },
  {
    nome: 'Sra. Paciência Esgotada Serviços', avatar: '⌛', midia: '',
    fala: 'Minha nota está parada na aprovação há dois meses! Ninguém me responde!',
    contexto: 'A nota foi contestada pelo departamento e ficou esquecida.',
    pergunta: 'Qual a regra para nota contestada?',
    opcoes: [
      'Fica parada até o fornecedor desistir.',
      'Paga para evitar reclamação.',
      'Notas contestadas são revistas todo mês; nenhuma fica parada na aprovação. Cumprir os prazos de pagamento.',
      'Cancela a nota e pede outra no ano que vem.'
    ],
    correta: 2,
    explicacao: 'Cumprir os prazos de pagamento. Notas contestadas revistas todo mês; nenhuma parada na aprovação.',
    fin: 'FIN-41',
    reacaoErro: 'Dois meses viraram seis. A fornecedora virou ex-fornecedora.'
  },
  {
    nome: 'Sr. Pressinha Transportes', avatar: '⚡', midia: '',
    fala: 'Libera meu pagamento hoje? Uma assinatura só já resolve, né?',
    contexto: 'A procuração vigente exige duas aprovações.',
    pergunta: 'Quantas aprovações o pagamento precisa?',
    opcoes: [
      'Uma, se for urgente.',
      'Uma, se o valor for baixo.',
      'Nenhuma, se a nota estiver lançada.',
      'Duas, conforme a procuração vigente. O arquivo de pagamento é não editável e o acesso ao banco é restrito.'
    ],
    correta: 3,
    explicacao: 'Todo pagamento a fornecedor exige duas aprovações, conforme a procuração vigente.',
    fin: 'FIN-41 · FIN-01',
    reacaoErro: 'Pagamento rápido, controle nenhum.'
  },
  {
    nome: 'Sr. Faz-Tudo Facilities', avatar: '🧹', midia: '',
    fala: 'Minha empresa de limpeza começa segunda! Seguro? Certidão? Isso a gente vê depois.',
    contexto: 'É um terceirizado que vai trabalhar dentro do hotel.',
    pergunta: 'O que o hotel precisa ter ANTES de ele começar?',
    opcoes: [
      'Contrato no padrão da sede, apólice de responsabilidade civil e certidões fiscais e trabalhistas em dia, com cópia no hotel.',
      'Só o crachá dos funcionários dele.',
      'Nada: o risco é da empresa dele.',
      'Só o orçamento aprovado.'
    ],
    correta: 0,
    explicacao: 'Terceirizados: contrato no padrão da sede, apólice de RC e certidões fiscais e trabalhistas em dia, cópia no hotel. No contrato, cláusula que obriga a enviar a apólice todo ano.',
    fin: 'FIN-03',
    reacaoErro: 'Acidente na segunda-feira. Apólice? Ninguém tem.'
  },
  {
    nome: 'Sr. Cartãozinho Móveis', avatar: '🛋️', midia: '',
    fala: 'São só seis poltronas novas pro lobby! Passa no cartão corporativo que é mais rápido.',
    contexto: 'É compra de mobiliário novo, investimento (CAPEX).',
    pergunta: 'Pode pagar no cartão corporativo?',
    opcoes: [
      'Pode, se couber no limite do cartão.',
      'Pode, se dividir em várias compras menores.',
      'Não. CAPEX nunca vai em fundo ou cartão corporativo. Precisa de cotações e carta de compromisso assinada pelo Asset Manager ou proprietário antes do pedido.',
      'Pode, desde que a nota venha no CNPJ do hotel.'
    ],
    correta: 2,
    explicacao: 'Nunca pagar CAPEX com fundo ou cartão corporativo. Cada investimento com cotações de vários fornecedores e carta de compromisso assinada pelo Asset Manager ou proprietário antes do pedido. O dinheiro do investimento é do proprietário.',
    fin: 'FIN-24 · FIN-51',
    reacaoErro: 'Poltronas lindas. Pagas com dinheiro do proprietário sem ele saber.'
  },
  {
    nome: 'Sra. Antecipada Reformas', avatar: '🏗️', midia: '',
    fala: 'A obra do restaurante está quase pronta! Paga a nota final agora, que eu termino semana que vem.',
    contexto: 'É um projeto de CAPEX. A entrega ainda não foi concluída.',
    pergunta: 'Quando a nota pode ser paga?',
    opcoes: [
      'Agora, para não atrasar a obra.',
      'Só depois da entrega concluída e validada pelo GM ou Diretor Financeiro (e pelo gerente do projeto, se houver).',
      'Metade agora, metade depois.',
      'Quando o fornecedor enviar fotos da obra.'
    ],
    correta: 1,
    explicacao: 'CAPEX: nota paga só depois da entrega concluída e validada pelo GM ou Diretor Financeiro (e pelo gerente do projeto, se houver).',
    fin: 'FIN-51',
    reacaoErro: 'Pago. A "semana que vem" virou trimestre que vem.'
  },
  {
    nome: 'Sr. Facilita Atacadista', avatar: '🤝', midia: '',
    fala: 'O comprador de vocês já me conhece. Ele mesmo recebe a mercadoria e lança a nota, fica tudo mais rápido!',
    contexto: 'Ele está propondo que uma mesma pessoa compre, receba e lance.',
    pergunta: 'O que diz a segregação de funções?',
    opcoes: [
      'Tudo bem, se a pessoa for de confiança.',
      'Tudo bem, se o valor for pequeno.',
      'Pede: chefe de departamento · Aprova: alçada · Recebe: quem não comprou · Lança: quem não recebeu.',
      'Tudo bem, se o GM assinar no fim do mês.'
    ],
    correta: 2,
    explicacao: 'Quem compra não recebe a mercadoria nem lança a nota. Equipe pequena demais: o GM ou Controller define por escrito um controle compensatório, com revisão por terceiro.',
    fin: 'FIN-40 · Regras de ouro',
    reacaoErro: 'Uma pessoa comprou, recebeu e lançou. Ninguém consegue provar o que chegou de verdade.'
  },
  {
    nome: 'Sra. Razão Errada Embalagens', avatar: '🧾', midia: '',
    fala: 'Emiti a nota no nome da outra empresa do grupo, mas é tudo igual, pode lançar!',
    contexto: 'A razão social na nota não é a do hotel.',
    pergunta: 'Pode lançar a nota?',
    opcoes: [
      'Não. Antes de lançar, conferir os dados legais da nota: data, razão social do hotel, impostos e totais.',
      'Pode: é o mesmo grupo.',
      'Pode, e corrige no fechamento.',
      'Pode, se o valor bater com o pedido.'
    ],
    correta: 0,
    explicacao: 'Contas a Pagar confere pedido = recebimento = nota e os dados legais: data, razão social do hotel, impostos, totais.',
    fin: 'FIN-41',
    reacaoErro: 'Imposto do hotel recuperado: zero.'
  },
  {
    nome: 'Sr. Cheque-Branco Gráfica', avatar: '✍️', midia: '',
    fala: 'Me dá um cheque assinado em branco que eu preencho certinho quando fechar o valor.',
    contexto: 'O hotel ainda tem talões de cheque.',
    pergunta: 'Qual a resposta?',
    opcoes: [
      'Pode, se ele for fornecedor antigo.',
      'Pode, com valor máximo anotado no verso.',
      'Pode, se o gerente estiver junto.',
      'Nunca. Cheque nunca é assinado em branco, e os talões ficam em inventário assinado.'
    ],
    correta: 3,
    explicacao: 'Cheque nunca assinado em branco; talões em inventário assinado. Cada nota paga é marcada "PAGO", com forma e data.',
    fin: 'FIN-41',
    reacaoErro: 'O cheque foi preenchido. Com um zero a mais.'
  },
  {
    nome: 'Sr. Atalho Bebidas', avatar: '🚪', midia: '',
    fala: 'Deixo as caixas direto na porta da cozinha, é mais perto pra mim.',
    contexto: 'O hotel definiu uma área única de recebimento.',
    pergunta: 'Onde a entrega deve ser feita?',
    opcoes: [
      'Onde for mais fácil para o fornecedor.',
      'Na área única de recebimento, conferida por quem não comprou.',
      'Direto no bar, para economizar tempo.',
      'Na recepção do hotel.'
    ],
    correta: 1,
    explicacao: 'Antes da abertura o hotel define quem pode pedir, o limite por nota e a área única de recebimento. É lá que se confere contra o pedido: produto, preço, contagem ou pesagem, validade, temperatura, aspecto.',
    fin: 'FIN-40',
    reacaoErro: 'Metade das caixas sumiu entre a porta da cozinha e o estoque.'
  }
];
