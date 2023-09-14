import { Module } from '@nestjs/common'

import { infra } from '@infra/common/ioc'
import { DatabaseModule } from './common/database.module'
import { CollectionsModule } from './common/collections.module'
import { MongoCreateClientRepository } from '@infra/repositories/client/create'

@Module({
  imports: [CollectionsModule, DatabaseModule],
  providers: [
    {
      provide: infra.repositories.client.create,
      useFactory: (collection) => new MongoCreateClientRepository(collection),
      inject: [infra.collections.client]
    }
  ],
  exports: [infra.repositories.client.create]
})
export class ClientRepositoriesModule {}
