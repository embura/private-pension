import { Collection } from 'mongodb'
import { CreatePlanRedemption } from '@domain/repositories/planRedemption/create'
import { PlanRedemption } from '@domain/models/planRedemption'

export class MongoCreatePlanRedemptionRepository
  implements CreatePlanRedemption.Create
{
  constructor(private readonly collection: Collection<PlanRedemption.Common>) {}

  async execute(
    input: PlanRedemption.Common
  ): Promise<Pick<PlanRedemption.WithId, 'id'>> {
    const { insertedId: id } = await this.collection.insertOne(input)

    return {
      id: id.toString()
    }
  }
}
