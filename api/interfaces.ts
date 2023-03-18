import { Bson } from 'mongodb'

export interface UserSchema {
	readonly _id: Bson.ObjectId
	username: string
	password: string
	fav: string[]
}
