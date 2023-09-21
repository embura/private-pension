import { ProductContracts } from '@domain/contracts'
import { CreateProduct } from '@domain/repositories/product/create'

import { Product } from '@domain/models/product'

export class CreateProductUsecase implements ProductContracts.CreateProduct {
  constructor(private readonly createProductRepository: CreateProduct.Create) {}

  execute(input: Product.Common): Promise<ProductContracts.ProdutId> {
    return this.createProductRepository.execute(input)
  }
}
