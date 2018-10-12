import Album from './models/album'
import User from './models/user'

import axios from 'axios'

import jsonServer = require('json-server');
import { Photo } from './models/photo';
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)
server.use(middlewares)
server.use(router)


async function run() {
  /*let user: User = new User({id:2,name:"Adrien",username:"lol",email:"adrilol@lol.fr",
      address: {street:"lol", suite: "lol", city: "Bdx", zipcode: "33000", geo: { lat: 0, lng: 0 }},
      phone: "06070809lol", website: "www.lol.fr",
      company: { name: "aCorporate", catchPhrase: "on est pas corporate nous ???", bs: "bs?" }})
  await User.create(user)*/
  //let album = new Album({userId:2, id:2, title:"Titi"})
  //let photo = new Photo({albumId:1, id:1,title: "lalala", url: "lll", thumbnailUrl: "fgljdf"}); await Photo.create(photo)
  //await Photo.updateById(1, {title:'trol'})
}

server.listen(3000, () => {
  run().catch((err) => {
    console.error(err)
  })
})