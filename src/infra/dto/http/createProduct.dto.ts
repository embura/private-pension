import { number, z } from 'zod'
import { date } from '../common/types'

export const createProductSchema = z.object({
  nome: z.string(),
  susep: z.string(),
  expiracaoDeVenda: date,
  valorMinimoAporteInicial: z.number(), // valor mínimo de aporte no momento da contração
  valorMinimoAporteExtra: z.number(), // valor mínimo do aporte extra
  idadeDeEntrada: z.number(), // idade mínima para comprar o produto
  idadeDeSaida: z.number(), // idade máxima para começar a usufruir do benefício
  carenciaInicialDeResgate: z.number(), // em dias - carência para realizar o primeiro resgate
  carenciaEntreResgates: z.number() // em dias - carência para realizar outro resgate após
})

export type CreateProduct = z.infer<typeof createProductSchema>
