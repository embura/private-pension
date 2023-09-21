import { CustomerId } from '@domain/contracts/customer'
import { Customer } from '@domain/models/customer'

export namespace GetCustomer {
  export interface Get {
    execute(input: CustomerId): Promise<Customer.WithId | null>
  }
}
