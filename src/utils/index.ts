import { char, timestamp } from 'drizzle-orm/mysql-core'
import { nanoid } from 'nanoid'

export const timestamps = () => ({
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow()
})

export const tableId = (start?: string, end?: string) =>
  char('id', { length: 30 })
    .primaryKey()
    .$defaultFn(() => id(start, end))

export const id = (start?: string, end?: string) =>
  `${start ?? ''}${nanoid()}${end ?? ''}`.trim()

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const clone = { ...obj }
  for (const key of keys) {
    delete clone[key]
  }
  return clone
}
