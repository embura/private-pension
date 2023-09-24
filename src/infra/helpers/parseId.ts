import { Document } from 'mongodb'
import { GetPlanAndContributions } from '@domain/repositories/plan/getPlanAndContributions.aggregate'

export function parseId<Type>(document: Document): Type {
  const { _id, ...rest } = document
  return {
    ...rest,
    id: _id.toString()
  } as Type
}
