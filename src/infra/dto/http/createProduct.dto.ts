import { z } from 'zod'
import { date } from '../common/types'

export const createProductSchema = z.object({
  nome: z.string(),
  susep: z.string(),
  expiracaoDeVenda: date.refine(
    (val) => val > new Date(),
    () => ({ message: 'expiracaoDeVenda precisa ser uma data maior que hoje' })
  ),
  valorMinimoAporteInicial: z.number().positive(), // valor mínimo de aporte no momento da contração
  valorMinimoAporteExtra: z.number().positive(), // valor mínimo do aporte extra
  idadeDeEntrada: z.number().positive(), // idade mínima para comprar o produto
  idadeDeSaida: z.number().positive(), // idade máxima para começar a usufruir do benefício
  carenciaInicialDeResgate: z.number().positive(), // em dias - carência para realizar o primeiro resgate
  carenciaEntreResgates: z.number().positive() // em dias - carência para realizar outro resgate após
})

export type CreateProduct = z.infer<typeof createProductSchema>
