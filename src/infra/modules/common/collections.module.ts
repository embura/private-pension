import { Module } from '@nestjs/common'

import { infra } from '@infra/common/ioc'

import { DatabaseModule } from './database.module'
import { Db } from 'mongodb'

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: infra.collections.client,
      useFactory: (mongoProvider: Db, mongoCollectionName: string) => {
        return mongoProvider.collection(mongoCollectionName)
      },
      inject: [
        infra.providers.database,
        infra.environment.database.collectionsName.client
      ]
    }
  ],
  exports: [infra.collections.client]
})
export class CollectionsModule {}
