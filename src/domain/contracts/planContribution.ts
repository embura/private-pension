import { PlanContribution } from '@domain/models'
import { Usecase } from './common'

export type PlanContributionId = Pick<PlanContribution.WithId, 'id'>
export type CreatePlanContribution = Usecase<
  PlanContribution.Common,
  PlanContributionId
>
