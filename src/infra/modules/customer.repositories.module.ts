import { Module } from '@nestjs/common'

import { infra } from '@infra/common/ioc'
import { DatabaseModule } from './common/database.module'
import { CollectionsModule } from './common/collections.module'
import {
  MongoCreateCustomerRepository,
  MongoGetCustomerRepository
} from '@infra/repositories/customer'

@Module({
  imports: [CollectionsModule, DatabaseModule],
  providers: [
    {
      provide: infra.repositories.customer.create,
      useFactory: (collection) => new MongoCreateCustomerRepository(collection),
      inject: [infra.collections.customer]
    },
    {
      provide: infra.repositories.customer.get,
      useFactory: (collection) => new MongoGetCustomerRepository(collection),
      inject: [infra.collections.customer]
    }
  ],
  exports: [infra.repositories.customer.create, infra.repositories.customer.get]
})
export class CustomerRepositoriesModule {}
