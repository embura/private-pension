export const domain = {
  usecases: {
    customer: {
      create: Symbol.for('CreateCustomerUsecase')
    },
    product: {
      create: Symbol.for('CreateProductUsecase')
    },
    plan: {
      create: Symbol.for('CreatePlanUsecase'),
      redeem: Symbol.for('createPlanRedeemusecase'),
      contribution: Symbol.for('CreatePlanContributionUsecase')
    }
  }
} as const
