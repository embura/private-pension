import { PlanId } from '@domain/contracts/createPlan'
import { Plan } from '@domain/models/plan'

export namespace CreatePlan {
  export interface Create {
    execute(input: Plan.Common): Promise<PlanId>
  }
}
