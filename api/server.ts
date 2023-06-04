import { Application, Router } from './deps.ts'
import { oakCors } from './deps.ts'

import { deleteFav, getFavs, login, postFav, register } from './routes.ts'
import { authUser, userMiddleware } from './middlewares/auth.ts'
const router = new Router()
const app = new Application()

app.use(oakCors())

router
  .post('/login', login)
  .post('/auth', authUser)
  .post('/favs', userMiddleware, getFavs)
  .delete('/favs/:id', userMiddleware, deleteFav)
  .post('/favs/:id', userMiddleware, postFav)
  .post('/register', register)

app.use((ctx) => {
  ctx.response.body = 'Hello World from Oak!'
})

app.addEventListener('error', (evt) => console.log(evt.error))

export default app.handle
