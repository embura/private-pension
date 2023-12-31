import { z } from 'zod'
import { date, idSchema } from '../common/types'

export const createPlanSchema = z.object({
  idCliente: idSchema,
  idProduto: idSchema,
  aporte: z.number().positive(),
  dataDaContratacao: date,
  idadeDeAposentadoria: z.number().positive()
})

export type CreatePlan = z.infer<typeof createPlanSchema>
