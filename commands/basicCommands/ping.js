class Ping {
  getName () {
    return 'ping'
  }
  getDesc () {
    return { simple: 'A ping command.', advanced: 'A ping command, usually used to see if the bot is on.', usage: null }
  }
  simpleCommand (msg, args) {
    return 'Pong!'
  }
}

module.exports = Ping