class Echo {
  getName () {
    return 'echo'
  }
  getDesc () {
    return { simple: 'Echos what you say.', advanced: 'Make the bot say something stupid because that\'s the only reason people use echo.', usage: 'echo', aliases: ['say'] }
  }
  simpleCommand (msg, args) {
    return '```' + args.join(' ') + '```'
  }
}

module.exports = Echo