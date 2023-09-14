import { domain } from '@domain/common/ioc'
import { CreateClientUsecase } from '@domain/usecases/client/createClient'
import { routes } from '@infra/common/baseRoutes'
import {
  CreateClient,
  createClientSchema
} from '@infra/dto/http/CreateProduct.dto'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post
} from '@nestjs/common'

@Controller(routes.clients)
export class ClientController {
  constructor(
    @Inject(domain.usecases.client.create)
    private readonly createClientUsecase: CreateClientUsecase
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateClient) {
    const client = createClientSchema.parse(body)

    return await this.createClientUsecase.execute(client)
  }
}
