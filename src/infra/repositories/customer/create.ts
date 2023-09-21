import { Collection } from 'mongodb'
import { CreateCustomer } from '@domain/repositories/customer/create'
import { Customer } from '@domain/models/customer'
import { CustomerContracts } from '@domain/contracts'
import { Conflict } from '@domain/errors'

export class MongoCreateCustomerRepository implements CreateCustomer.Create {
  constructor(private readonly collection: Collection<Customer.Common>) {}

  async execute(input: Customer.Common): Promise<CustomerContracts.CustomerId> {
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
