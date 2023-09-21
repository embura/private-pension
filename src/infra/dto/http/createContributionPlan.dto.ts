import { z } from 'zod'
import { idSchema } from '../common/types'

export const createContributionSchema = z.object({
  idCliente: idSchema,
  idProduto: idSchema,
  valorAporte: z.number().positive()
})

export type createContribution = z.infer<typeof createContributionSchema>
