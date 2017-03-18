class Ping {
  getName () {
    return 'ping'
  }
  simpleCommand (msg, args) {
    return 'Pong!'
  }
}

module.exports = Ping