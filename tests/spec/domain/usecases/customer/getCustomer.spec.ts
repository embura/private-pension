import { mock } from 'jest-mock-extended'

import { CreateCustomer } from '@domain/repositories/customer/create'
import { CreateCustomerUsecase } from '@domain/usecases/customer/createCustomer'
import { ObjectId } from 'mongodb'
// import { makeCouponWithId } from '@tests/factories'
import { NotFound } from '@domain/errors'
import { Customer } from '@domain/models'
import { makeCustomer } from '@tests/factories/makeCustomer'

const makeSut = () => {
  const createCustomerRepositoryStub = mock<CreateCustomer.Create>({
    execute: () => Promise.resolve(makeCustomer())
  })

  const sut = new CreateCustomerUsecase(createCustomerRepositoryStub)

  return { sut, createCustomerRepositoryStub }
}

describe('Get Coupon Draft', () => {
  const input: Customer.Common = makeCustomer()

  describe('Happy path', () => {
    it('Should call createCustomerRepository', async () => {
      const { createCustomerRepositoryStub, sut } = makeSut()

      const getRepositorySpy = jest.spyOn(
        createCustomerRepositoryStub,
        'execute'
      )

      await sut.execute(input)

      expect(getRepositorySpy).toHaveBeenCalledWith(input)
    })

    it('Should return the customer', async () => {
      const { sut } = makeSut()

      const customer = await sut.execute(input)

      expect(customer).toBeDefined()
    })
  })

  describe('Sad path', () => {
    it('Should throw if createCustomerRepository throws', () => {
      const { createCustomerRepositoryStub, sut } = makeSut()

      jest
        .spyOn(createCustomerRepositoryStub, 'execute')
        .mockRejectedValueOnce(new Error())

      const promise = sut.execute(input)

      return expect(promise).rejects.toThrow()
    })
  })
})
