import { Collection, ObjectId } from 'mongodb'
import { ListPlanContribution } from '@domain/repositories/planContribution/list'
import { PlanContribution, Product } from '@domain/models'
import { PlanId } from '@domain/contracts/createPlan'

export class MongoGetPlanContributionRepository
  implements ListPlanContribution.List
{
  constructor(
    private readonly collection: Collection<PlanContribution.WithId>
  ) {}

  async execute(
    input: Pick<PlanContribution.WithId, 'id'>
  ): Promise<PlanContribution.WithId[]> {
    const planContribution = await this.collection
      .find({
        idPlano: new ObjectId(input.id) as unknown as string
      })
      .map((plan) => {
        const { _id, ...rest } = plan
        return rest
      })
      .toArray()

    return planContribution
  }
}
