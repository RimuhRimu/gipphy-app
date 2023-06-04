import { Header } from './deps.ts'

//server status messages
export const USERNAME_PASSWORD_ERROR_MSG = 'Invalid username or password'
export const OPERATION_SUCCESS_MSG = 'The operation was successful'
export const FAV_ALREADY_IN_DB = 'The fav is already in the database'
export const SUCCESS_DELETE_FAV = 'The fav was successfully deleted'
export const FAILURE_DELETE_FAV = 'The fav wasn\'t deleted'
export const USER_ALREADY_EXIST_MSG = 'User already exists'
export const USER_NOT_FOUND_MSG = 'User not found'
export const INVALID_REQUEST_BODY_ERROR_MSG = 'Invalid request body'
export const INVALID_JWT_MSG = 'Invalid JWT'
export const INTERNAL_SERVER_ERROR_MSG =
	'Oops! Something went wrong. Please try again later.'

export const DEFAULT_PORT = 8080

//encription settings
export const HEADER: Header = {
	alg: 'HS512',
	type: 'JWT',
}
export const ALGORITHM: HmacImportParams = { name: 'HMAC', hash: 'SHA-512' }
export const USAGES: KeyUsage[] = ['sign', 'verify']
