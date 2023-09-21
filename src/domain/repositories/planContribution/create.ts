import { PlanContribution } from '@domain/models'

export namespace CreatePlanContribution {
  export interface Create {
    execute(
      input: PlanContribution.Common
    ): Promise<Pick<PlanContribution.WithId, 'id'>>
  }
}
