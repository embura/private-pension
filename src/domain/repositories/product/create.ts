import { ProdutId } from '@domain/contracts/product'
import { Product } from '@domain/models/product'

export namespace CreateProduct {
  export interface Create {
    execute(input: Product.Common): Promise<ProdutId>
  }
}
