import { Collection, ObjectId } from 'mongodb'
import { GetProduct } from '@domain/repositories/product/get'
import { ProdutId } from '@domain/contracts/product'
import { Product } from '@domain/models'

export class MongoGetProductRepository implements GetProduct.Get {
  constructor(private readonly collection: Collection<Product.Common>) {}

  async execute(input: ProdutId): Promise<Product.WithId | null> {
    const product = await this.collection.findOne({
      _id: new ObjectId(input.id)
    })

    if (!product) {
      return null
    }

    const { _id, ...rest } = product

    return {
      ...rest,
      id: _id.toString()
    }
  }
}
