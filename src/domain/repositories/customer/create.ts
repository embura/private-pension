import { CustomerId } from '@domain/contracts/customer'
import { Customer } from '@domain/models/customer'

export namespace CreateCustomer {
  export interface Create {
    execute(input: Customer.Common): Promise<CustomerId>
  }
}
