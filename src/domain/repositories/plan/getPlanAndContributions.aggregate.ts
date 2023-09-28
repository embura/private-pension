import { PlanId } from '@domain/contracts/createPlan'
import { Plan } from '@domain/models/plan'
import { PlanContribution } from '@domain/models/planContribution'

export namespace GetPlanAndContributions {
  export interface Output extends Plan.WithId {
    contributions: PlanContribution.WithId[]
  }

  export interface Get {
    execute(input: PlanId): Promise<Output | null>
  }
}
