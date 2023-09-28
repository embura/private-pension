import { PlanExeptionsMessages } from '@domain/errors/reasons'
import { Customer, Product, Plan } from '@domain/models'
// nome: string
// susep: string
// expiracaoDeVenda: Date
// valorMinimoAporteInicial: number // valor mínimo de aporte no momento da contração
// valorMinimoAporteExtra: number // valor mínimo do aporte extra
// idadeDeEntrada: number // idade mínima para comprar o produto
// idadeDeSaida: number // idade máxima para começar a usufruir do benefício
// carenciaInicialDeResgate: number // em dias - carência para realizar o primeiro resgate
// carenciaEntreResgates: number // em dias - carência para realizar outro resgate após

type CheckerInput = {
  customer: Customer.WithId
  product: Product.WithId
  plan: Plan.Common
}

type Checker = (input: CheckerInput) => PlanExeptionsMessages | null

export const calculateCustomerAge = (dataDeNascimento: Date) => {
  const today = new Date()
  const timeDifference = today.getTime() - dataDeNascimento.getTime()
  const age = 1000 * 60 * 60 * 24 * 365
  return Math.floor(timeDifference / age)
}

const customerHasNoMinimumAge: Checker = ({ customer, product }) => {
  if (
    calculateCustomerAge(customer.dataDeNascimento) < product.idadeDeEntrada
  ) {
    return PlanExeptionsMessages.AGE_BELOW_ENTRY_AGE
  }

  return null
}

const insufficientInvestmentAmount: Checker = ({ plan, product }) => {
  if (plan.aporte < product.valorMinimoAporteInicial) {
    return PlanExeptionsMessages.VALUE_LOWER_THAN_THE_MINIMUM_INITIAL_CONTRIBUTION_VALUE
  }

  return null
}

export const allChecks: Checker[] = [
  customerHasNoMinimumAge,
  insufficientInvestmentAmount
]

export default allChecks
