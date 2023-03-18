import { ALGORITHM, ENV } from './const.ts'
import 'dotenv'

export function jsonToKey(json: JsonWebKey) {
	return crypto
		.subtle
		.importKey(
			'jwk',
			json,
			ALGORITHM,
			true,
			['sign', 'verify'],
		)
}

export async function getEnv() {
	//retrieve environment variables
	let key = JSON.parse(Deno.env.get('KEY') || '')
	const username = Deno.env.get('USERNAME')
	const password = Deno.env.get('PASSWORD')

	//if no key, generate a new one, e.g
	// - executed in other machine
	// - deleted the key field in .env
	// - deleted .env file
	if (!Object.values(key).length) {
		key = await crypto.subtle.generateKey(
			ALGORITHM,
			true,
			['sign', 'verify'],
		)

		return {
			username: username,
			password: password,
			key,
		}
	}

	//else return the actual environment variables
	return {
		username: username,
		password: password,
		key: await crypto.subtle.importKey('jwk', key, ALGORITHM, true, [
			'sign',
			'verify',
		]),
	}
}
