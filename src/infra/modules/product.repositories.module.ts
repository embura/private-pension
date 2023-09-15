import { Module } from '@nestjs/common'

import { infra } from '@infra/common/ioc'
import { DatabaseModule } from './common/database.module'
import { CollectionsModule } from './common/collections.module'
import { MongoCreateProductRepository } from '@infra/repositories/product/create'

@Module({
  imports: [CollectionsModule, DatabaseModule],
  providers: [
    {
      provide: infra.repositories.product.create,
      useFactory: (collection) => new MongoCreateProductRepository(collection),
      inject: [infra.collections.product]
    }
  ],
  exports: [infra.repositories.product.create]
})
export class ProductRepositoriesModule {}
