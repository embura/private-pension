import { Module } from '@nestjs/common'

import { infra } from '@infra/common/ioc'
import { DatabaseModule } from './common/database.module'
import { CollectionsModule } from './common/collections.module'
import { MongoCreatePlanContributionRepository } from '@infra/repositories/planContribution/create'

@Module({
  imports: [CollectionsModule, DatabaseModule],
  providers: [
    {
      provide: infra.repositories.planContribution.create,
      useFactory: (collection) =>
        new MongoCreatePlanContributionRepository(collection),
      inject: [infra.collections.planContribution]
    }
  ],
  exports: [infra.repositories.planContribution.create]
})
export class PlanContributionRepositoriesModule {}
