import { Module } from '@nestjs/common'

import { infra } from '@infra/common/ioc'

import { DatabaseModule } from './database.module'
import { Db } from 'mongodb'

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: infra.collections.customer,
      useFactory: (mongoProvider: Db, mongoCollectionName: string) => {
        return mongoProvider.collection(mongoCollectionName)
      },
      inject: [
        infra.providers.database,
        infra.environment.database.collectionsName.customer
      ]
    },
    {
      provide: infra.collections.product,
      useFactory: (mongoProvider: Db, mongoCollectionName: string) => {
        return mongoProvider.collection(mongoCollectionName)
      },
      inject: [
        infra.providers.database,
        infra.environment.database.collectionsName.product
      ]
    },
    {
      provide: infra.collections.plan,
      useFactory: (mongoProvider: Db, mongoCollectionName: string) => {
        return mongoProvider.collection(mongoCollectionName)
      },
      inject: [
        infra.providers.database,
        infra.environment.database.collectionsName.plan
      ]
    },
    {
      provide: infra.collections.planContribution,
      useFactory: (mongoProvider: Db, mongoCollectionName: string) => {
        return mongoProvider.collection(mongoCollectionName)
      },
      inject: [
        infra.providers.database,
        infra.environment.database.collectionsName.planContribution
      ]
    }
  ],
  exports: [
    infra.collections.customer,
    infra.collections.product,
    infra.collections.plan,
    infra.collections.planContribution
  ]
})
export class CollectionsModule {}
