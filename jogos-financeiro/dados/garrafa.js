/* Jogo 3 · O Mistério da Garrafa Sumida · A&B (FIN-10 parte A&B, FIN-42, FIN-43)
   Os números de garrafas são cenário fictício. As regras vêm do Livro.
   Em cada documento, a(s) linha(s) com culpada: true são onde a conta não fecha
   ou onde o controle falhou. Pontos de venda e iniciais são fictícios. */
window.DADOS_GARRAFA = [
  {
    titulo: 'O Gin que Evaporou',
    local: 'Bar da Piscina · Gin Maré Alta',
    depoimento: 'Fim do mês. A ficha de consumo diz que saíram 12 garrafas de gin do bar. O caixa jura que vendeu tudo. Mas a conta não fecha. Alguém deixou uma pista no PDV.',
    documentos: [
      { tipo: 'Inventário', icone: '📋', titulo: 'Folha de inventário (contagem às cegas, 2 pessoas)',
        colunas: ['Item', 'Garrafas'],
        linhas: [{ c: ['Estoque inicial (1º do mês)', '6'] }, { c: ['Estoque final (último dia)', '4'] }] },
      { tipo: 'Requisição', icone: '📝', titulo: 'Requisições recebidas do almoxarifado',
        colunas: ['Data', 'Qtd', 'Solicita', 'Aprova', 'Recebe'],
        linhas: [{ c: ['01/10', '4', 'B.A.', 'G.R.', 'B.A.'] }, { c: ['10/10', '3', 'B.A.', 'G.R.', 'D.S.'] }, { c: ['20/10', '3', 'D.S.', 'G.R.', 'D.S.'] }] },
      { tipo: 'PDV', icone: '🧾', titulo: 'Relatório do PDV (garrafas equivalentes)',
        colunas: ['Linha', 'Garrafas'],
        linhas: [{ c: ['Vendas em mesas fechadas', '9'] }, { c: ['Cortesias lançadas (com autorização)', '1'] }, { c: ['Mesa 12 · ABERTA desde sábado', '1'], culpada: true }] },
      { tipo: 'Perdas', icone: '💥', titulo: 'Relatório de perdas do bar',
        colunas: ['Ocorrência', 'Garrafas', 'Validado por'],
        linhas: [{ c: ['Quebra na reposição', '1', 'Gestão A&B'] }] }
    ],
    conta: 'Consumo = 6 + 10 − 4 = 12. Vendas fechadas 9 + cortesia 1 + perda 1 = 11. Falta 1 garrafa: está na mesa 12, aberta há dias. Consumido, nunca cobrado.',
    explicacao: 'Mesa aberta esconde consumo sem pagamento. O PDV tem que estar com todas as mesas fechadas todo dia, e o gerente faz checagem surpresa de mesas abertas, variando dia e horário.',
    pergunta2: {
      pergunta: 'Que controle teria pego a mesa 12 no mesmo dia?',
      opcoes: [
        'Confirmar todo dia que todas as mesas do PDV foram fechadas.',
        'Fazer o inventário uma vez por ano.',
        'Pedir que o garçom lembre de fechar as mesas.',
        'Aumentar o par stock do bar.'
      ],
      correta: 0
    },
    fin: 'FIN-10 · FIN-43'
  },
  {
    titulo: 'O Champanhe que Mudou de Andar',
    local: 'Almoxarifado → Bar do Lobby · Champanhe Brut',
    depoimento: 'O bar do lobby fecha a conta direitinho. Mas o almoxarifado diz que mandou mais garrafas do que o bar recebeu. Duas garrafas sumiram no elevador?',
    documentos: [
      { tipo: 'Requisição', icone: '📝', titulo: 'Saídas do almoxarifado para o Bar do Lobby',
        colunas: ['Data', 'Qtd', 'Solicita', 'Aprova', 'Recebe'],
        linhas: [{ c: ['12/10', '4', 'R.M.', 'C.T.', 'R.M.'] }, { c: ['19/10', '2', 'P.L.', 'P.L.', 'P.L.'], culpada: true }] },
      { tipo: 'Inventário', icone: '📋', titulo: 'Inventário do Bar do Lobby',
        colunas: ['Item', 'Garrafas'],
        linhas: [{ c: ['Estoque inicial', '3'] }, { c: ['Entradas registradas no bar', '4'] }, { c: ['Estoque final', '2'] }] },
      { tipo: 'PDV', icone: '🧾', titulo: 'Relatório do PDV · Bar do Lobby',
        colunas: ['Linha', 'Garrafas'],
        linhas: [{ c: ['Vendas', '4'] }, { c: ['Cortesias lançadas', '1'] }, { c: ['Mesas abertas', '0'] }] },
      { tipo: 'Perdas', icone: '💥', titulo: 'Relatório de perdas',
        colunas: ['Ocorrência', 'Garrafas', 'Validado por'],
        linhas: [{ c: ['Nenhuma no mês', '0', 'Gestão A&B'] }] }
    ],
    conta: 'No bar: 3 + 4 − 2 = 5 = vendas 4 + cortesia 1. Fecha. Mas o almoxarifado mandou 4 + 2 = 6. As 2 garrafas de 19/10 saíram numa requisição em que a MESMA pessoa solicitou, aprovou e recebeu, sem ninguém conferindo.',
    explicacao: 'Toda saída é por requisição, com solicitante, aprovador e recebedor identificados. Se a mesma pessoa faz os três papéis, um terceiro confere.',
    pergunta2: {
      pergunta: 'A mesma pessoa solicitou, aprovou e recebeu. O que manda o procedimento?',
      opcoes: [
        'Nada: o importante é ter a requisição.',
        'Proibir requisições às sextas.',
        'Um terceiro confere a requisição.',
        'O próprio solicitante assina duas vezes.'
      ],
      correta: 2
    },
    fin: 'FIN-42'
  },
  {
    titulo: 'O Vinho da Mesa Especial',
    local: 'Restaurante · Vinho Tinto Reserva',
    depoimento: 'Faltam 2 garrafas de vinho. A equipe lembra: "Ah, foram as duas da mesa do parceiro, cortesia combinada de boca." Mas o PDV não sabe de nada.',
    documentos: [
      { tipo: 'Inventário', icone: '📋', titulo: 'Inventário do restaurante',
        colunas: ['Item', 'Garrafas'],
        linhas: [{ c: ['Estoque inicial', '10'] }, { c: ['Requisições recebidas', '6'] }, { c: ['Estoque final', '6'] }] },
      { tipo: 'PDV', icone: '🧾', titulo: 'Relatório do PDV · Restaurante',
        colunas: ['Linha', 'Garrafas'],
        linhas: [{ c: ['Vendas', '8'] }, { c: ['Cortesias e consumo interno lançados', '0'], culpada: true }, { c: ['Mesas abertas', '0'] }] },
      { tipo: 'Perdas', icone: '💥', titulo: 'Relatório de perdas',
        colunas: ['Ocorrência', 'Garrafas', 'Validado por'],
        linhas: [{ c: ['Nenhuma no mês', '0', 'Gestão A&B'] }] },
      { tipo: 'Alçadas', icone: '✉️', titulo: 'Cartas de cortesia vigentes',
        colunas: ['Quem concede', 'Limite mensal'],
        linhas: [{ c: ['Autorizado A (carta assinada pelo GM)', 'conforme carta'] }] }
    ],
    conta: 'Consumo = 10 + 6 − 6 = 10. Vendas 8. Faltam 2. A cortesia existiu, mas não foi lançada no PDV. Para o controle, garrafa sem lançamento é desvio.',
    explicacao: 'Bebida lançada no PDV antes de servir. Cortesias e consumo interno também são lançados, por quem tem carta de cortesia com limite. Todo produto sai como venda, cortesia ou perda; o que sobra é desvio.',
    pergunta2: {
      pergunta: 'Como essa cortesia deveria ter sido feita?',
      opcoes: [
        'Combinada de boca, desde que o gerente lembre.',
        'Lançada no PDV antes de servir, por quem tem carta de cortesia e dentro do limite.',
        'Lançada como quebra no relatório de perdas.',
        'Anotada num papel e lançada no fim do mês.'
      ],
      correta: 1
    },
    fin: 'FIN-43 · FIN-10 · FIN-01'
  },
  {
    titulo: 'A Quebra que Ninguém Viu',
    local: 'Bar da Cobertura · Vodka Premium',
    depoimento: 'A conta fecha certinho! Só que 3 garrafas foram "quebradas" numa única noite, e ninguém da gestão viu os cacos.',
    documentos: [
      { tipo: 'Inventário', icone: '📋', titulo: 'Inventário do bar',
        colunas: ['Item', 'Garrafas'],
        linhas: [{ c: ['Estoque inicial', '8'] }, { c: ['Requisições recebidas', '6'] }, { c: ['Estoque final', '5'] }] },
      { tipo: 'PDV', icone: '🧾', titulo: 'Relatório do PDV',
        colunas: ['Linha', 'Garrafas'],
        linhas: [{ c: ['Vendas', '6'] }, { c: ['Cortesias lançadas', '0'] }, { c: ['Mesas abertas', '0'] }] },
      { tipo: 'Perdas', icone: '💥', titulo: 'Relatório de perdas do bar',
        colunas: ['Ocorrência', 'Garrafas', 'Validado por'],
        linhas: [{ c: ['Quebra · sábado, 02h', '3', '(em branco)'], culpada: true }] },
      { tipo: 'Requisição', icone: '📝', titulo: 'Requisições do mês',
        colunas: ['Data', 'Qtd', 'Solicita', 'Aprova', 'Recebe'],
        linhas: [{ c: ['05/10', '6', 'M.F.', 'G.R.', 'T.O.'] }] }
    ],
    conta: 'Consumo = 8 + 6 − 5 = 9 = vendas 6 + perdas 3. Fecha nos números. Mas a perda de 3 garrafas não foi validada por ninguém da gestão. Perda sem validação é só um nome bonito para "sumiu".',
    explicacao: 'Relatório de perdas em cada ponto de estocagem, validado pela gestão. Cada diferença justificada por escrito.',
    pergunta2: {
      pergunta: 'O que falta para essa perda valer?',
      opcoes: [
        'Nada: está no relatório.',
        'Uma foto dos cacos no grupo do bar.',
        'Validação da gestão no relatório de perdas.',
        'Lançar a quebra como cortesia.'
      ],
      correta: 2
    },
    fin: 'FIN-42 · FIN-43'
  },
  {
    titulo: 'O Bar que Transbordou',
    local: 'Bar do Lobby · Rum Ouro',
    depoimento: 'O bar do lobby está tão cheio de rum que as garrafas estão guardadas embaixo do balcão. Quem pediu tanto rum, e por quê?',
    documentos: [
      { tipo: 'Par stock', icone: '📏', titulo: 'Par stock definido para o bar',
        colunas: ['Item', 'Par stock'],
        linhas: [{ c: ['Rum Ouro', '6 garrafas'] }] },
      { tipo: 'Inventário', icone: '📋', titulo: 'Inventário físico antes da reposição',
        colunas: ['Item', 'Garrafas'],
        linhas: [{ c: ['Rum Ouro', '5'] }] },
      { tipo: 'Requisição', icone: '📝', titulo: 'Requisição de reposição',
        colunas: ['Item', 'Qtd pedida', 'Motivo'],
        linhas: [{ c: ['Rum Ouro', '12', '"Pra garantir o fim de semana"'], culpada: true }] },
      { tipo: 'PDV', icone: '🧾', titulo: 'Vendas da semana no PDV',
        colunas: ['Item', 'Garrafas'],
        linhas: [{ c: ['Rum Ouro', '6'] }] }
    ],
    conta: 'Par stock 6 − inventário físico 5 = reposição de 1 garrafa. Pediram 12. Estoque acima do par stock não tem base nem na média vendida nem no espaço do bar.',
    explicacao: 'A reposição dos bares é calculada pelo inventário físico contra o par stock e conciliada com as vendas. O par stock de cada bebida, por bar, é definido antes da abertura com base na média vendida e no espaço disponível.',
    pergunta2: {
      pergunta: 'Quantas garrafas a reposição deveria pedir?',
      opcoes: ['12', '6', '1', '0'],
      correta: 2
    },
    fin: 'FIN-42'
  },
  {
    titulo: 'O Inventário Ensaiado',
    local: 'Câmara de bebidas · Inventário mensal',
    depoimento: 'O inventário do mês "bateu" quase perfeito com o sistema. Perfeito demais. E ainda sobraram 14 cervejas que ninguém sabe explicar.',
    documentos: [
      { tipo: 'Inventário', icone: '📋', titulo: 'Folha de contagem do mês',
        colunas: ['Campo', 'Registro'],
        linhas: [
          { c: ['Coluna "quantidade teórica"', 'Impressa ao lado da contagem'], culpada: true },
          { c: ['Contado por', '1 pessoa, a responsável pelo estoque'], culpada: true },
          { c: ['Assinaturas', '1'] }
        ] },
      { tipo: 'Entregas', icone: '🚚', titulo: 'Recebimentos do dia da contagem',
        colunas: ['Hora', 'Entrega', 'Tratamento'],
        linhas: [{ c: ['10h30 (durante a contagem)', '2 caixas de cerveja', 'Contadas junto com o estoque'], culpada: true }] },
      { tipo: 'Conciliação', icone: '⚖️', titulo: 'Contábil x físico',
        colunas: ['Item', 'Contábil', 'Físico', 'Diferença'],
        linhas: [{ c: ['Cerveja long neck', '106', '120', '+14'] }] }
    ],
    conta: 'Três falhas de uma vez: a contagem não foi às cegas, foi feita por uma pessoa só, e a entrega que chegou durante a contagem entrou no número. Com a entrega das 10h30 misturada na contagem, a diferença de +14 não tem como ser explicada, e a contagem "perfeita" não prova nada.',
    explicacao: 'Inventário do mês: contagem às cegas, sem quantidade teórica, por duas pessoas, uma delas fora da gestão do estoque; as duas assinam. Entregas que chegam durante a contagem ficam separadas até o fim. Cada diferença contábil x físico é investigada.',
    pergunta2: {
      pergunta: 'Como deve ser a contagem do inventário mensal?',
      opcoes: [
        'Com a quantidade teórica impressa, para conferir mais rápido.',
        'Pelo responsável do estoque, que conhece as prateleiras.',
        'Às cegas, por duas pessoas (uma fora da gestão do estoque), com as entregas do dia separadas até o fim.',
        'Por uma pessoa só, desde que assine.'
      ],
      correta: 2
    },
    fin: 'FIN-42'
  }
];
