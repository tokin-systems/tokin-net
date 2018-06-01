'use strict'

const UdpNode = require('udp-node')
const oracle = new UdpNode()
oracle
  .set({
    name: 'oracle',
    type: 'oracle',
    port: 3000
  })
  .broadcast({ port: 3024 })
  .onNode((message, rinfo) => {
    console.log('message, rinfo', message, rinfo)
    setInterval(() => {
      oracle.send({
        type: 'pong',
        address: rinfo.address,
        port: rinfo.port,
        text: 'oracle.'
      })
    }, 5000)
    // FOUND NODE
    // message: contains node's name, type and other details set when node was initialized using set()
    // rinfo: contains node's ip address and port
  })
