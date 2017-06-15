

export class Connection {
  id = -1
  from = null
  to = null
  inlet = null
  outlet = null

  constructor(id, { from, output, to, input }) {
    this.id = id
    this.inlet = to.inputs.filter(put => put.name === input)[0]
    this.outlet = from.outputs.filter(put => put.name === output)[0]
    this.from = from
    this.to = to

    if (!inlet)
      throw new TypeError(`Inlet "${input}" not found!`)
    if (!outlet)
      throw new TypeError(`Outlet "${output}" not found!`)

    this.inlet.connection = this
    this.outlet.connection = this
  }
}
