import { makeJWT } from './deps.ts'
import { type RouterContext } from './deps.ts'

import { HEADER } from './const.ts'
import { users } from './db.ts'
import { User } from './users.ts'
import { getEnv } from './utils.ts'

const login = async (ctx: RouterContext<string>) => {
	const { value } = ctx.request.body()
	const user: User = await value
	const { key } = await getEnv()

	const jwt = await makeJWT(
		HEADER,
		user,
		key,
	)
	ctx.response.body = { jwt: jwt }
}

const postFav = async (ctx: RouterContext<string>) => {
	const { user } = ctx.state.currentUser
	const { id } = ctx.params

	const userFound = await users.findOne(
		user,
		{ noCursorTimeout: false },
	)
	if (!userFound?.fav.includes(id)) {
		users.updateOne({ _id: userFound?._id }, {
			$push: { fav: { $each: [id] } },
		})
		console.log('inserted in db')
		ctx.response.body = { status: 'fav saved' }
		return
	}
	console.log('already in db')
}

const getFavs = async (ctx: RouterContext<string>) => {
	const { user } = ctx.state.currentUser
	const userFound = await users.findOne(user, { noCursorTimeout: false })
	if (!userFound) {
		ctx.response.body = { error: 404 }
		console.log('not found')
		return
	}
	ctx.response.body = { favs: userFound.fav }
}

const register = async (ctx: RouterContext<string>) => {
	const { value } = ctx.request.body()
	const user: User = await value
	const { username, password } = user

	//check if this user doesn't exists
	const cursor = await users.findOne(user, { noCursorTimeout: false })
	if (cursor) {
		console.log(`Found id: ${cursor} on user that wanted to register`)
		ctx.response.body = { error: 405 }
		return
	}

	//otherwise create the new user
	const { key } = await getEnv()
	const jwt = await makeJWT(
		HEADER,
		user,
		key,
	)

	users.insertOne({ username, password, fav: [] })
	ctx.response.body = { jwt }
}

const deleteFav = async (ctx: RouterContext<string>) => {
	const { value } = ctx.request.body()
	const { favs } = await value

	const { user } = ctx.state.currentUser

	const { id } = ctx.params

	console.log({ value, favs, user, id })

	const foundID = await users.findAndModify(user, {
		update: { $set: { fav: [...favs.filter((el: string) => el !== id)] } },
	})

	if (foundID) {
		ctx.response.status = 200
		ctx.response.body = { status: 200 }
		return
	}

	ctx.response.status = 400
	ctx.response.body = { status: 400 }
}

export { deleteFav, getFavs, login, postFav, register }
