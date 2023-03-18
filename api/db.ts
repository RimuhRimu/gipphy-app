import { MongoClient } from './deps.ts'
import { UserSchema } from './interfaces.ts'
import { getEnv } from './utils.ts'

const { username, password } = await getEnv()
// Connecting to a Mongo Atlas Database

const client = new MongoClient()
await client.connect({
  db: 'app_users',
  tls: true,
  servers: [
    {
      host: 'ac-qtbaq6b-shard-00-02.tlzyawz.mongodb.net',
      port: 27017,
    },
    {
      host: 'ac-qtbaq6b-shard-00-01.tlzyawz.mongodb.net',
      port: 27017,
    },
    {
      host: 'ac-qtbaq6b-shard-00-00.tlzyawz.mongodb.net',
      port: 27017,
    },
  ],
  credential: {
    username: username,
    password: password,
    db: 'app_users',
    mechanism: 'SCRAM-SHA-1',
  },
})
const db = client.database('app_users')
const users = db.collection<UserSchema>('users')
console.log('Connection stablished with the database!')

export { users }
