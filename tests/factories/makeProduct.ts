import { faker } from '@faker-js/faker'

export const makeProduct = () => ({
  nome: faker.name.fullName(),
  susep: faker.finance.litecoinAddress(),
  expiracaoDeVenda: new Date(new Date().getFullYear() + 5, 0, 0),
  valorMinimoAporteInicial: 1000,
  valorMinimoAporteExtra: 250,
  idadeDeEntrada: 18,
  idadeDeSaida: 60,
  carenciaInicialDeResgate: 3600,
  carenciaEntreResgates: 30
})
