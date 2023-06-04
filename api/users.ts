interface User {
  username: string
  password: string
  [key: string]: string
}

const users: User[] = [
  {
    username: 'jose',
    password: '1234xd',
  },
]

export type { User }
export { users }
