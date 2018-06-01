// Purely functional. Validates, verifies data deliverable form to return to client.

// Data store. Organizes, queries, and inspects database and content sources. Returns requested data to either mind.js, or directly to output.js if the response has been cached and remains valid.

// Consists of four sources: 1. Transaction Blockchain, 2. K/V store (state), p2p Blobs (content), and a GraphDB (immutable relationships) * relationships evolve and adapt but can't be broken.

// Client sends a request including a command, data sources, context, and identification to mind.js

const dgram = require('dgram')
const server = dgram.createSocket('udp4')

const clients = {}
const ports = {
  memory: 41236,
  output: 41235,
  client: 41234,
  mind: 41233
}

server.on('error', err => {
  console.log(`server error:\n${err.stack}`)
  server.close()
})

server.on('message', (rawmsg, rinfo) => {
  const msg = JSON.parse(rawmsg)
  clients[rinfo.address + ':' + rinfo.port] = dgram.createSocket('udp4')
  const cli = clients[rinfo.address + ':' + rinfo.port]
  if (msg[0] == 'memory') {
    console.log('Memory request')
    const message = Buffer.from(JSON.stringify(['output', msg[1]]))
    cli.send(message, ports.client, 'localhost', err => {
      cli.close()
    })
  }
  if (msg[0] == 'mind') {
    console.log('Mind response')
    const message = Buffer.from(JSON.stringify(['output', msg[1]]))
    cli.send(message, ports.client, 'localhost', err => {})
    cli.send(message, ports.memory, 'localhost', err => {
      cli.close()
    })
  }
  console.log(`Output got: ${msg[0]} from ${rinfo.address}:${rinfo.port}`)
})

server.on('listening', () => {
  const address = server.address()
  console.log(`server listening ${address.address}:${address.port}`)
})

server.bind(ports.output)
// server listening 0.0.0.0:41235
