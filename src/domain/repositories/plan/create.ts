import { PlanId } from '@domain/contracts/plan'
import { Plan } from '@domain/models/plan'

export namespace CreatePlan {
  export interface Create {
    create(input: Plan.Common): Promise<PlanId>
  }
}
