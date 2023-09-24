import { Plan } from '@domain/models/plan'
import { Usecase } from './common'
import { PlanContribution } from '@domain/models'

export type PlanId = Pick<Plan.WithId, 'id'>
export type CreatePlan = Usecase<Plan.Common, PlanId>
export type GetPlan = Usecase<PlanId, Plan.WithId>

export type ContributionInput = {
  idCliente: string
  idPlano: string
  valorAporte: number
}

export type CreatePlanContribution = Usecase<
  ContributionInput,
  Pick<PlanContribution.WithId, 'id'>
>
