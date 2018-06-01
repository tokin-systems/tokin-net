// Recognizes protocols and applies proper algorithms to incoming requests. Awaits data from memory when needed, then returns to output.js

// Client sends a request including a command, data sources, context, and identification to mind.js
const crypto = require('crypto')
const dgram = require('dgram')
const server = dgram.createSocket('udp4')

const clients = {}
const ports = {
  memory: 41236,
  output: 41235,
  client: 41234,
  mind: 41233
}
const algos = {
  sort: {
    // Strategies for organizing lists
    bubble: () => {},
    bucket: () => {}
  },
  query: {
    // Strategies for finding and returning specific data
  },
  search: {
    // Various strategies to return lists of relevant data to a request
    depth: () => {},
    breadth: () => {}
  },
  statistics: {
    // Standard deviations
  },
  machineLearning: {
    // Various advanced statistics and strategies towards proper prediction
  }
}
const protocols = {
  hustleRules: {
    // Game modifier and multiplier protocols
  },
  blockchain: {
    // Events and transaction protocols
    atomicSwap: () => {},
    qBitcoin: () => {},
    smartContract: () => {}
  },
  consensus: {
    // Network agreement protocols
    gossip: () => {},
    paxos: () => {}
  },
  graphdb: {
    // Relationship protocols.. i.e. what's a node and edge
  },
  p2p: {
    // Torrent-esq protocol for p2p file uploads and transferring
  },
  authentication: {
    // Valid authentication protocols
  }
}
const api = {
  addAccount: () => {}, // creates transaction for meta, team, and player accounts. Updates state and graphdb
  updateAccount: () => {}, // adds to transaction. updates state and graphdb
  addToken: () => {}, // Tok (coin), Kin (share), or Oki (key)
  splitToken: () => {}, // creates 1000 Tiks from 1 Tok
  destroyToken: () => {}, // creates 1000 Tiks from 1 Tok
  // addTransaction: () => {}, // the individual methods are transactions, durrr.
  challengeTransaction: () => {}, // method to call out fraudulent transactions or other cheats
  addContent: () => {}, // creates entries into p2p storage, updates state, and adds relations to graphdb
  updateContent: () => {}, // updates state and relations to graphdb
  addHustle: () => {}, // creates transaction for hustle, updates state and relations on graphdb
  updateHustle: () => {}, // Adds to hustle transaction for player joins, player accomplishments, and other updates
  query: () => {}, // Find ANY specific answer in the system. i.e. players, teams, content, etc
  search: () => {}, // Find ALL matches
  verify: () => {} // Validate proofs and callbacks for expected results
}

server.on('error', err => {
  console.log(`server error:\n${err.stack}`)
  server.close()
})

server.on('message', (rawmsg, rinfo) => {
  const msg = JSON.parse(rawmsg)
  console.log(msg[0])
  clients[rinfo.address + ':' + rinfo.port] = dgram.createSocket('udp4')
  const cli = clients[rinfo.address + ':' + rinfo.port]
  if (msg[0] == 'client') {
    const decipher = crypto.createDecipher('aes192', 'password')
    let decrypted = decipher.update(msg[1], 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    console.log('decrypted', decrypted)

    console.log('Client request ' + JSON.parse(decrypted)[0].uuid)
    const message = Buffer.from(JSON.stringify(['mind', msg[1]]))
    cli.send(message, ports.output, 'localhost', err => {
      cli.close()
    })
  }
  if (msg[0] == 'memory') {
    const decipher = crypto.createDecipher('aes192', 'password')
    let decrypted = decipher.update(msg[1], 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    console.log('decrypted', decrypted)
    console.log('Memory request ' + JSON.parse(decrypted)[0].uuid)
    const message = Buffer.from(JSON.stringify(['mind', msg[1]]))
    cli.send(message, ports.output, 'localhost', err => {
      cli.close()
    })
  }
  console.log(`server got: ${msg[0]} from ${rinfo.address}:${rinfo.port}`)
})

server.on('listening', () => {
  const address = server.address()
  console.log(`server listening ${address.address}:${address.port}`)
})

server.bind(ports.mind)
// server listening 0.0.0.0:41234
