import { Connection } from './connection'


export class Registry {
  constructor() {
    this.nodes = new Map()
    this.connections = new Map()
    this.latestId = 0
  }

  nextId() {
    return ++this.latestId
  }

  addNode(node) {
    node.id = this.nextId()
    this.nodes.set(node.id, node)
    return node
  }

  getNode(id) {
    return this.nodes.get(id)
  }

  removeNode(id) {
    const node = this.nodes.get(id)

    for (const connId of node.connections) {
      this.disconnect(connId)
    }

    this.nodes.delete(id)
  }

  connect({ from, output, to, input }) {
    const fromNode = this.nodes.get(from)
    const toNode = this.nodes.get(to)
    const id = this.nextId()

    const connection = new Connection(id, { from, output, to, input })

    fromNode.connections.add(id)
    toNode.connections.add(id)

    this.connections.set(id, connection)
    this.nodes.set(from, fromNode)
    this.nodes.set(to, toNode)
  }

  disconnect(connectionId) {
    const connection = this.connections.get(connectionId)
    const fromNode = this.nodes.get(connection.from)
    const toNode = this.nodes.get(connection.to)

    fromNode.connections.delete(connectionId)
    toNode.connections.delete(connectionId)

    this.nodes.set(connection.from, fromNode)
    this.nodes.set(connection.to, toNode)
    this.connections.delete(connectionId)

    connection = null
  }

}
