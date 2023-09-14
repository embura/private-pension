import { ProductContracts } from '@domain/contracts'
import { CreateProduct } from '@domain/repositories/product/create'

import { Product } from '@domain/models/product'

export class CreateProductUsecase implements ProductContracts.CreateProdutsId {
  constructor(private readonly createProductRepository: CreateProduct.Create) {}

  async execute(input: Product.Common): Promise<ProductContracts.ProdutsId> {
    return this.createProductRepository.create(input)
  }
}
