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

@Module({
  imports: [
    SecretsModule.forRootAsync(),
    MongoModule,
    DatabaseModule,
    CustomerRepositoriesModule,
    ProductRepositoriesModule,
    DomainModule
  ],
  controllers: [HealthController, CustomerController, ProductController]
})
export class AppModule {}
