import { UserSchema } from "./user";
import { PhotoSchema } from "./photo";
import api from '../api'

export interface AlbumSchema {
  userId: number
  id: number
  title: string
}

export class Album implements AlbumSchema {
  userId: number
  id: number
  title: string

  user: UserSchema | void = null
  photos: PhotoSchema[] = []

  constructor(albumData: AlbumSchema) {
    Object.assign(this, albumData)
  }

  static async findById(albumId: number, includes?: string[]): Promise<Album> {
    const { data } = await api.get<AlbumSchema>(`albums/${albumId}`)
    const album = new Album(data)
    if (includes && includes.length) await album.loadIncludes(includes)
    return album
  }

  async loadIncludes(includes: string[]): Promise<void> {
    await Promise.all(includes.map(async (include) => {
      switch (include) {
        case 'user':
          const { data: userData } = await api.get<UserSchema>(`users/${this.userId}`)
          this.user = userData
          break
        case 'photos':
          const { data: photoData } = await api.get<PhotoSchema[]>(`photos?albumId=${this.id}`)
          this.photos = photoData
          break
      }
    }))
  }

  static async create(album: Album) {
    await api.post<AlbumSchema>('albums/',album)
  }

  static async updateById(id: number, changes: object) {
    await api.patch<Album>(`albums/${id}`, changes)
  }

  static async deleteById(albumId: number) {
    await api.delete(`albums/${albumId}`)
  }

  toString() {
    return JSON.stringify(this)
  }

  static async find(args: object) {
    let chaine: string = 'albums?'
    Object.keys(args).forEach(function (element: string)
    {
      chaine += `${element}=${args[element]}&`
    })
    chaine = chaine.substr(0, chaine.length-1);
    console.log(chaine)
    const { data } = await api.get<AlbumSchema>(chaine)
    const album = new Album(data)
    return  album
  }
}

export default Album