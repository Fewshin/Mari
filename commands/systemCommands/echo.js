class Echo {
  getName () {
    return 'echo'
  }
  simpleCommand (msg, args) {
    return args.join(' ')
  }
}

module.exports = Echo