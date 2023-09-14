import { Collection } from 'mongodb'
import { CreateCustomer } from '@domain/repositories/customer/create'
import { Customer } from '@domain/models/customer'
import { CustomerId } from '@domain/contracts/customer'
import { Conflict } from '@domain/errors'

export class MongoCreateCustomerRepository implements CreateCustomer.Create {
  constructor(private readonly collection: Collection<Customer.Common>) {}

  async create(input: Customer.Common): Promise<CustomerId> {
    const customer = await this.collection.findOne({
      cpf: input.cpf
    })

    if (customer) {
      throw new Conflict('customer already exists')
    }
    const { insertedId: id } = await this.collection.insertOne(input)
    return {
      id: id.toString()
    }
  }
}
