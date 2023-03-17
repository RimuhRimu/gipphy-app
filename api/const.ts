import { Header } from 'jwt'

export const DEFAULT_PORT = 8080
export const ENV = `${Deno.cwd()}/.env.json`
export const HEADER: Header = {
	alg: 'HS512',
	type: 'JWT',
}
export const ALGORITHM: HmacImportParams = { name: 'HMAC', hash: 'SHA-512' }
