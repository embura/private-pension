export const domain = {
  usecases: {
    customer: {
      create: Symbol.for('CreateCustomerUsecase')
    },
    product: {
      create: Symbol.for('CreateProductUsecase')
    }
  }
} as const
