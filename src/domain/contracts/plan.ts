import { Plan } from '@domain/models/plan'
import { Usecase } from './common'

export type PlanId = Pick<Plan.WithId, 'id'>
export type CreatePlan = Usecase<Plan.Common, PlanId>
