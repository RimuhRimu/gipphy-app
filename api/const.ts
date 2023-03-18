import { Header } from 'https://deno.land/x/djwt@v2.8/mod.ts'

export const DEFAULT_PORT = 8080
export const ENV = `${Deno.cwd()}/.env.json`
export const HEADER: Header = {
  alg: 'HS512',
  type: 'JWT',
}
export const ALGORITHM: HmacImportParams = { name: 'HMAC', hash: 'SHA-512' }
