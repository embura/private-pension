import { Collection } from 'mongodb'
import { CreateClient } from '@domain/repositories/client/create'
import { Client } from '@domain/models/client'
import { ClientId } from '@domain/contracts/client'

export class MongoCreateClientRepository implements CreateClient.Create {
  constructor(private readonly collection: Collection<Client.Common>) {}

  async create(input: Client.Common): Promise<ClientId> {
    const { insertedId: id } = await this.collection.insertOne(input)
    return {
      id: id.toString()
    }
  }
}
