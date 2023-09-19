import { Module } from '@nestjs/common'

import { infra } from '@infra/common/ioc'
import { DatabaseModule } from './common/database.module'
import { CollectionsModule } from './common/collections.module'
import { MongoCreatePlanRepository } from '@infra/repositories/plan/create'

@Module({
  imports: [CollectionsModule, DatabaseModule],
  providers: [
    {
      provide: infra.repositories.plan.create,
      useFactory: (collection) => new MongoCreatePlanRepository(collection),
      inject: [infra.collections.plan]
    }
  ],
  exports: [infra.repositories.plan.create]
})
export class PlanRepositoriesModule {}
