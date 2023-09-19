import { ObjectId } from 'mongodb'
import { z } from 'zod'

export const date = z.preprocess(
  (date) => (typeof date === 'string' ? new Date(date) : date),
  z.date()
)

export const mongoIdToString = (id: unknown) =>
  id instanceof ObjectId ? id.toString() : id

export const idSchema = z.preprocess(mongoIdToString, z.string())
