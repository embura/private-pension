import { Module } from '@nestjs/common'

import { domain } from '@domain/common/ioc'
import { infra } from '@infra/common/ioc'

import { DatabaseModule } from './common/database.module'

import { CreateCustomerUsecase } from '@domain/usecases/customer/createCustomer'
import { CreateProductUsecase } from '@domain/usecases/product/createProduct'
import { CustomerRepositoriesModule } from './customer.repositories.module'
import { ProductRepositoriesModule } from './product.repositories.module'
import { PlanRepositoriesModule } from './plan.repositories.module'
import { CreatePlanUsecase } from '@domain/usecases/plan/createPlan'
import { CreatePlanContributionUsecase } from '@domain/usecases/plan'
import { PlanContributionRepositoriesModule } from './planContribution.repositories.module'

@Module({
  imports: [
    DatabaseModule,
    CustomerRepositoriesModule,
    ProductRepositoriesModule,
    PlanRepositoriesModule,
    PlanContributionRepositoriesModule
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
    },
    {
      provide: domain.usecases.plan.create,
      useFactory: (
        createPlanRepository,
        getCustomerRepository,
        getProductRepository
      ) =>
        new CreatePlanUsecase(
          createPlanRepository,
          getCustomerRepository,
          getProductRepository
        ),
      inject: [
        infra.repositories.plan.create,
        infra.repositories.customer.get,
        infra.repositories.product.get
      ]
    },
    {
      provide: domain.usecases.planContribution.create,
      useFactory: (
        getPlanRepository,
        getCustomerRepository,
        getProductRepository,
        createPlanControbutionRepository
      ) =>
        new CreatePlanContributionUsecase(
          getPlanRepository,
          getCustomerRepository,
          getProductRepository,
          createPlanControbutionRepository
        ),
      inject: [
        infra.repositories.plan.get,
        infra.repositories.customer.get,
        infra.repositories.product.get,
        infra.repositories.planContribution.create
      ]
    }
  ],
  exports: [
    domain.usecases.customer.create,
    domain.usecases.product.create,
    domain.usecases.plan.create,
    domain.usecases.planContribution.create
  ]
})
export class DomainModule {}
