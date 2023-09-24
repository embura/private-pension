import { Collection } from 'mongodb'
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
