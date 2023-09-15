export const infra = {
  environment: {
    database: {
      name: Symbol.for('databaseName'),
      caFile: Symbol.for('databaseCaFile'),
      url: Symbol.for('databaseUrl'),
      collectionsName: {
        customer: Symbol.for('customerCollectionName'),
        product: Symbol.for('productCollectionName')
      }
    }
  },
  collections: {
    customer: Symbol.for('customerCollection'),
    product: Symbol.for('productCollection')
  },
  providers: {
    mongo: Symbol.for('mongo'),
    client: Symbol.for('mongoClient'),
    database: Symbol.for('database')
  },
  repositories: {
    customer: {
      create: Symbol.for('createCustomerRepository')
    },
    product: {
      create: Symbol.for('createProductRepository')
    }
  }
} as const
