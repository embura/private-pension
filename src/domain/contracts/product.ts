import { Product } from '@domain/models/product'
import { Usecase } from './common'

export type ProdutId = Pick<Product.WithId, 'id'>
export type CreateProduct = Usecase<Product.Common, ProdutId>
