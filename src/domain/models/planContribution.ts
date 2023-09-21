import { Customer } from './customer'
import { Product } from './product'

export namespace PlanContribution {
  export interface Common {
    idCliente: Pick<Customer.WithId, 'id'>
    idProduto: Pick<Product.WithId, 'id'>
    valorAporte: number
  }

  export interface WithId extends Common {
    id: string
  }
}
