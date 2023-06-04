import 'https://deno.land/x/dotenv@v3.2.0/load.ts'

import { Collection } from './deps.ts'
import { ALGORITHM, HEADER, USAGES } from './const.ts'
import { UserSchema } from './interfaces.ts'
import { User } from './users.ts'
import { makeJWT } from './deps.ts'

export async function importKey(key: JsonWebKey): Promise<CryptoKey> {
	return await crypto
		.subtle
		.importKey(
			'jwk',
			key,
			ALGORITHM,
			true,
			USAGES,
		)
}

export function getEnv() {
	const username = Deno.env.get('USERNAME')
	const password = Deno.env.get('PASSWORD')
	return {
		username,
		password,
	}
}

export async function generateUserSecret(user: User) {
	const _key = await crypto.subtle.generateKey(ALGORITHM, true, [
		'sign',
		'verify',
	])
	const currentTimestamp = Math.floor(Date.now() / 1000) // Current Unix timestamp in seconds
	const oneWeekInSeconds = 7 * 24 * 60 * 60 // One week worth of seconds
	const expirationTimestamp = currentTimestamp + oneWeekInSeconds // Expiration time as Unix timestamp

	const jwtPayload = { ...user, exp: expirationTimestamp }

	const _jwt = await makeJWT(HEADER, jwtPayload, _key)
	return { _key: await crypto.subtle.exportKey('jwk', _key), _jwt }
}

//debug utils
export async function logShowUsers(users: Collection<UserSchema>) {
	const cursor = users.find(undefined, { noCursorTimeout: false })
	for await (const user of cursor) {
		console.log(user)
	}
}
