import { Collection, Sort } from 'mongodb'
import { ListPlanRedemption } from '@domain/repositories/planRedemption/list'
import { PlanRedemption } from '@domain/models/planRedemption'
import { parseId } from '@infra/helpers/parseId'

export class MongoListPlanRedemptionRepository
  implements ListPlanRedemption.List
{
  constructor(private readonly collection: Collection<PlanRedemption.Common>) {}

  async execute(
    input: Pick<PlanRedemption.WithId, 'idPlano'>
  ): Promise<PlanRedemption.WithId[]> {
    const sort: Sort = {
      createdAt: -1
    }

    console.log(
      '\n\n\n\n\n\n\n\n\n\n\n\n\n\n[MongoListPlanRedemptionRepository]: ',
      {
        input,
        sort
      }
    )

    const planRedemption = await this.collection
      .find(input)
      .sort(sort)
      .toArray()
      .then((docs) => docs.map((c) => parseId<PlanRedemption.WithId>(c)))

    if (!planRedemption) {
      return []
    }

    return planRedemption
  }
}
