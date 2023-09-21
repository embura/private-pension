import { Collection } from 'mongodb'
import { CreatePlan } from '@domain/repositories/plan/create'
import { Plan } from '@domain/models/plan'
import { ProductContracts } from '@domain/contracts'

export class MongoCreatePlanRepository implements CreatePlan.Create {
  constructor(private readonly collection: Collection<Plan.Common>) {}

  async execute(input: Plan.Common): Promise<ProductContracts.ProdutId> {
    const { insertedId: id } = await this.collection.insertOne(input)
    return {
      id: id.toString()
    }
  }
}
