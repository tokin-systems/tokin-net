const UdpNode = require('udp-node')
const event = new UdpNode()
event
  .set({
    name: 'event',
    type: 'pong',
    port: 2998
  })
  .broadcast({ port: 3024 })
  .onNode((message, rinfo) => {
    console.log('message, rinfo', message, rinfo)
    // FOUND NODE
    // message: contains node's name, type and other details set when node was initialized using set()
    // rinfo: contains node's ip address and port
  })
