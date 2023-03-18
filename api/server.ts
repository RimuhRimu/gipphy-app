import { Application, Router } from './deps.ts'
import { oakCors } from './deps.ts'

import { deleteFav, getFavs, login, postFav, register } from './routes.ts'
import { DEFAULT_PORT } from './const.ts'
import { userMiddleware } from './middlewares/auth.ts'
const router = new Router()
const app = new Application()

app.use(oakCors())

router
	.post('/login', login)
	.get('/favs', userMiddleware, getFavs)
	.delete('/favs/:id', userMiddleware, deleteFav)
	.post('/favs/:id', userMiddleware, postFav)
	.post('/register', register)
app.use(router.routes())
app.use(router.allowedMethods())

app.addEventListener('error', (evt) => console.log(evt.error))

app.listen({ port: DEFAULT_PORT })
