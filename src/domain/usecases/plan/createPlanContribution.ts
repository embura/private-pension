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
    console.log({ input })
    const plan = await this.getPlanRepository.execute({
      id: input.idPlano as unknown as string
    })

    if (!plan) {
      throw new NotFound('Not fount planId', {
        idPlano: input.idPlano
      })
    }

    const customer = await this.getCustomerRepository.execute({
      id: input.idCliente as unknown as string
    })

    if (!customer) {
      throw new NotFound('Not fount Customer', {
        idCliente: input.idCliente
      })
    }

    const product = await this.getProductRepository.execute({
      id: input.idProduto as unknown as string
    })

    if (!product) {
      throw new NotFound('Not fount Product', {
        idCliente: input.idCliente
      })
    }

    console.log({ plan })
    console.log({ customer })
    console.log({ product })

    const planContribution = await this.createPlanContribution.execute({
      idCliente: input.idCliente,
      idProduto: input.idProduto,
      valorAporte: input.valorAporte
    })

    return planContribution.id as any
  }
}
