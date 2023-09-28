import { Module } from '@nestjs/common'

import { infra } from '@infra/common/ioc'
import { DatabaseModule } from './common/database.module'
import { CollectionsModule } from './common/collections.module'
import { MongoCreatePlanRedemptionRepository } from '@infra/repositories/planRedemption/create'
import { MongoListPlanRedemptionRepository } from '@infra/repositories/planRedemption/list'

@Module({
  imports: [CollectionsModule, DatabaseModule],
  providers: [
    {
      provide: infra.repositories.planRedemption.create,
      useFactory: (collection) =>
        new MongoCreatePlanRedemptionRepository(collection),
      inject: [infra.collections.planRedemption]
    },
    {
      provide: infra.repositories.planRedemption.list,
      useFactory: (collection) =>
        new MongoListPlanRedemptionRepository(collection),
      inject: [infra.collections.planRedemption]
    }
  ],
  exports: [
    infra.repositories.planRedemption.create,
    infra.repositories.planRedemption.list
  ]
})
export class PlanRedemptionRepositoriesModule {}
