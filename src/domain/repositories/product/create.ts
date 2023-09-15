import { ProdutId } from '@domain/contracts/product'
import { Product } from '@domain/models/product'

export namespace CreateProduct {
  export interface Create {
    create(input: Product.Common): Promise<ProdutId>
  }
}
