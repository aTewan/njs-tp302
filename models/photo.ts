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
    await api.post<Photo>('photos/',{photo})
  }

  static async deleteById(photoId: number) {
    await api.delete(`photos/${photoId}`)
  }

  static async findById(photoId: number):Promise<Photo> {
    const { data } = await api.get<PhotoSchema>(`photos/${photoId}`)
    const photo = new Photo(data);
    return photo
  }
}

export default Photo