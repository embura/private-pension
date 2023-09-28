import { domain } from '@domain/common/ioc'
import { RedemptionPlanContracts } from '@domain/contracts'
import { ContributionInput } from '@domain/contracts/createPlan'
import {
  CreatePlanUsecase,
  CreatePlanContributionUsecase,
  CreatePlanRedeemUsecase
} from '@domain/usecases/plan'
import { routes } from '@infra/common/baseRoutes'
import {
  createContribution,
  createContributionSchema,
  CreatePlan,
  createPlanSchema
} from '@infra/dto/http'
import {
  createRedeem,
  createRedeemSchema
} from '@infra/dto/http/cratePlanRedeem.dto'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post
} from '@nestjs/common'

@Controller(routes.plans)
export class PlanController {
  constructor(
    @Inject(domain.usecases.plan.create)
    private readonly createPlanUsecase: CreatePlanUsecase,
    @Inject(domain.usecases.plan.contribution)
    private readonly createPlanContributionUsecase: CreatePlanContributionUsecase,
    @Inject(domain.usecases.plan.redeem)
    private readonly createPlanRedeemUsecase: CreatePlanRedeemUsecase
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreatePlan) {
    const plan = createPlanSchema.parse(body)
    return this.createPlanUsecase.execute({
      ...plan,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  @Post('/contribution')
  @HttpCode(HttpStatus.CREATED)
  createContribution(@Body() body: createContribution) {
    const planContributionToCreate = createContributionSchema.parse(body)

    const input: ContributionInput = {
      idCliente: planContributionToCreate.idCliente,
      idPlano: planContributionToCreate.idPlano,
      valorAporte: planContributionToCreate.valorAporte
    }

    return this.createPlanContributionUsecase.execute(input)
  }

  @Post('/redeem')
  @HttpCode(HttpStatus.CREATED)
  redeem(@Body() body: createRedeem) {
    const planRedeemToCreate = createRedeemSchema.parse(body)

    const input: RedemptionPlanContracts.Input = {
      idCliente: planRedeemToCreate.idCliente,
      idPlano: planRedeemToCreate.idPlano,
      valorResgate: planRedeemToCreate.valorResgate
    }

    return this.createPlanRedeemUsecase.execute(input)
  }
}
