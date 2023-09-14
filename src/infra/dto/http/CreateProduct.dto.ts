import { z } from 'zod'
import { date } from '../common/types'

export const createClientSchema = z.object({
  cpf: z.string().length(11),
  nome: z.string(),
  email: z.string().email(),
  dataDeNascimento: date,
  genero: z.string(),
  rendaMensal: z.number()
})

export type CreateClient = z.infer<typeof createClientSchema>
