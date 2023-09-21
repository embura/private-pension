import { Collection } from 'mongodb'
import { CreatePlan } from '@domain/repositories/plan/create'
import { Plan } from '@domain/models/plan'
import { ProductContracts } from '@domain/contracts'
import { CreatePlanContribution } from '@domain/repositories/planContribution/create'
import { PlanContribution } from '@domain/models'

export class MongoCreatePlanContributionRepository
  implements CreatePlanContribution.Create
{
  constructor(
    private readonly collection: Collection<PlanContribution.Common>
  ) {}

  async execute(
    input: PlanContribution.Common
  ): Promise<Pick<PlanContribution.WithId, 'id'>> {
    const { insertedId: id } = await this.collection.insertOne(input)

    return {
      id: id.toString()
    }
  }
}
