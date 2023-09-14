import { Module } from '@nestjs/common'

import { domain } from '@domain/common/ioc'
import { infra } from '@infra/common/ioc'

import { DatabaseModule } from './common/database.module'

import { CreateCustomerUsecase } from '@domain/usecases/customer/createCustomer'
import { CustomerRepositoriesModule } from './customer.repositories.module'

@Module({
  imports: [DatabaseModule, CustomerRepositoriesModule],
  providers: [
    {
      provide: domain.usecases.customer.create,
      useFactory: (createCustomerRepository) =>
        new CreateCustomerUsecase(createCustomerRepository),
      inject: [infra.repositories.customer.create]
    }
  ],
  exports: [domain.usecases.customer.create]
})
export class DomainModule {}
