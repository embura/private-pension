import { PlanRedemption } from '@domain/models/planRedemption'

export namespace CreatePlanRedemption {
  export interface Create {
    execute(
      input: PlanRedemption.Common
    ): Promise<Pick<PlanRedemption.WithId, 'id'>>
  }
}
