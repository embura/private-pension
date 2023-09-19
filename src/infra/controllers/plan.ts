import { domain } from '@domain/common/ioc'
import { CreatePlanUsecase } from '@domain/usecases/plan/createPlan'
import { routes } from '@infra/common/baseRoutes'
import { CreatePlan, createPlanSchema } from '@infra/dto/http/createPlan.dto'
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
    private readonly createPlanUsecase: CreatePlanUsecase
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreatePlan) {
    const plan = createPlanSchema.parse(body)
    return this.createPlanUsecase.execute(plan)
  }
}
