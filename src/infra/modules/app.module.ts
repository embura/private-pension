import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'

import { SecretsModule } from './common/secrets.module'
import { DatabaseModule } from './common/database.module'
import { MongoModule } from './common/mongo.module'
import { DomainModule } from './domain.module'
import { HealthController } from '../controllers/health'
import { CustomerController } from '@infra/controllers/customer'
import { CustomerRepositoriesModule } from './customer.repositories.module'
import { ProductRepositoriesModule } from './product.repositories.module'
import { ProductController } from '@infra/controllers/product'
import { PlanRepositoriesModule } from './plan.repositories.module'
import { PlanController } from '@infra/controllers/plan'
import { PlanContributionRepositoriesModule } from './planContribution.repositories.module'
import { PlanRedemptionRepositoriesModule } from './planRedemption.repositories.module'

@Module({
  imports: [
    SecretsModule.forRootAsync(),
    MongoModule,
    DatabaseModule,
    CustomerRepositoriesModule,
    ProductRepositoriesModule,
    PlanRepositoriesModule,
    PlanContributionRepositoriesModule,
    PlanRedemptionRepositoriesModule,
    DomainModule
  ],
  controllers: [
    HealthController,
    CustomerController,
    ProductController,
    PlanController
  ]
})
export class AppModule {}
