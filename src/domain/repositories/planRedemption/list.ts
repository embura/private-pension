import { PlanRedemption } from '@domain/models/planRedemption'

export namespace ListPlanRedemption {
  export interface List {
    execute(
      input: Pick<PlanRedemption.WithId, 'idPlano'>
    ): Promise<PlanRedemption.WithId[]>
  }
}
