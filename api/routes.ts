import { compare, genSalt, hash, makeJWT, type RouterContext } from './deps.ts'

import {
	FAILURE_DELETE_FAV,
	FAV_ALREADY_IN_DB,
	HEADER,
	INTERNAL_SERVER_ERROR_MSG,
	INVALID_REQUEST_BODY_ERROR_MSG,
	OPERATION_SUCCESS_MSG,
	SUCCESS_DELETE_FAV,
	USER_ALREADY_EXIST_MSG,
	USERNAME_PASSWORD_ERROR_MSG,
} from './const.ts'

import { users } from './db.ts'
import { generateUserSecret, importKey } from './utils.ts'
import { User } from './users.ts'

const login = async (ctx: RouterContext<string>) => {
	try {
		const { username, password }: User = await ctx.request.body({
			type: 'json',
		})
			.value
		console.log({ username, password })

		if (
			!username || username.length === 0 || !password || password.length === 0
		) {
			ctx.response.status = 400
			ctx.response.body = {
				success: false,
				message: INVALID_REQUEST_BODY_ERROR_MSG,
			}
			return
		}

		const userDB = await users.findOne({ username }, { noCursorTimeout: false })
		const isValidPass = await compare(password, userDB?.password || '')

		if (isValidPass && userDB) {
			const { _key } = userDB
			const key = await importKey(_key)
			const currentTimestamp = Math.floor(Date.now() / 1000) // Current Unix timestamp in seconds
			const oneWeekInSeconds = 7 * 24 * 60 * 60 // One week worth of seconds
			const expirationTimestamp = currentTimestamp + oneWeekInSeconds // Expiration time as Unix timestamp

			const user = { username, password: userDB.password }
			const jwtPayload = { ...user, exp: expirationTimestamp }
			const jwt = await makeJWT(HEADER, jwtPayload, key)

			await users.findAndModify(userDB, {
				update: {
					$set: {
						_jwt: jwt,
					},
				},
			})

			ctx.response.status = 200
			ctx.response.body = { jwt, favs: userDB.fav }
		} else {
			ctx.response.status = 401
			ctx.response.body = {
				success: false,
				message: USERNAME_PASSWORD_ERROR_MSG,
			}
		}
	} catch (e) {
		console.error(e)
		ctx.response.status = 500
		ctx.response.body = { success: false, message: INTERNAL_SERVER_ERROR_MSG }
	}
}

const postFav = (ctx: RouterContext<string>) => {
	try {
		const user = ctx.state.currentUser
		const { id } = ctx.params
		console.log({ id, user })

		if (!user?.fav.includes(id)) {
			users.updateOne({ _id: user?._id }, {
				$push: { fav: { $each: [id] } },
			})
			console.log('inserted in db')
			ctx.response.status = 200
			ctx.response.body = { success: true, message: OPERATION_SUCCESS_MSG }
		} else {
			ctx.response.status = 200
			ctx.response.body = { success: false, message: FAV_ALREADY_IN_DB }
		}
	} catch (e) {
		console.error(e)
		ctx.response.status = 500
		ctx.response.body = { success: false, message: INTERNAL_SERVER_ERROR_MSG }
	}
}

const getFavs = (ctx: RouterContext<string>) => {
	const user = ctx.state.currentUser
	ctx.response.status = 200
	ctx.response.body = { favs: user.fav }
}

const register = async (ctx: RouterContext<string>) => {
	try {
		const { username, password } = await ctx.request.body({ type: 'json' })
			.value
		const user = { username }

		//check if this user doesn't exists
		const cursor = await users.findOne(user, { noCursorTimeout: false })
		if (cursor) {
			console.log(`Found user: {${cursor.username}} cannot perform register`)
			ctx.response.status = 405
			ctx.response.body = { success: false, message: USER_ALREADY_EXIST_MSG }
			return
		}

		// Hash the password using bcrypt
		const _salt = await genSalt(10)
		const hashedPassword = await hash(password, _salt)

		// create the new user and save it to database
		const { _jwt, _key } = await generateUserSecret({
			username: user.username,
			password: hashedPassword,
		})

		users.insertOne({
			username,
			password: hashedPassword,
			fav: [],
			_key,
			_jwt,
			_salt,
		})
		ctx.response.body = { _jwt }
	} catch (e) {
		console.error(e)
		ctx.response.status = 500
		ctx.response.body = { success: false, message: INTERNAL_SERVER_ERROR_MSG }
	}
}

const deleteFav = async (ctx: RouterContext<string>) => {
	try {
		const { id } = ctx.params

		const user = ctx.state.currentUser
		const { fav } = user

		const foundID = await users.findAndModify(user, {
			update: { $set: { fav: [...fav.filter((el: string) => el !== id)] } },
		})

		if (foundID) {
			ctx.response.status = 200
			ctx.response.body = { success: true, message: SUCCESS_DELETE_FAV }
			return
		}

		ctx.response.status = 400
		ctx.response.body = { success: false, message: FAILURE_DELETE_FAV }
	} catch (e) {
		console.error(e)
		ctx.response.status = 500
		ctx.response.body = { success: false, message: INTERNAL_SERVER_ERROR_MSG }
	}
}

export { deleteFav, getFavs, login, postFav, register }
