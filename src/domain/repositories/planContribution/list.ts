import { PlanId } from '@domain/contracts/createPlan'
import { PlanContribution } from '@domain/models/planContribution'

export namespace ListPlanContribution {
  export interface List {
    execute(
      input: Pick<PlanContribution.WithId, 'id'>
    ): Promise<PlanContribution.WithId[]>
  }
}
