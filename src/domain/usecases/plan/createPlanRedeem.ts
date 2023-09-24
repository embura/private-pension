import { RedeemPlanContracts } from '@domain/contracts'
import { NotFound } from '@domain/errors'
import { PlanExceptions } from '@domain/errors/PlanExceptions'
import { GetPlanAndContributions } from '@domain/repositories/plan/getPlanAndContributions.aggregate'
import { CreatePlanRedemption } from '@domain/repositories/planRedemption/create'
import { ListPlanRedemption } from '@domain/repositories/planRedemption/list'
import { GetProduct } from '@domain/repositories/product/get'

export class CreatePlanRedeemUsecase implements RedeemPlanContracts.RedeemPlan {
  constructor(
    private readonly getPlanAndContributions: GetPlanAndContributions.Get,
    private readonly getProductRepository: GetProduct.Get,
    private readonly createPlanRedemption: CreatePlanRedemption.Create,
    private readonly listPlanRedemption: ListPlanRedemption.List
  ) {}

  async execute(
    input: RedeemPlanContracts.Input
  ): Promise<RedeemPlanContracts.Output> {
    const planAndContributions = await this.getPlanAndContributions.execute({
      id: input.idPlano
    })

    if (!planAndContributions) {
      throw new NotFound(`Plan not found ${input.idPlano}`)
    }
    const { contributions, ...plan } = planAndContributions

    const product = await this.getProductRepository.execute({
      id: plan.idProduto
    })

    if (!product) {
      throw new NotFound(`Produc not found ${plan.idProduto}`)
    }

    const redemptions = await this.listPlanRedemption.execute({
      idPlano: input.idPlano
    })

    const today = new Date()
    const initialRedemptionDate = new Date(plan.createdAt)
    initialRedemptionDate.setDate(
      initialRedemptionDate.getDate() + product.carenciaInicialDeResgate
    )

    if (redemptions.length === 0 && initialRedemptionDate > today) {
      throw new PlanExceptions('not allowed to redeem plan')
    }

    if (redemptions[0]?.createdAt) {
      const dateAfterLastRedemption = new Date(redemptions[0].createdAt)
      dateAfterLastRedemption.setDate(
        dateAfterLastRedemption.getDate() + product.carenciaEntreResgates
      )

      if (dateAfterLastRedemption > today) {
        throw new PlanExceptions('not allowed to redeem plan')
      }
    }

    // fazer deduções de valores

    return this.createPlanRedemption.execute({
      idPlano: input.idPlano,
      valorResgate: input.valorResgate,
      createdAt: new Date()
    })
  }
}
