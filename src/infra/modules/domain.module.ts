import { Module } from '@nestjs/common'

import { domain } from '@domain/common/ioc'
import { infra } from '@infra/common/ioc'

import { DatabaseModule } from './common/database.module'

import { CreateClientUsecase } from '@domain/usecases/client/createClient'
import { ClientRepositoriesModule } from './client.repositories.module'

@Module({
  imports: [DatabaseModule, ClientRepositoriesModule],
  providers: [
    {
      provide: domain.usecases.client.create,
      useFactory: (createClientRepository) =>
        new CreateClientUsecase(createClientRepository),
      inject: [infra.repositories.client.create]
    }
  ],
  exports: [domain.usecases.client.create]
})
export class DomainModule {}
