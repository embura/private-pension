import { Customer } from '@domain/models'
import { faker } from '@faker-js/faker'

export const makeCustomer = (): Customer.WithId => ({
  id: faker.database.mongodbObjectId().toString(),
  cpf: '12323434567',
  nome: faker.name.fullName(),
  email: faker.internet.email(),
  dataDeNascimento: new Date(new Date().getFullYear() - 20),
  genero: faker.name.sex(),
  rendaMensal: faker.datatype.number({ min: 1000, max: 10000 })
})
