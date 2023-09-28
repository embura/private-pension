import { PlanContracts } from '@domain/contracts'
import { CreatePlan } from '@domain/repositories/plan/create'

import { Plan } from '@domain/models/plan'
import { GetCustomer } from '@domain/repositories/customer/get'
import { NotFound } from '@domain/errors'
import { GetProduct } from '@domain/repositories/product/get'
import { allChecks } from '@domain/helpers/initialInvestmentValidation'

import { PlanExceptions } from '@domain/errors/PlanExceptions'

export class CreatePlanUsecase implements PlanContracts.CreatePlan {
  constructor(
    private readonly createPlanRepository: CreatePlan.Create,
    private readonly getCustomerRepository: GetCustomer.Get,
    private readonly getProductRepository: GetProduct.Get,
    private readonly validation = allChecks
  ) {}

  async execute(input: Plan.Common): Promise<PlanContracts.PlanId> {
    const customer = await this.getCustomerRepository.execute({
      id: input.idCliente
    })

    if (!customer) {
      throw new NotFound('Customer NotFount', {
        idCliente: input.idCliente
      })
    }

    const product = await this.getProductRepository.execute({
      id: input.idProduto
    })

    if (!product) {
      throw new NotFound('Product NotFount', {
        idProduto: input.idProduto
      })
    }

    const checkReason = this.validation
      .map((check) => {
        return check({ customer, product, plan: input })
      })
      .filter((c) => c !== null)

    if (checkReason.length > 0) {
      throw new PlanExceptions(checkReason.join(','))
    }

    return this.createPlanRepository.execute(input)
  }
}
