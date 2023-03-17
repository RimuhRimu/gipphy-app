import { ALGORITHM, ENV } from './const.ts'
import { envFile } from './interfaces.ts'

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
	const envFile = Deno.readTextFileSync(ENV)
	const envJson: envFile = JSON.parse(envFile)

	//if no key, generate a new one, e.g
	// - executed in other machine
	// - deleted the key field in .env.json
	// - actually the .env.json was deleted
	if (!envJson.key.k) {
		const key = await crypto.subtle.generateKey(
			ALGORITHM,
			true,
			['sign', 'verify'],
		)
		const keyExport = await crypto.subtle.exportKey('jwk', key)

		//save new key
		Deno.writeTextFileSync(ENV, JSON.stringify({ ...envJson, key: keyExport }))
		return {
			...envJson,
			key,
		}
	}

	//else return the actual environment variables
	return {
		...envJson,
		key: await crypto.subtle.importKey('jwk', envJson.key, ALGORITHM, true, [
			'sign',
			'verify',
		]),
	}
}
