/* Outros setores · Check-in do Caos · Recepção / Front Office (FIN-10 a FIN-16)
   Todos os personagens são fictícios. Para trocar o emoji por uma foto,
   coloque o arquivo em midia/ e preencha "midia": "midia/arquivo.jpg".
   "correta" é o índice (começando em 0) da opção certa; a ordem é embaralhada na tela. */
window.DADOS_CHECKIN = [
  {
    nome: 'Sr. Agenor Pagatudo', avatar: '🧳', midia: '',
    fala: 'A agência paga TUDO! Pode liberar frigobar, spa, jantar, o que eu quiser.',
    contexto: 'O voucher da agência cobre só as diárias. Ele não quer deixar cartão para os extras.',
    pergunta: 'O que a recepção faz com os extras?',
    opcoes: [
      'Sem garantia de extras: ativar o no-post no PMS. O consumo dele é pago direto em cada ponto de venda.',
      'Libera tudo e cobra da agência no fim do mês.',
      'Aceita o número do cartão fidelidade dele como garantia.',
      'Libera os extras até o valor de uma diária.'
    ],
    correta: 0,
    explicacao: 'Sem garantia de extras, o PMS fica em no-post e o consumo é pago no ponto de venda. Cartão fidelidade não é garantia.',
    fin: 'FIN-11',
    reacaoErro: 'Três dias depois: conta PM de extras que ninguém consegue cobrar.'
  },
  {
    nome: 'Mr. Dwight Greenback', avatar: '💵', midia: '',
    fala: 'Hi! Troca 500 dólares pra mim? Quero ir pra praia com dinheiro vivo!',
    contexto: 'Ele não tem nada a pagar na conta. Só quer reais.',
    pergunta: 'Qual a resposta da recepção?',
    opcoes: [
      'Troca com a taxa do dia que está no PMS.',
      'Troca até 100 dólares, que é um valor baixo.',
      'Recusa: moeda estrangeira só é aceita como pagamento de conta. O hotel nunca funciona como casa de câmbio.',
      'Troca se o gerente de plantão autorizar.'
    ],
    correta: 2,
    explicacao: 'Moeda estrangeira só como forma de pagamento da conta. O balcão tem aviso em pelo menos 2 idiomas: "Foreign currency accepted for payment only."',
    fin: 'FIN-23',
    reacaoErro: 'Parabéns, o balcão virou casa de câmbio. A auditoria agradece.'
  },
  {
    nome: 'Dona Lurdinha Sumida', avatar: '🕶️', midia: '',
    fala: '(ninguém vê a Dona Lurdinha há 6 dias, mas o quarto está ocupado)',
    contexto: 'Estadia longa. Só existe a pré-autorização feita no dia da chegada. Hoje é o 6º dia.',
    pergunta: 'O que deveria ter acontecido, e o que fazer agora?',
    opcoes: [
      'Nada: cobra tudo no check-out.',
      'Bloquear o quarto como OOO até ela aparecer.',
      'Esperar completar 30 dias para pedir pagamento.',
      'Estadia longa: nova pré-autorização toda semana e pagamento parcial a partir de 5 dias. Já passou do 5º dia: pedir o pagamento parcial e renovar a garantia.'
    ],
    correta: 3,
    explicacao: 'Estadia longa exige nova pré-autorização toda semana e pagamento parcial a partir de 5 dias. Todo dia a recepção roda o relatório de excesso de limite.',
    fin: 'FIN-11',
    reacaoErro: 'A conta da Dona Lurdinha sumiu junto com ela.'
  },
  {
    nome: 'Sr. Voucherildo', avatar: '📄', midia: '',
    fala: 'Meu voucher diz "pagamento no hotel". Isso já é a garantia, né?',
    contexto: 'Ele não apresentou cartão na reserva.',
    pergunta: 'O voucher garante o pagamento?',
    opcoes: [
      'Sim, o voucher é documento oficial da agência.',
      'Não. "Pagamento no hotel" no voucher não é garantia: fazer a pré-autorização de diárias e extras no check-in.',
      'Sim, se ele mostrar também o cartão fidelidade.',
      'Não, mas basta anotar o número do cartão dele no sistema, sem pré-autorizar.'
    ],
    correta: 1,
    explicacao: 'Não é garantia: "pagamento no hotel" no voucher, cartão fidelidade, número de cartão salvo sem pré-autorização, pré-autorização menor que uma diária.',
    fin: 'FIN-11',
    reacaoErro: 'Voucher bonito, conta sem garantia.'
  },
  {
    nome: 'Família Primo-Garantiu', avatar: '👨‍👩‍👧', midia: '',
    fala: 'Meu primo se hospedou aqui e jurou que, pra família dele, a estadia é cortesia!',
    contexto: 'Não existe nenhum e-mail de autorização no sistema.',
    pergunta: 'Como a recepção trata a "cortesia"?',
    opcoes: [
      'Faz o check-in e bloqueia o quarto como OOO, para não aparecer como vendido.',
      'Dá a cortesia e pede o e-mail depois do check-out.',
      'Sem autorização prévia por e-mail antes da chegada (nome, datas, motivo e quem concedeu) não há gratuidade. O check-in segue com garantia normal.',
      'Dá desconto de 50% para não criar caso.'
    ],
    correta: 2,
    explicacao: 'Gratuidade de hospedagem exige autorização prévia por e-mail antes da chegada, com nome, datas, motivo e quem concedeu. Quarto cortesia nunca é bloqueado como OOO.',
    fin: 'FIN-10',
    reacaoErro: 'O primo agradece. O auditor, nem tanto.'
  },
  {
    nome: 'Ana Influ, 2 milhões de seguidores', avatar: '🤳', midia: '',
    fala: 'Faço 3 posts e vocês me dão a suíte. Fechado? Combinamos no direct.',
    contexto: 'O marketing gostou da ideia.',
    pergunta: 'Como essa troca entra no sistema?',
    opcoes: [
      'Como gratuidade, com e-mail do marketing.',
      'Como house use.',
      'Não entra: foi combinado no direct.',
      'Permuta não é gratuidade: lança como venda, com contrato assinado pelas duas partes.'
    ],
    correta: 3,
    explicacao: 'Permuta não é gratuidade. Lança como venda, com contrato assinado pelas duas partes.',
    fin: 'FIN-10',
    reacaoErro: 'Os posts saíram. A receita, não.'
  },
  {
    nome: 'Sr. Ausêncio (ao telefone)', avatar: '📞', midia: '',
    fala: 'Sou o no-show de ontem. Não vou pagar, né? Vocês perdoam, fala que sim.',
    contexto: 'A reserva estava garantida por cartão. Ninguém autorizou perdão.',
    pergunta: 'O que a recepção faz?',
    opcoes: [
      'Perdoa: cliente satisfeito volta.',
      'Debita o cartão e envia a fatura. Perdão de no-show só com autorização prévia formalizada.',
      'Cobra só metade da diária.',
      'Cancela a reserva como se nunca tivesse existido.'
    ],
    correta: 1,
    explicacao: 'Garantia por cartão: debitar e enviar a fatura. Perdoar no-show só com autorização prévia formalizada. Todo cancelamento recebe um número de código, a melhor defesa contra contestação.',
    fin: 'FIN-13',
    reacaoErro: 'No-show perdoado sem autorização: receita garantida que evaporou.'
  },
  {
    nome: 'Casal Não-Reembolsável', avatar: '🧳🧳', midia: '',
    fala: '(não apareceram nas 3 noites da reserva pré-paga)',
    contexto: 'Reserva pré-paga, 3 noites. Primeira noite: não vieram.',
    pergunta: 'Como lançar o no-show de uma reserva pré-paga?',
    opcoes: [
      '1ª noite como no-show; as demais conforme as condições de venda.',
      'Devolve tudo, porque ninguém usou o quarto.',
      'Lança as 3 noites como diária normal, com impostos, para manter a ocupação.',
      'Espera o casal ligar para decidir.'
    ],
    correta: 0,
    explicacao: 'Pré-pago: 1ª noite como no-show, demais conforme as condições de venda. A receita "No-Show" entra sem impostos e sem afetar ocupação e diária média.',
    fin: 'FIN-13',
    reacaoErro: 'Ocupação inflada e diária média distorcida. Belo relatório.'
  },
  {
    nome: 'Sr. Saída-Lateral', avatar: '🏃', midia: '',
    fala: '(saiu pela porta da garagem sem passar na recepção)',
    contexto: 'A conta dele ficou aberta no PMS, sem pagamento.',
    pergunta: 'O que fazer com essa conta?',
    opcoes: [
      'Deixa aberta até ele voltar ao hotel.',
      'Lança como perda no mesmo dia.',
      'Encerra em até 48h e transfere à contabilidade. Insolvência confirmada: perda, com validação do GM.',
      'Transfere para a conta de outro hóspede da mesma empresa.'
    ],
    correta: 2,
    explicacao: 'Saiu sem pagar: encerrar em 48h e transferir à contabilidade. Só vira perda com insolvência confirmada e validação do GM.',
    fin: 'FIN-12',
    reacaoErro: 'Conta aberta há 3 meses. Ninguém lembra quem era.'
  },
  {
    nome: 'Dona Duplicilda', avatar: '💳💳', midia: '',
    fala: 'Paguei duas vezes! Quero meu dinheiro de volta, em espécie, agora!',
    contexto: 'O pagamento em duplicidade foi feito no cartão de crédito dela.',
    pergunta: 'Como devolver?',
    opcoes: [
      'Em dinheiro, do caixa da recepção, com recibo.',
      'Em crédito para consumo no bar.',
      'No cartão que ela preferir.',
      'No mesmo meio de pagamento: no mesmo cartão em que foi cobrado.'
    ],
    correta: 3,
    explicacao: 'Reembolso sempre no mesmo meio de pagamento; cartão, no mesmo cartão. Pagamento a maior sem contato com o hóspede vira renda não recorrente.',
    fin: 'FIN-10 · FIN-12',
    reacaoErro: 'Dinheiro saiu do caixa, o estorno no cartão também. Pagou duas vezes, recebeu duas vezes.'
  },
  {
    nome: 'Sr. Pontuário', avatar: '⭐', midia: '',
    fala: 'Credita os pontos ALL no cartão do meu cunhado? Ele junta tudo.',
    contexto: 'O cartão ALL apresentado é de outra pessoa, não do hóspede.',
    pergunta: 'O que a recepção faz?',
    opcoes: [
      'Credita: os pontos são do hotel mesmo.',
      'Identidade diferente do cartão no check-in: apaga o número do cartão no PMS.',
      'Credita metade para cada um.',
      'Credita e corrige no fim do mês.'
    ],
    correta: 1,
    explicacao: 'Identidade diferente do cartão no check-in: apagar o número do cartão no PMS. Ponto creditado errado gera taxa paga pelo hotel e retroclaim.',
    fin: 'FIN-16',
    reacaoErro: 'O cunhado agradece. O hotel paga a taxa.'
  },
  {
    nome: 'Sra. Acumuladora', avatar: '🧾', midia: '',
    fala: 'Tenho 8 notas de restaurante de hoje. Credita tudo como outside of stay!',
    contexto: 'Ela é membro ALL. Todas as notas são do mesmo dia.',
    pergunta: 'Quantos créditos outside of stay podem entrar hoje?',
    opcoes: [
      'Todos os 8.',
      'Nenhum: outside of stay não existe.',
      'No máximo 5 por membro por dia.',
      'No máximo 1 por dia.'
    ],
    correta: 2,
    explicacao: 'Outside of stay: no máximo 5 créditos por membro por dia. Duplicidade: pedir cancelamento em 7 dias. O gerente supervisiona outside of stay toda semana.',
    fin: 'FIN-16',
    reacaoErro: 'Oito créditos aprovados. A supervisão semanal vai encontrar.'
  },
  {
    nome: 'Sr. Mudei-Direto', avatar: '📱', midia: '',
    fala: 'Reservei pela agência online, mas mudei as datas direto com vocês. Tá tudo certo, né?',
    contexto: 'A mudança foi feita só no PMS.',
    pergunta: 'O que falta fazer?',
    opcoes: [
      'Nada, o PMS já está certo.',
      'Alterar também na OTA, senão a reserva antiga segue ativa e gera comissão.',
      'Cancelar a reserva na OTA como no-show.',
      'Pedir ao hóspede que altere ele mesmo pelo aplicativo, quando quiser.'
    ],
    correta: 1,
    explicacao: 'Hóspede que altera direto com o hotel: alterar também na OTA, senão a reserva segue ativa e gera comissão. Booking.com: corrigir até 30 dias após a saída, senão a comissão é cobrada.',
    fin: 'FIN-15',
    reacaoErro: 'Comissão paga sobre uma reserva que não existe mais.'
  },
  {
    nome: 'Sra. Tarifa-do-Site', avatar: '🧮', midia: '',
    fala: 'No site estava mais barato do que esse valor aí na tela!',
    contexto: 'A tarifa do PMS não bate com a do CRS.',
    pergunta: 'Qual a regra em toda chegada?',
    opcoes: [
      'Cobra a tarifa do PMS, que é a oficial.',
      'Cobra a menor e não registra.',
      'Tarifa do CRS = PMS = RMS. Divergência: corrigir com TI, Revenue ou Front Office.',
      'Deixa para o Revenue resolver no fim do mês.'
    ],
    correta: 2,
    explicacao: 'Em todas as chegadas, tarifa do CRS = PMS = RMS. Divergência: corrigir com TI, Revenue ou Front Office.',
    fin: 'FIN-11',
    reacaoErro: 'Três sistemas, três tarifas, nenhuma certa.'
  },
  {
    nome: 'Sr. Só-Umas-Horinhas', avatar: '⏰', midia: '',
    fala: 'Só preciso do quarto umas horinhas pra tomar um banho. Nem precisa registrar!',
    contexto: 'O quarto vai ser usado e depois limpo pela governança.',
    pergunta: 'Por que esse quarto não pode ficar fora do PMS?',
    opcoes: [
      'Porque a governança informa os quartos limpos separadamente, e uma terceira pessoa concilia com o PMS. Quarto limpo e não vendido aparece como diferença.',
      'Pode ficar fora, se for menos de 4 horas.',
      'Pode, se o gerente de plantão aprovar verbalmente.',
      'Pode, desde que o quarto seja marcado como OOS depois.'
    ],
    correta: 0,
    explicacao: 'Recepção e governança preenchem seus números separadamente e outra pessoa concilia. Day use entra no PMS. Quarto ocupado e não faturado é receita perdida.',
    fin: 'FIN-14',
    reacaoErro: 'Banho tomado, receita perdida, conciliação furada.'
  }
];
