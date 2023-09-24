import { Collection, Document, ObjectId } from 'mongodb'
import { GetPlanAndContributions } from '@domain/repositories/plan/getPlanAndContributions.aggregate'
import { PlanContracts } from '@domain/contracts'
import { parseId } from '@infra/helpers/parseId'
import { PlanContribution } from '@domain/models'

export class MongoGetPlanAndContributionRepository
  implements GetPlanAndContributions.Get
{
  constructor(
    private readonly collection: Collection<GetPlanAndContributions.Output>
  ) {}

  async execute(
    input: PlanContracts.PlanId
  ): Promise<GetPlanAndContributions.Output | null> {
    const [planAndContributios] = await this.collection
      .aggregate<GetPlanAndContributions.Output>([
        {
          $match: {
            _id: new ObjectId(input.id)
          }
        },
        {
          $lookup: {
            from: 'planContribution',
            localField: '_id',
            foreignField: 'idPlano',
            as: 'contributions'
          }
        }
      ])
      .toArray()
      .then((results) => {
        return results.map((plan) => {
          const { contributions, ...rest } =
            parseId<GetPlanAndContributions.Output>(plan)

          return {
            ...rest,
            contributions: contributions.map((c) =>
              parseId<PlanContribution.WithId>(c)
            )
          }
        })
      })

    if (!planAndContributios) {
      return null
    }

    return planAndContributios
  }
}
