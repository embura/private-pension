export const domain = {
  usecases: {
    customer: {
      create: Symbol.for('CreateCustomerUsecase')
    },
    product: {
      create: Symbol.for('CreateProductUsecase')
    },
    plan: {
      create: Symbol.for('CreatePlanUsecase')
    },
    planContribution: {
      create: Symbol.for('CreatePlanContributionUsecase')
    }
  }
} as const
