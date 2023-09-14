import { domain } from '@domain/common/ioc'
import { CreateCustomerUsecase } from '@domain/usecases/customer/createCustomer'
import { routes } from '@infra/common/baseRoutes'
import {
  CreateCustomer,
  createCustomerSchema
} from '@infra/dto/http/CreateCustomer.dto'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post
} from '@nestjs/common'

@Controller(routes.customer)
export class CustomerController {
  constructor(
    @Inject(domain.usecases.customer.create)
    private readonly createCustomerUsecase: CreateCustomerUsecase
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateCustomer) {
    const customer = createCustomerSchema.parse(body)

    return await this.createCustomerUsecase.execute(customer)
  }
}
