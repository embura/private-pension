import { ClientId } from '@domain/contracts/client'
import { Client } from '@domain/models/client'

export namespace CreateClient {
  export interface Create {
    create(input: Client.Common): Promise<ClientId>
  }
}
