// Data store. Organizes, queries, and inspects database and content sources. Returns requested data to either mind.js, or directly to output.js if the response has been cached and remains valid.

// Consists of four sources: 1. Transaction Blockchain, 2. K/V store (state), p2p Blobs (content), and a GraphDB (immutable relationships) * relationships evolve and adapt but can't be broken.

// Client sends a request including a command, data sources, context, and identification to mind.js

const dgram = require('dgram')
const server = dgram.createSocket('udp4')
const crypto = require('crypto')

// Memory requirements
const levelgraph = require('levelgraph') // Graph DB
const levelDB = require('level-browserify') // Blockchain DB
const webtorrent = require('webtorrent') // P2P
const loki = require('lokijs') // K/V DB

// Memory init
const graph = levelgraph(levelDB('test-graph'))
const blockchain = levelDB('test-blockchain')
const torrent = new webtorrent()
const kv = require('lokijs')

console.log(
  'blockchain\n',
  Object.keys(blockchain),
  '\n\n',
  'graph\n',
  Object.keys(graph),
  '\n\n',
  'torrent\n',
  Object.keys(torrent),
  '\n\n',
  'k/v\n',
  Object.keys(kv)
)

const clients = {}
const outputLog = []
const ports = {
  memory: 41236,
  output: 41235,
  client: 41234,
  mind: 41233
}

const db = {
  state: {
    // Rediculously flat and fast K/V store. Constructed from relationships in graphDB
    servers: {
      // Active servers and trackers on the network
      lobbies: [], // Responsible for matching players with games and rankings
      games: [], // Tracks games and catches cheating
      lambdas: [], // Processes cloud functions
      deltas: [], // Tracks real-time differences in state
      omegas: [] // Network supervision
    },
    people: {
      // Health and status of active accounts
      meta: [], // People building the game
      teams: [], // Associations
      players: [] // Health and vitality of players
    },
    items: [], // Purposeful content in the app.. i.e. article, product. References graphdb
    timers: [], // notifications, calendar, and agenda
    hustles: [] // Active games on the network
  },
  p2p: {
    // Stores the majority of the network's data
    structured: {
      document: [], // catch-all for any filetype, .zip etc
      video: [], // mpeg, avi, mov
      audio: [], // mp3, flac
      software: [], // version controlled and hash verified repos
      image: [] // png, jpeg, psd
    },
    unstructured: [] // blobs of data
  },
  graphdb: {
    // Stores relationships
    nodes: [], // index of pointers (see p2p) for people, places, or things
    edges: [], // nature, quality, frequency, node connections
    vectors: []
  },
  blockchain: {
    // Stores immutable events, i.e. transactions, new accounts, new tokens
    mainnet: {
      // Live production network nodes
      transactions: [],
      accounts: [],
      tokens: []
    },
    testnet: [] // Sandboxed development network nodes
  }
}

server.on('error', err => {
  console.log(`server error:\n${err.stack}`)
  server.close()
})

server.on('message', (rawmsg, rinfo) => {
  msg = JSON.parse(rawmsg)
  clients[rinfo.address + ':' + rinfo.port] = dgram.createSocket('udp4')
  cli = clients[rinfo.address + ':' + rinfo.port]
  console.log(
    `Memory Oracle got: ${JSON.stringify(msg)} from ${rinfo.address}:${
      rinfo.port
    }`
  )
  const decipher = crypto.createDecipher('aes192', 'password')
  let decrypted = decipher.update(msg[1], 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  console.log('decrypted', JSON.parse(decrypted))
  if (msg[0] == 'client') {
    const message = Buffer.from(JSON.stringify(['memory', msg[1]]))
    cli.send(message, ports.mind, 'localhost', err => {
      cli.close()
    })
  }
  if (msg[0] == 'output') {
    db.state.servers.omegas.push(
      JSON.parse(decrypted)[0].uuid +
        ':' +
        Date.now() +
        ':' +
        rinfo.address +
        ':' +
        rinfo.port
    )
    console.dir(db.state.servers.omegas)
  }
})

server.on('listening', () => {
  const address = server.address()
  console.log(`memory oracle listening ${address.address}:${address.port}`)
})

server.bind(ports.memory)
// server listening 0.0.0.0:41234
