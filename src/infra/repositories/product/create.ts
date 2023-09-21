import { Collection } from 'mongodb'
import { CreateProduct } from '@domain/repositories/product/create'
import { Product } from '@domain/models/product'
import { ProductContracts } from '@domain/contracts'

export class MongoCreateProductRepository implements CreateProduct.Create {
  constructor(private readonly collection: Collection<Product.Common>) {}

  async execute(input: Product.Common): Promise<ProductContracts.ProdutId> {
    const { insertedId: id } = await this.collection.insertOne(input)
    return {
      id: id.toString()
    }
  }
}
