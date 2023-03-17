import { Bson } from 'mongodb'

export interface envFile {
	readonly username: string
	readonly password: string
	readonly key: JsonWebKey
}

export interface UserSchema {
	readonly _id: Bson.ObjectId
	username: string
	password: string
	fav: string[]
}
