import { Bson } from './deps.ts'

export interface UserSchema {
	readonly _id: Bson.ObjectId
	readonly _key: JsonWebKey
	readonly _jwt: string
	readonly _salt: string
	username: string
	password: string
	fav: string[]
}

export interface User {
	username: string
	password: string
	[key: string]: string
}
