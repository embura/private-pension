// nome: string
// susep: string
// expiracaoDeVenda: Date
// valorMinimoAporteInicial: number // valor mínimo de aporte no momento da contração
// valorMinimoAporteExtra: number // valor mínimo do aporte extra
// idadeDeEntrada: number // idade mínima para comprar o produto
// idadeDeSaida: number // idade máxima para começar a usufruir do benefício

// carenciaInicialDeResgate: number // em dias - carência para realizar o primeiro resgate
// carenciaEntreResgates: number // em dias - carência para realizar outro resgate após

export enum PlanExeptionsMessages {
  VALUE_LOWER_THAN_THE_MINIMUM_INITIAL_CONTRIBUTION_VALUE = 'VALUE_LOWER_THAN_THE_MINIMUM_INITIAL_CONTRIBUTION_VALUE',
  VALUE_LOWER_THAN_THE_MINIMUM_EXTRA_CONTRIBUTION_VALUE = 'VALUE_LOWER_THAN_THE_MINIMUM_EXTRA_CONTRIBUTION_VALUE',
  AGE_BELOW_ENTRY_AGE = 'AGE_BELOW_ENTRY_AGE'
}
