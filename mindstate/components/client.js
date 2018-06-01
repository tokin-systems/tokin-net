// Client sends a request including a command, data sources, context, and identification to mind.js
const crypto = require('crypto')
const sha512 = require('js-sha512')
const dgram = require('dgram')
const server = dgram.createSocket('udp4')
const client = dgram.createSocket('udp4')

const clients = {}
const ports = {
  memory: 41236,
  output: 41235,
  client: 41234,
  mind: 41233
}

/* 
    ALL messages follow the following structure 
    var content = [1, 2, 3]
    [
        {
            length: content.length, // always generated just before hashing
            permission: 'public', // general, private, or algorithmic
            function: 'add' // API call or { init: x => return x } method,
            models: {} // map/reduce or crypto functions,
            tags: ['test:master object', 'nodejs:tokin systems'],
            uuid: '' // hash added after length of content,
            type: 'process' // running the function 'add' in a process
        }, ...content
    ]
*/

var content = [1, 2, 3]

devmsg = [
  {
    ts: Date.now(),
    length: content.length, // always generated just before hashing
    permission: 'public', // general, private, or algorithmic
    function: 'add', // API call or { init: x => return x } method,
    models: {}, // map/reduce or crypto functions,
    tags: ['test:master object', 'nodejs:tokin systems'], // '[topic:tag]'
    uuid: '', // hash added after length of content,
    type: 'process' // running the function 'add' in a process
  },
  ...content
]

const uuid = sha512(devmsg)
devmsg[0].uuid = uuid
// var crypted = sha512.hmac(uuid, devmsg)
// console.log(crypted)

const cipher = crypto.createCipher('aes192', 'password')
console.log('\n\n', devmsg, '\n\n')

let encrypted = cipher.update(JSON.stringify(devmsg), 'utf8', 'hex')
encrypted += cipher.final('hex')
console.log('encrypted', encrypted)

const message = Buffer.from(JSON.stringify(['client', encrypted]))
client.send(message, ports.mind, 'localhost', err => {})
client.send(message, ports.memory, 'localhost', err => {
  client.close()
})

server.on('error', err => {
  console.log(`server error:\n${err.stack}`)
  server.close()
})

server.on('message', (msg, rinfo) => {
  // clients[rinfo.address + ':' + rinfo.port] = dgram.createSocket('udp4')
  // cli = clients[rinfo.address + ':' + rinfo.port]
  console.log(`Client got: ${msg} from ${rinfo.address}:${rinfo.port}`)
  // cli.send(message, 41235, 'localhost', err => {
  //     cli.close()
  // })
})

server.on('listening', () => {
  const address = server.address()
  console.log(`server listening ${address.address}:${address.port}`)
})

server.bind(ports.client)
// server listening 0.0.0.0:41234
