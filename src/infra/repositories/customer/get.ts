import { Collection, ObjectId } from 'mongodb'
import { GetCustomer } from '@domain/repositories/customer/get'
import { Customer } from '@domain/models/customer'
import { CustomerContracts } from '@domain/contracts'

export class MongoGetCustomerRepository implements GetCustomer.Get {
  constructor(private readonly collection: Collection<Customer.Common>) {}
  async execute(
    input: CustomerContracts.CustomerId
  ): Promise<Customer.WithId | null> {
    const customer = await this.collection.findOne({
      _id: new ObjectId(input.id)
    })

    if (!customer) {
      return null
    }

    const { _id, ...rest } = customer

    return {
      ...rest,
      id: _id.toString()
    }
  }
}
