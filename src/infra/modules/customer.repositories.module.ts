import { Module } from '@nestjs/common'

import { infra } from '@infra/common/ioc'
import { DatabaseModule } from './common/database.module'
import { CollectionsModule } from './common/collections.module'
import { MongoCreateCustomerRepository } from '@infra/repositories/customer/create'

@Module({
  imports: [CollectionsModule, DatabaseModule],
  providers: [
    {
      provide: infra.repositories.customer.create,
      useFactory: (collection) => new MongoCreateCustomerRepository(collection),
      inject: [infra.collections.customer]
    }
  ],
  exports: [infra.repositories.customer.create]
})
export class CustomerRepositoriesModule {}
