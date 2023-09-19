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
    }
  ],
  exports: [
    infra.collections.customer,
    infra.collections.product,
    infra.collections.plan
  ]
})
export class CollectionsModule {}
