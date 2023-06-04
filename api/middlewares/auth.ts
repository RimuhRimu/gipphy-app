import { type RouterContext, verifyJWT } from '../deps.ts'
import { users } from '../db.ts'
import {
	INTERNAL_SERVER_ERROR_MSG,
	INVALID_JWT_MSG,
	OPERATION_SUCCESS_MSG,
	USER_NOT_FOUND_MSG,
} from '../const.ts'
import { importKey } from '../utils.ts'

const userMiddleware = async (
	ctx: RouterContext<string>,
	next: () => Promise<unknown>,
) => {
	try {
		// Get JWT from request if available
		const { value } = ctx.request.body({ type: 'json' })
		const { jwt } = await value

		console.log('using: ', { jwt })

		if (jwt) {
			const user = await users.findOne({ _jwt: jwt }, {
				noCursorTimeout: false,
			})

			// Validate JWT and if it is invalid delete from cookie
			if (user) {
				let isValid = true
				const key = await importKey(user._key)
				await verifyJWT(jwt, key).catch((e) => {
					console.error('There was an error with the JWT', e)
					isValid = false
				})

				if (isValid) {
					ctx.state.currentUser = user
					console.log('found', { user })
					await next()
				} else {
					ctx.cookies.delete('jwt')
					ctx.response.status = 400
					ctx.response.body = { success: false, message: INVALID_JWT_MSG }
				}
			} else {
				ctx.response.status = 405
				ctx.response.body = { success: false, message: USER_NOT_FOUND_MSG }
			}
		} else {
			console.log('Not valid JWT')
			ctx.state.currentUser = null
			ctx.response.status = 400
			ctx.response.body = { success: false, message: INVALID_JWT_MSG }
		}
	} catch (e) {
		console.error(e)
		ctx.response.status = 500
		ctx.response.body = { success: false, message: INTERNAL_SERVER_ERROR_MSG }
	}
}

const authUser = async (ctx: RouterContext<string>) => {
	const value = ctx.request.body({ type: 'json' }).value
	const { jwt } = await value

	const userDB = await users.findOne({ _jwt: jwt }, { noCursorTimeout: false })
	if (userDB) {
		ctx.response.status = 200
		ctx.response.body = {
			success: true,
			message: OPERATION_SUCCESS_MSG,
			favs: userDB.fav,
		}
	} else {
		ctx.response.status = 200
		ctx.response.body = {
			success: false,
			message: INVALID_JWT_MSG,
		}
	}
}

export { authUser, userMiddleware }
