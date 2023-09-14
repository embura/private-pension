export const infra = {
  environment: {
    database: {
      name: Symbol.for('databaseName'),
      caFile: Symbol.for('databaseCaFile'),
      url: Symbol.for('databaseUrl'),
      collectionsName: {
        customer: Symbol.for('customerCollectionName')
      }
    }
  },
  collections: {
    customer: Symbol.for('customerCollection')
  },
  providers: {
    mongo: Symbol.for('mongo'),
    client: Symbol.for('mongoClient'),
    database: Symbol.for('database')
  },
  repositories: {
    customer: {
      create: Symbol.for('createCustomerRepository')
    }
  }
} as const
