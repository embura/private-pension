import { domain } from '@domain/common/ioc'
import { ContributionInput } from '@domain/contracts/plan'
import { Customer, Plan } from '@domain/models'
import {
  CreatePlanUsecase,
  CreatePlanContributionUsecase
} from '@domain/usecases/plan'
import { routes } from '@infra/common/baseRoutes'
import { idSchema } from '@infra/dto/common/types'
import {
  createContribution,
  createContributionSchema,
  CreatePlan,
  createPlanSchema
} from '@infra/dto/http'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post
} from '@nestjs/common'

@Controller(routes.plans)
export class PlanController {
  constructor(
    @Inject(domain.usecases.plan.create)
    private readonly createPlanUsecase: CreatePlanUsecase,
    @Inject(domain.usecases.planContribution.create)
    private readonly createPlanContributionUsecase: CreatePlanContributionUsecase
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreatePlan) {
    const plan = createPlanSchema.parse(body)
    return this.createPlanUsecase.execute(plan)
  }

  @Post('/:id/add')
  @HttpCode(HttpStatus.CREATED)
  createContribution(
    @Param('id') id: string,
    @Body() body: createContribution
  ) {
    const idPlano = idSchema.parse(id)
    const planContributionToCreate = createContributionSchema.parse(body)

    const input: ContributionInput = {
      idCliente: planContributionToCreate.idCliente,
      idProduto: planContributionToCreate.idProduto,
      valorAporte: planContributionToCreate.valorAporte,
      idPlano
    } as unknown as ContributionInput

    return this.createPlanContributionUsecase.execute(input)
  }
}
