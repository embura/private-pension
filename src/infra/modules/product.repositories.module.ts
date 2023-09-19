import { Module } from '@nestjs/common'

import { infra } from '@infra/common/ioc'
import { DatabaseModule } from './common/database.module'
import { CollectionsModule } from './common/collections.module'
import {
  MongoCreateProductRepository,
  MongoGetProductRepository
} from '@infra/repositories/product'

@Module({
  imports: [CollectionsModule, DatabaseModule],
  providers: [
    {
      provide: infra.repositories.product.create,
      useFactory: (collection) => new MongoCreateProductRepository(collection),
      inject: [infra.collections.product]
    },
    {
      provide: infra.repositories.product.get,
      useFactory: (collection) => new MongoGetProductRepository(collection),
      inject: [infra.collections.product]
    }
  ],
  exports: [infra.repositories.product.create, infra.repositories.product.get]
})
export class ProductRepositoriesModule {}
