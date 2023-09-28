import { PlanId } from '@domain/contracts/createPlan'
import { Plan } from '@domain/models/plan'

export namespace GetPlan {
  export interface Get {
    execute(input: PlanId): Promise<Plan.WithId | null>
  }
}
