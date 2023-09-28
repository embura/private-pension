import { Module } from '@nestjs/common'

import { infra } from '@infra/common/ioc'
import { DatabaseModule } from './common/database.module'
import { CollectionsModule } from './common/collections.module'
import { MongoCreatePlanRepository } from '@infra/repositories/plan/create'
import { MongoGetPlanRepository } from '@infra/repositories/plan/get'
import { MongoGetPlanAndContributionRepository } from '@infra/repositories/plan/getPlanAndContribution.aggregate'

@Module({
  imports: [CollectionsModule, DatabaseModule],
  providers: [
    {
      provide: infra.repositories.plan.create,
      useFactory: (collection) => new MongoCreatePlanRepository(collection),
      inject: [infra.collections.plan]
    },
    {
      provide: infra.repositories.plan.get,
      useFactory: (collection) => new MongoGetPlanRepository(collection),
      inject: [infra.collections.plan]
    },
    {
      provide: infra.repositories.plan.getPlanAndConctribution,
      useFactory: (collection) =>
        new MongoGetPlanAndContributionRepository(collection),
      inject: [infra.collections.plan]
    }
  ],
  exports: [
    infra.repositories.plan.create,
    infra.repositories.plan.get,
    infra.repositories.plan.getPlanAndConctribution
  ]
})
export class PlanRepositoriesModule {}
