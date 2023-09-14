import { Product } from '@domain/models/product'
import { Usecase } from './common'

export type ProdutsId = Pick<Product.WithId, 'id'>
export type CreateProdutsId = Usecase<Product.Common, ProdutsId>
