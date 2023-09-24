import { Collection, ObjectId } from 'mongodb'
import { GetPlan } from '@domain/repositories/plan/get'
import { Plan } from '@domain/models/plan'
import { PlanContracts } from '@domain/contracts'

export class MongoGetPlanRepository implements GetPlan.Get {
  constructor(private readonly collection: Collection<Plan.WithId>) {}

  async execute(input: PlanContracts.PlanId): Promise<Plan.WithId | null> {
    const plan = await this.collection.findOne({
      _id: new ObjectId(input.id)
    })

    if (!plan) {
      return null
    }

    const { _id: id, ...rest } = plan

    return {
      ...rest,
      id: id.toString()
    }
  }
}
