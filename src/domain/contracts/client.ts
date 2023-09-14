import { Client } from '@domain/models/client'
import { Usecase } from './common'

export type ClientId = Pick<Client.WithId, 'id'>
export type CreateClient = Usecase<Client.Common, ClientId>
