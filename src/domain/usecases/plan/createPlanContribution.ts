import { PlanContracts } from '@domain/contracts'
import { NotFound } from '@domain/errors'
import { PlanContribution } from '@domain/models'
import { GetCustomer } from '@domain/repositories/customer/get'
import { GetPlan } from '@domain/repositories/plan/get'
import { GetProduct } from '@domain/repositories/product/get'
import { CreatePlanContribution } from '@domain/repositories/planContribution/create'

export class CreatePlanContributionUsecase
  implements PlanContracts.CreatePlanContribution
{
  constructor(
    private readonly getPlanRepository: GetPlan.Get,
    private readonly getCustomerRepository: GetCustomer.Get,
    private readonly getProductRepository: GetProduct.Get,
    private readonly createPlanContribution: CreatePlanContribution.Create
  ) {}

  async execute(
    input: PlanContracts.ContributionInput
  ): Promise<Pick<PlanContribution.WithId, 'id'>> {
    const plan = await this.getPlanRepository.execute({
      id: input.idPlano
    })

    if (!plan) {
      throw new NotFound('Not fount planId', {
        idPlano: input.idPlano
      })
    }

    const customer = await this.getCustomerRepository.execute({
      id: input.idCliente
    })

    if (!customer) {
      throw new NotFound('Not fount Customer', {
        idCliente: input.idCliente
      })
    }

    return this.createPlanContribution.execute({
      idCliente: input.idCliente,
      idPlano: input.idPlano,
      valorAporte: input.valorAporte
    })
  }
}
