import { Plan } from '@domain/models/plan'
import { Usecase } from './common'
import { Customer, Product, PlanContribution } from '@domain/models'

export type PlanId = Pick<Plan.WithId, 'id'>
export type CreatePlan = Usecase<Plan.Common, PlanId>
export type GetPlan = Usecase<PlanId, Plan.WithId>

export type ContributionInput = {
  idProduto: Pick<Product.WithId, 'id'>
  idCliente: Pick<Customer.WithId, 'id'>
  idPlano: PlanId
  valorAporte: number
}

export type CreatePlanContribution = Usecase<
  ContributionInput,
  Pick<PlanContribution.WithId, 'id'>
>
