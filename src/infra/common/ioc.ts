export const infra = {
  environment: {
    database: {
      name: Symbol.for('databaseName'),
      caFile: Symbol.for('databaseCaFile'),
      url: Symbol.for('databaseUrl'),
      collectionsName: {
        client: Symbol.for('clientCollectionName')
      }
    }
  },
  collections: {
    client: Symbol.for('clientCollection')
  },
  providers: {
    mongo: Symbol.for('mongo'),
    client: Symbol.for('mongoClient'),
    database: Symbol.for('database')
  },
  repositories: {
    client: {
      create: Symbol.for('createClientRepository')
    }
  }
} as const
