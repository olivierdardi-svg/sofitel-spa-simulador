/* Jogo · Doca de Recebimento · Recebimento (FIN-40, FIN-41, FIN-42)
   Ações possíveis em "correta":
     aceitar     tudo confere com pedido e nota
     recusar     a mercadoria não entra
     divergencia recebe, anota a divergência na nota e pede nota de crédito
     alerta      o problema é de controle/processo (segregação, dado bancário, compra sem regra)
   Fornecedores e pessoas são fictícios. Valores são cenário, não regra. */
window.DADOS_DOCA = [
  {
    produto: 'Salmão fresco', icone: '🐟', fornecedor: 'Peixaria Maré Cheia (fictícia)', midia: '',
    pedido: '10 kg · R$ 95,00/kg', nota: '10 kg · R$ 95,00/kg', chegou: 'Balança aferida: 9,2 kg',
    detalhe: 'O entregador: "São 10 quilos, confia! Nem precisa pesar."',
    correta: 'divergencia',
    explicacao: 'Pesagem em balança aferida, sempre. Registrar na nota o peso real (9,2 kg), anotar a divergência e pedir nota de crédito ao fornecedor.',
    fin: 'FIN-40'
  },
  {
    produto: 'Vinho branco', icone: '🍾', fornecedor: 'Adega Vale Dourado (fictícia)', midia: '',
    pedido: '24 garrafas · R$ 80,00 cada', nota: '24 garrafas · R$ 95,00 cada', chegou: '24 garrafas contadas',
    detalhe: 'O vendedor diz que "o preço subiu semana passada".',
    correta: 'divergencia',
    explicacao: 'No recebimento confere-se contra o pedido, inclusive o preço. Pedido = recebimento = nota. Preço diferente do pedido: divergência anotada e nota de crédito pedida.',
    fin: 'FIN-40 · FIN-41'
  },
  {
    produto: 'Frutas da estação', icone: '🍍', fornecedor: 'Hortifruti Serra Verde (fictícia, homologada)', midia: '',
    pedido: '30 kg · R$ 12,00/kg', nota: '30 kg · R$ 12,00/kg', chegou: 'Balança aferida: 30 kg · aspecto e validade ok',
    detalhe: 'Recebido na área de recebimento, por quem não fez a compra.',
    correta: 'aceitar',
    explicacao: 'Tudo confere: produto, preço, peso em balança aferida, validade, aspecto. Registrar na nota peso real, carimbo, data e nome legível.',
    fin: 'FIN-40'
  },
  {
    produto: 'Toalhas de piscina', icone: '🏖️', fornecedor: 'Têxtil Algodão Bom (fictícia)', midia: '',
    pedido: '200 unidades', nota: '(sem nota fiscal)', chegou: '200 unidades contadas',
    detalhe: 'O motorista: "A nota vai amanhã por e-mail, pode ficar tranquilo."',
    correta: 'recusar',
    explicacao: 'Nunca receber mercadoria sem nota fiscal.',
    fin: 'FIN-40'
  },
  {
    produto: 'Azeite extra virgem', icone: '🫒', fornecedor: 'Empório Oliveira Antiga (fictícia)', midia: '',
    pedido: '12 latas', nota: '12 latas', chegou: '12 latas',
    detalhe: 'Quem fez a compra aparece na doca: "Fui eu que pedi, deixa que eu mesmo recebo e assino."',
    correta: 'alerta',
    explicacao: 'Segregação de funções: quem compra não recebe a mercadoria nem lança a nota. O recebimento é feito por quem não comprou.',
    fin: 'FIN-40'
  },
  {
    produto: 'Café em grãos', icone: '☕', fornecedor: 'Torrefação Morro Alto (fictícia)', midia: '',
    pedido: '20 kg', nota: '20 kg', chegou: '20 kg na balança aferida',
    detalhe: 'Junto com a nota vem uma carta: "Mudamos de banco. A partir de hoje, paguem nesta nova conta."',
    correta: 'alerta',
    explicacao: 'Alteração de dado bancário é o golpe mais comum contra hotéis. Só muda com justificativa e aprovação de duas pessoas, por quem está definido para isso, nunca por uma carta na doca.',
    fin: 'FIN-41'
  },
  {
    produto: 'Ovos', icone: '🥚', fornecedor: 'Granja Galo Cantor (fictícia)', midia: '',
    pedido: '30 dúzias', nota: '36 dúzias', chegou: '30 dúzias contadas',
    detalhe: 'Caixas bem embaladas, dentro da validade.',
    correta: 'divergencia',
    explicacao: 'A nota cobra 36 dúzias, chegaram 30. Registrar a contagem real na nota, anotar a divergência e pedir nota de crédito.',
    fin: 'FIN-40 · FIN-41'
  },
  {
    produto: 'Trufas negras', icone: '🍄', fornecedor: 'Delícias da Floresta (fictícia, não homologada)', midia: '',
    pedido: '(não existe pedido aprovado)', nota: '1 kg · R$ 9.800,00', chegou: '1 kg',
    detalhe: 'O motorista: "Alguém da cozinha pediu por mensagem ontem à noite."',
    correta: 'alerta',
    explicacao: 'Pedido com preço, quantidade e total aprovado ANTES da compra. Sem pedido, não há contra o que conferir. Fornecedor não homologado ainda exige 3 cotações, documentos legais e Carta de Compras Responsáveis.',
    fin: 'FIN-40'
  },
  {
    produto: 'Queijos artesanais', icone: '🧀', fornecedor: 'Laticínios Pasto Alto (fictícia, homologada)', midia: '',
    pedido: '8 kg · R$ 110,00/kg', nota: '8 kg · R$ 110,00/kg', chegou: 'Balança aferida: 8 kg · temperatura ok',
    detalhe: 'Pedido aprovado anexado. Recebedor do almoxarifado presente.',
    correta: 'aceitar',
    explicacao: 'Pedido = recebimento = nota, temperatura e aspecto conferidos. Carimbar, datar e assinar com nome legível.',
    fin: 'FIN-40 · FIN-41'
  },
  {
    produto: 'Flores para o lobby', icone: '💐', fornecedor: 'Floricultura da Esquina (fictícia, não homologada)', midia: '',
    pedido: 'Arranjo · valor abaixo de 1 salário mínimo', nota: 'Mesmo valor do pedido', chegou: '1 arranjo conforme pedido',
    detalhe: 'Pedido aprovado, com a Carta de Compras Responsáveis assinada e anexada. Não tem 3 cotações.',
    correta: 'aceitar',
    explicacao: 'Pegadinha! Fornecedor não homologado abaixo de 1 salário mínimo: basta a Carta de Compras Responsáveis anexada ao pedido. As 3 cotações valem para compras acima disso.',
    fin: 'FIN-40'
  },
  {
    produto: 'Produtos de limpeza', icone: '🧴', fornecedor: 'Higiene Total (fictícia, não homologada)', midia: '',
    pedido: 'R$ 18.000,00 · aprovado', nota: 'R$ 18.000,00', chegou: 'Tudo contado e conforme',
    detalhe: 'Fornecedor novo, não homologado. Nenhuma cotação, nenhum documento legal, sem Carta de Compras Responsáveis.',
    correta: 'alerta',
    explicacao: 'Não homologado: 3 cotações, documentos legais, Carta de Compras Responsáveis assinada, cláusula CSR no contrato e lista aprovada pelo GM ou Controller. Priorizar homologados (Mercado Eletrônico).',
    fin: 'FIN-40'
  },
  {
    produto: 'Camarão rosa', icone: '🦐', fornecedor: 'Pescados Baía Azul (fictícia, homologada)', midia: '',
    pedido: '6 kg · R$ 140,00/kg', nota: '6 kg · R$ 140,00/kg', chegou: 'Balança aferida: 6 kg · temperatura ok',
    detalhe: 'Tudo em ordem. O entregador está com pressa.',
    correta: 'aceitar',
    explicacao: 'Confere com o pedido em produto, preço, peso, validade, temperatura e aspecto. Pressa do entregador não muda a rotina: carimbo, data e nome legível na nota.',
    fin: 'FIN-40'
  },
  {
    produto: 'Água mineral', icone: '💧', fornecedor: 'Fonte Serra Clara (fictícia, homologada)', midia: '',
    pedido: '10 fardos', nota: '15 fardos', chegou: '15 fardos contados',
    detalhe: 'O entregador: "Trouxe a mais porque vocês sempre acabam pedindo de novo."',
    correta: 'divergencia',
    explicacao: 'A conferência é contra o PEDIDO, não contra a nota. Chegou e foi cobrado mais do que o pedido aprovado: divergência anotada na nota e nota de crédito pedida ao fornecedor.',
    fin: 'FIN-40'
  },
  {
    produto: 'Vinagre balsâmico', icone: '🫗', fornecedor: 'Empório Modena Sul (fictícia)', midia: '',
    pedido: '12 frascos · marca Aceto Real', nota: '12 frascos · marca Aceto Real', chegou: '12 frascos · marca Campo Verde',
    detalhe: 'O entregador: "É a mesma coisa, só muda o rótulo."',
    correta: 'divergencia',
    explicacao: 'No recebimento confere-se o PRODUTO contra o pedido, não só a quantidade. Produto diferente do pedido: divergência anotada e tratada com o fornecedor.',
    fin: 'FIN-40'
  },
  {
    produto: 'Cerveja artesanal', icone: '🍺', fornecedor: 'Cervejaria Onda Leve (fictícia, homologada)', midia: '',
    pedido: '5 caixas', nota: '5 caixas', chegou: '(entregue direto no bar da piscina)',
    detalhe: 'O bar recebeu as caixas sem passar pela área de recebimento. Ninguém do recebimento contou.',
    correta: 'alerta',
    explicacao: 'Toda entrega passa pela área única de recebimento, conferida por quem não comprou. Depois, sai para o bar por requisição, com solicitante, aprovador e recebedor identificados.',
    fin: 'FIN-40 · FIN-42'
  },
  {
    produto: 'Whisky 12 anos', icone: '🥃', fornecedor: 'Importadora Highland (fictícia, homologada)', midia: '',
    pedido: '24 garrafas', nota: '24 garrafas', chegou: '24 garrafas contadas',
    detalhe: 'Tudo conferido às 21h. As caixas vão passar a noite na doca, com a porta aberta, "porque o almoxarifado já fechou".',
    correta: 'alerta',
    explicacao: 'Almoxarifado, câmaras e bares trancados fora do expediente; chaves retiradas e devolvidas com testemunha e livro. Álcool e itens caros ficam em área trancada separada.',
    fin: 'FIN-42'
  }
];
