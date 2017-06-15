
export class Node {
  id = -1
  name = ''
  inputs = []
  outputs = []
  connections = new Set()

  constructor(name) {
    this.name
  }

  addInput({ name, text, type }) {
    this.inputs.push({ name, text, type })
  }

  addOutput({ name, text, type }) {
    this.outputs.push({ name, text, type })
  }
}
