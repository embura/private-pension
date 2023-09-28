import { z } from 'zod'
import { GetSecretValueCommand } from '@aws-sdk/client-secrets-manager'

import { SecretsManagerClient } from '@infra/providers/secretsManager'

const secretSchema = z.object({
  MONGO_URL: z.string().optional(),
  MONGO_DB_NAME: z.string(),
  MONGO_PRODUCT_COLLECTION: z.string(),
  MONGO_CUSTOMER_COLLECTION: z.string(),
  MONGO_PLAN_COLLECTION: z.string(),
  MONGO_PLAN_CONTRIBUTION_COLLECTION: z.string(),
  MONGO_PLAN_REDEMPTION_COLLECTION: z.string()
})

type Secrets = z.infer<typeof secretSchema>

export const getSecrets = async (): Promise<Secrets> => {
  if (
    process.env['NODE_ENV'] !== 'production' &&
    process.env['NODE_ENV'] !== 'homologation'
  ) {
    return {
      MONGO_DB_NAME: 'private-pension',
      MONGO_PRODUCT_COLLECTION: 'product',
      MONGO_CUSTOMER_COLLECTION: 'customer',
      MONGO_PLAN_COLLECTION: 'plan',
      MONGO_PLAN_CONTRIBUTION_COLLECTION: 'planContribution',
      MONGO_PLAN_REDEMPTION_COLLECTION: 'planRedemption'
    }
  }

  const secretsManager = new SecretsManagerClient().connect()

  const secretId = process.env['SECRET_ID']

  if (!secretId) {
    throw new Error('SECRET_ID is not defined')
  }

  const command = new GetSecretValueCommand({ SecretId: secretId })

  const { SecretString } = await secretsManager.connection.send(command)

  if (!SecretString) {
    throw new Error('Secret not found')
  }

  const secretObject = JSON.parse(SecretString)

  return secretSchema.parse({
    ...secretObject,
    MONGO_DB_NAME: process.env['MONGO_DB_NAME'],
    MONGO_PRODUCT_COLLECTION: process.env['MONGO_PRODUCT_COLLECTION'],
    MONGO_CUSTOMER_COLLECTION: process.env['MONGO_CUSTOMER_COLLECTION'],
    MONGO_PLAN_COLLECTION: process.env['MONGO_PLAN_COLLECTION'],
    MONGO_PLAN_CONTRIBUTION_COLLECTION:
      process.env['MONGO_PLAN_CONTRIBUTION_COLLECTION'],
    MONGO_PLAN_REDEMPTION_COLLECTION:
      process.env['MONGO_PLAN_REDEMPTION_COLLECTION']
  })
}
