import { PlanId } from '@domain/contracts/createPlan'
import { Customer } from './customer'
import { Product } from './product'

export namespace PlanContribution {
  export interface Common {
    idCliente: string
    idPlano: string
    valorAporte: number
  }

  export interface WithId extends Common {
    id: string
  }
}
