import { verifyJWT } from '../deps.ts'
import { type Context } from '../deps.ts'
import { users } from '../db.ts'
import { getEnv } from '../utils.ts'

const userMiddleware = async (ctx: Context, next: () => Promise<unknown>) => {
	// Get JWT from request if available
	const { value } = ctx.request.body()
	let { jwt } = await value

	if (!jwt) {
		jwt = ctx.request.headers.get('Authorization')
	}

	console.log('using: ', { jwt })
	const { key } = await getEnv()

	if (jwt) {
		let isValid = true
		// Validate JWT and if it is invalid delete from cookie
		const data = await verifyJWT(jwt, key).catch((err: Error) => {
			isValid = false
			console.log('Error with JWT ', err)
		})

		// if (!data.isValid || data.isExpired) {
		// 	ctx.cookies.delete('jwt')
		// 	ctx.response.status = 401
		// } else
		if (data && isValid) {
			// If it is valid select user and save in context state
			const user: unknown = await users.findOne(data, {
				noCursorTimeout: false,
			})
			ctx.state.currentUser = user
			console.log('found', { user })
			await next()
		} else {
			ctx.cookies.delete('jwt')
			ctx.response.body = { error: 407 }
		}
	} else {
		console.log('Not valid JWT')
		ctx.state.currentUser = null
		await next()
	}
}

export { userMiddleware }
