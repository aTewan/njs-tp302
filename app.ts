import Album from './models/album'
import User from './models/user'

import axios from 'axios'

import jsonServer = require('json-server');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)
server.use(middlewares)
server.use(router)


async function run() {
  //const album = await Album.findById(1)
  //console.log(album)
  //debugger
  let user: User = new User({id:1,name:"Adrien",username:"Adrilol",email:"adrilol@lol.fr",
      address: {street:"lol", suite: "lol", city: "Bdx", zipcode: "33000", geo: { lat: 0, lng: 0 }},
      phone: "06070809lol", website: "www.lol.fr",
      company: { name: "aCorporate", catchPhrase: "on est pas corporate nous ???", bs: "bs?" }})
  await User.create(user)
  let userById = await User.findById(1);
  console.log(userById)
}

server.listen(3000, () => {
  run().catch((err) => {
    console.error(err)
  })
})