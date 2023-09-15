import { Module } from '@nestjs/common'

import { domain } from '@domain/common/ioc'
import { infra } from '@infra/common/ioc'

import { DatabaseModule } from './common/database.module'

import { CreateCustomerUsecase } from '@domain/usecases/customer/createCustomer'
import { CreateProductUsecase } from '@domain/usecases/product/createProduct'
import { CustomerRepositoriesModule } from './customer.repositories.module'
import { ProductRepositoriesModule } from './product.repositories.module'

@Module({
  imports: [
    DatabaseModule,
    CustomerRepositoriesModule,
    ProductRepositoriesModule
  ],
  providers: [
    {
      provide: domain.usecases.customer.create,
      useFactory: (createCustomerRepository) =>
        new CreateCustomerUsecase(createCustomerRepository),
      inject: [infra.repositories.customer.create]
    },
    {
      provide: domain.usecases.product.create,
      useFactory: (createProductRepository) =>
        new CreateProductUsecase(createProductRepository),
      inject: [infra.repositories.product.create]
    }
  ],
  exports: [domain.usecases.customer.create, domain.usecases.product.create]
})
export class DomainModule {}
