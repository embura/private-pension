import { Customer } from '@domain/models/customer'
import { Usecase } from './common'

export type CustomerId = Pick<Customer.WithId, 'id'>
export type CreateCustomer = Usecase<Customer.Common, CustomerId>
