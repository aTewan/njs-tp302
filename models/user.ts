import api from '../api'

export interface UserSchema {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: { lat: number, lng: number }
  }
  phone: string
  website: string
  company: { name: string, catchPhrase: string, bs: string }
}

export interface User extends UserSchema{}
export class User implements UserSchema{
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: { lat: number, lng: number }
  }
  phone: string
  website: string
  company: { name: string, catchPhrase: string, bs: string }

  constructor(userData: UserSchema) {
    Object.assign(this, userData)
  }

  static async create(user : User) {
    await api.post<User>('users/',{user})
  }

  static async deleteById(userId: number) {
    await api.delete(`users/${userId}`)
  }

  static async findById(userId: number):Promise<User> {
    const { data } = await api.get<UserSchema>(`users/${userId}`)
    const user = new User(data);
    return user
  }
}

export default User