var net = require('net')
var sodium = require('sodium').api

//TODO: store needs to shuffle itself as well
var _STORES = {}

var _LOCATIONS = [
  'www://here',
  'www://there',
  'www://everywhere',
  'www://sun',
  'www://moon',
  'www://earth',
  'www://jupiter'
]

const shuffle = array => {
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

const loc = array => {
  var b = shuffle(_LOCATIONS)

  return array.map(function(e, i) {
    var order = i
    var encryptedPayload = e
    var location = b[i]
    return [order, encryptedPayload, location, 'id-token?']
  })
}

const sly = (arrayBuffer, pieces) => {
  // [ <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 65 a2 38 08 b2 b2 91 1e b6 0a 7f 26 41 56>,
  //   <Buffer 6d c5 08 89 5d 01 2c 92 05 ef 77 c8 8d bf f5>,
  //   <Buffer 8f 0f 85 08 56 96 42>,
  //   <Buffer 10 0d 78 4d>,
  //   <Buffer 24 a5>,
  //   <Buffer e1>,
  //   <Buffer 0c> ]

  var half = Math.floor(arrayBuffer.byteLength / 2)
  if (half == 0) {
    return pieces.concat(arrayBuffer)
  } else {
    var piece = arrayBuffer.slice(0, half)
    return sly(arrayBuffer.slice(half), pieces.concat(piece))
  }
}

const distribute = pieces => {
  var payload = loc(pieces)
  console.log('TODO: send all pieces to stores', payload)
  var retrevalMap = payload.map(x => [x[0], x[2], x[3]])
  return JSON.stringify(retrevalMap)
}

const createPayload = data => {
  var sender = sodium.crypto_box_keypair()
  var receiver = sodium.crypto_box_keypair()

  var nonce = Buffer.allocUnsafe(sodium.crypto_box_NONCEBYTES)
  sodium.randombytes_buf(nonce)

  //console.log(data)              // <Buffer 48 65 6c 6c 6f 2c ... >
  //console.log(Buffer.from(data)) // <Buffer 48 65 6c 6c 6f 2c ... >

  var plainText = Buffer.from(data)
  var cipherMsg = sodium.crypto_box(
    plainText,
    nonce,
    receiver.publicKey,
    sender.secretKey
  )

  var pieces = sly(cipherMsg, [])
  var retrevalMap = distribute(pieces)

  // utf8, base64
  //console.log(cipherMsg.toString('utf8'))

  return Buffer.concat([
    receiver.secretKey,
    Buffer.from('*'),
    Buffer.from(retrevalMap)
  ]) // must be string or buffer
}

var server = net.createServer(function(socket) {
  // req: String
  // sideeffect: create Map and distribute EncryptMessage pieces
  // res: Map PrivKey PubKey

  socket.on('data', function(data) {
    socket.write(createPayload(data))
  })

  // socket.write('CONNECTED!\r\n');
  // socket.pipe(socket);
})

server.listen(1337, '127.0.0.1')

// request token
// encypt payload slice into x pieces
// public key private key (decrypts the payload)
// push out into many places and send map
// private key | map
// public key to transactor and ledger

// ledger: where transactions are verified and stored
// transaction: entries on the ledger

// sender public key (reciept) gets validated and locked into the ledger

// 'trackers'

// proof of store / storage

// key lock stash

// substack torrent
