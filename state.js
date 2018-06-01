'use strict'

const UdpNode = require('udp-node')
const state = new UdpNode()
state
  .set({
    name: 'state',
    type: 'state',
    port: 2994
  })
  .broadcast({ port: 3024 })
  .onNode((message, rinfo) => {
    console.log('message, rinfo', message, rinfo)
    setInterval(() => {
      state.send({
        type: 'pong',
        address: rinfo.address,
        port: rinfo.port,
        text: 'state.'
      })
    }, 7500)

    // .onNode((message, rinfo) => {
    //   console.log('message, rinfo', message, rinfo)
    // FOUND NODE
    // message: contains node's name, type and other details set when node was initialized using set()
    // rinfo: contains node's ip address and port
  })
