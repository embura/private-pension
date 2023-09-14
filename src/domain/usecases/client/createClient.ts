import { ClientContracts } from '@domain/contracts'
import { CreateClient } from '@domain/repositories/client/create'

import { Client } from '@domain/models/client'

export class CreateClientUsecase implements ClientContracts.CreateClient {
  constructor(private readonly createClientRepository: CreateClient.Create) {}
  async execute(input: Client.Common): Promise<ClientContracts.ClientId> {
    return await this.createClientRepository.create(input)
  }
}
