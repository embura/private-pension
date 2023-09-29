import { domain } from '@domain/common/ioc'
import { infra } from '@infra/common/ioc'
import { ProductController } from '@infra/controllers/product'
import { CreateProductUsecase } from '@domain/usecases/product/createProduct'
import { TestingModule } from '@nestjs/testing'
import { Collection, MongoClient } from 'mongodb'
import { Product } from '@domain/models'
import { createIntegrationDependencies } from '@tests/helpers/createIntegrationDependencies'
import { MongoDbProvider } from '@infra/providers/mongoDb'
import { resetMongoCollection } from '@tests/helpers/resetMongoCollection'
import { makeProduct } from '@tests/factories/makeProduct'
import { CreateProduct } from '@infra/dto/http'

describe('Create product Coupon controller', () => {
  let sut: ProductController
  let createProductUsecase: CreateProductUsecase
  let app: TestingModule
  let mongoConnection: MongoClient
  let mongoCollection: Collection<Product.WithId>

  beforeEach(async () => {
    app = await createIntegrationDependencies().compile()

    sut = app.get<ProductController>(ProductController)

    createProductUsecase = app.get<CreateProductUsecase>(
      domain.usecases.product.create
    )
  })

  beforeAll(async () => {
    app = await createIntegrationDependencies().compile()

    const mongoProvider = app.get<MongoDbProvider>(infra.providers.mongo)
    mongoConnection = await mongoProvider.getConnection()

    mongoCollection = app.get<Collection<Product.WithId>>(
      infra.collections.product
    )
  })

  afterEach(async () => {
    await resetMongoCollection(mongoCollection)
  })

  afterAll(async () => {
    await mongoConnection.close()
    await app.close()
  })

  describe('Happy path', () => {
    it('Should call createProductUsecase', async () => {
      const product: CreateProduct = makeProduct()

      const spyCreate = jest.spyOn(createProductUsecase, 'execute')

      await sut.create(product)

      expect(spyCreate).toHaveBeenCalled()
    })

    it('Should create a product', async () => {
      const product: CreateProduct = makeProduct()

      await sut.create(product)

      const result = await mongoCollection.findOne({
        nome: product.nome
      })

      expect(result).not.toBe(null)
      expect(result).toHaveProperty('_id')
    })
  })
})
