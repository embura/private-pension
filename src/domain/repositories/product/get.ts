import { ProdutId } from '@domain/contracts/product'
import { Product } from '@domain/models/product'

export namespace GetProduct {
  export interface Get {
    get(input: ProdutId): Promise<Product.WithId | null>
  }
}
