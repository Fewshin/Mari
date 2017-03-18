class Ping {
  getName () {
    return 'ping'
  }
  fastCommand (msg, args) {
    return 'Pong!'
  }
}

module.exports = Ping