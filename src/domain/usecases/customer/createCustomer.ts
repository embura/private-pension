import { CustomerContracts } from '@domain/contracts'
import { CreateCustomer } from '@domain/repositories/customer/create'

import { Customer } from '@domain/models/customer'

export class CreateCustomerUsecase implements CustomerContracts.CreateCustomer {
  constructor(
    private readonly createCustomerRepository: CreateCustomer.Create
  ) {}

  execute(input: Customer.Common): Promise<CustomerContracts.CustomerId> {
    return this.createCustomerRepository.execute(input)
  }
}
