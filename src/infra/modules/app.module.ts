import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'

import { SecretsModule } from './common/secrets.module'
import { DatabaseModule } from './common/database.module'
import { MongoModule } from './common/mongo.module'
import { DomainModule } from './domain.module'
import { HealthController } from '../controllers/health'
import { ClientController } from '@infra/controllers/client'
import { ClientRepositoriesModule } from './client.repositories.module'

@Module({
  imports: [
    SecretsModule.forRootAsync(),
    MongoModule,
    DatabaseModule,
    ClientRepositoriesModule,
    DomainModule
  ],
  controllers: [HealthController, ClientController]
})
export class AppModule {}
