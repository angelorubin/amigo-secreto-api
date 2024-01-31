import { getToday } from '../utils/get-today'

type Auth = {
  email: string
  password: string
}

export const authentication = ({ email, password }: Auth) => {
  console.log({ email, password })
  return true
  /**
  const currentPassword = getToday().split('/').join('')
  return password === currentPassword
  */

}

export const createToken = () => {
  const currentPassword = getToday().split('/').join('')
  return `${process.env.DEFAULT_TOKEN}${currentPassword}`
}

export const validateToken = (token: string) => {
  const currentToken = createToken()
  return token === currentToken
}
