export const infra = {
  environment: {
    database: {
      name: Symbol.for('databaseName'),
      caFile: Symbol.for('databaseCaFile'),
      url: Symbol.for('databaseUrl'),
      collectionsName: {
        customer: Symbol.for('customerCollectionName'),
        product: Symbol.for('productCollectionName'),
        plan: Symbol.for('planCollectionName'),
        planContribution: Symbol.for('planContributionCollectionName'),
        planRedemption: Symbol.for('planRedemptionCollectionName')
      }
    }
  },
  collections: {
    customer: Symbol.for('customerCollection'),
    product: Symbol.for('productCollection'),
    plan: Symbol.for('planCollection'),
    planContribution: Symbol.for('planContributionCollection'),
    planRedemption: Symbol.for('planRedemptionCollection')
  },
  providers: {
    mongo: Symbol.for('mongo'),
    client: Symbol.for('mongoClient'),
    database: Symbol.for('database')
  },
  repositories: {
    customer: {
      create: Symbol.for('createCustomerRepository'),
      get: Symbol.for('getCustomerRepository')
    },
    product: {
      create: Symbol.for('createProductRepository'),
      get: Symbol.for('getProductRepository')
    },
    plan: {
      create: Symbol.for('createPlanRepository'),
      get: Symbol.for('getPlanRepository'),
      getPlanAndConctribution: Symbol.for('getPlanAndContributionRepository')
    },
    planContribution: {
      create: Symbol.for('createPlanContributionRepository')
    },
    planRedemption: {
      create: Symbol.for('createPlanRedemptionRepository'),
      list: Symbol.for('listPlanRedemptionRepository')
    }
  }
} as const
