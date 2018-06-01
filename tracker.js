'use strict'

const UdpNode = require('udp-node')
const tracker = new UdpNode()
this.nodes = {
  event: [],
  state: [],
  oracle: []
}
let nodes = this.nodes
tracker
  .set({
    name: 'Tracker',
    type: 'tracker',
    port: 3024
  })
  .broadcast({ port: 3024 })
  //   .on('pong', data => {
  //     console.log('message, rinfo', data)
  //     tracker.send({
  //       type: 'broadcast',
  //       address: rinfo.address,
  //       port: rinfo.port,
  //       text: rinfo.from + ' is your ID'
  //     })
  //     this.nodes['oracle'].push(rinfo.address + ':' + rinfo.port)
  // })
  // console.log('\n', JSON.stringify(this.nodes, null, 2), '\n')
  // tracker.send({
  //   type: 'pong',
  //   address: rinfo.address,
  //   port: rinfo.port,
  //   text: 'Yes.'
  // })

  //   .on('state', (message, rinfo) => {
  //     console.log(message, rinfo)
  //     this.nodes['state'].push(rinfo.address + ':' + rinfo.port)
  //     console.log('\n', JSON.stringify(this.nodes, null, 2), '\n')
  //     tracker.send({
  //       type: 'pong',
  //       address: rinfo.address,
  //       port: rinfo.port,
  //       text: 'Yes.'
  //     })
  //   })
  .onNode((message, rinfo) => {
    const address = rinfo.address,
      port = rinfo.port,
      node = message.node ? message.node.name : message.text,
      id = message.from
    tracker.send({
      type: message.type,
      address: rinfo.address,
      port: rinfo.port,
      text: 'Tracker sensed a node'
    })
    console.log('\n\nLook Here' + nodes[node] + 'Meow\n\n')
    nodes[node]
      ? nodes[node].push(Date.now() + ':' + address + ':' + port + '@' + id)
      : console.log('\n', JSON.stringify(this.nodes, null, 2), '\n')
    this.nodes = nodes
    console.log('\n', JSON.stringify(this.nodes, null, 2), '\n')
  })
//   .on('close', message => {
//     tracker.close()
//   })
