import api from '../api'

export interface PhotoSchema {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export interface Photo extends PhotoSchema{}
export class Photo implements PhotoSchema {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string

  constructor(photoData: PhotoSchema) {
    Object.assign(this, photoData)
  }

  static async create(photo : Photo) {
    await api.post<Photo>('users/',{photo})
  }

  static async deleteById(photoId: number) {
    await api.delete(`albums/${photoId}`)
  }
}

export default Photo