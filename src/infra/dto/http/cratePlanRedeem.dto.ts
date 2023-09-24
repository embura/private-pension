import { z } from 'zod'
import { idSchema } from '../common/types'

export const createRedeemSchema = z.object({
  idCliente: idSchema,
  idPlano: idSchema,
  valorResgate: z.number().positive()
})

export type createRedeem = z.infer<typeof createRedeemSchema>
