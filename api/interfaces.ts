import { Bson } from './db.ts'

export interface UserSchema {
  readonly _id: Bson.ObjectId
  username: string
  password: string
  fav: string[]
}
