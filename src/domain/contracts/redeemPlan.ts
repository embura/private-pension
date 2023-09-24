import { Usecase } from './common'

export interface Input {
  idCliente: string
  idPlano: string
  valorResgate: number
}

export interface Output {
  id: string
}

export type RedeemPlan = Usecase<Input, Output>
