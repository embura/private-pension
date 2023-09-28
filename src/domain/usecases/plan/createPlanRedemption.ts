import { RedemptionPlanContracts } from '@domain/contracts'
import { NotFound } from '@domain/errors'
import { PlanExceptions } from '@domain/errors/PlanExceptions'
import { calculateCustomerAge } from '@domain/helpers/initialInvestmentValidation'
import { GetCustomer } from '@domain/repositories/customer/get'
import { GetPlanAndContributions } from '@domain/repositories/plan/getPlanAndContributions.aggregate'
import { CreatePlanRedemption } from '@domain/repositories/planRedemption/create'
import { ListPlanRedemption } from '@domain/repositories/planRedemption/list'
import { GetProduct } from '@domain/repositories/product/get'

export class CreatePlanRedeemUsecase
  implements RedemptionPlanContracts.RedemptionPlan
{
  constructor(
    private readonly getPlanAndContributions: GetPlanAndContributions.Get,
    private readonly getProductRepository: GetProduct.Get,
    private readonly createPlanRedemption: CreatePlanRedemption.Create,
    private readonly listPlanRedemption: ListPlanRedemption.List,
    private readonly getCustomerRepository: GetCustomer.Get
  ) {}

  async execute(
    input: RedemptionPlanContracts.Input
  ): Promise<RedemptionPlanContracts.Output> {
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

    const customer = await this.getCustomerRepository.execute({
      id: input.idCliente
    })

    if (!customer) {
      throw new PlanExceptions('Customer not found')
    }

    const [lastRedemption] = await this.listPlanRedemption.execute({
      idPlano: input.idPlano
    })

    const today = new Date()
    const initialPlanRedemptionDate = new Date(plan.createdAt)
    initialPlanRedemptionDate.setDate(
      initialPlanRedemptionDate.getDate() + product.carenciaInicialDeResgate
    )

    if (initialPlanRedemptionDate > today) {
      throw new PlanExceptions('not allowed to redeem plan')
    }

    if (lastRedemption) {
      const dateAfterLastRedemption = new Date(lastRedemption.createdAt)
      dateAfterLastRedemption.setDate(
        dateAfterLastRedemption.getDate() + product.carenciaEntreResgates
      )

      if (dateAfterLastRedemption > today) {
        throw new PlanExceptions('not allowed to redeem plan')
      }
    }

    // TODO: fazer deduções de valores
    // avaliar regra de deduçoes de valores

    return this.createPlanRedemption.execute({
      idPlano: input.idPlano,
      valorResgate: input.valorResgate,
      createdAt: new Date()
    })
  }
}
