import { domain } from '@domain/common/ioc'
import { CreateProductUsecase } from '@domain/usecases/product/createProduct'
import { routes } from '@infra/common/baseRoutes'
import {
  CreateProduct,
  createProductSchema
} from '@infra/dto/http/createProduct.dto'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post
} from '@nestjs/common'

@Controller(routes.products)
export class ProductController {
  constructor(
    @Inject(domain.usecases.product.create)
    private readonly createProductUsecase: CreateProductUsecase
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateProduct) {
    const product = createProductSchema.parse(body)

    return await this.createProductUsecase.execute(product)
  }
}
