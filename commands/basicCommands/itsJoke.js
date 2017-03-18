const fs = require('fs')

class itsJoke {
  getName () {
    return 'joke'
  }
  getDesc () {
    return { simple: 'It\'s Joke!', advanced: 'Used for jokes.', usage: null }
  }
  simpleCommand (msg, args) {
    return null
  }
  command (msg, bot, tag, args) {
    fs.readFile('resources/memes/ITSJOKE.jpg', function(err, data) { 
      let image = new Buffer(data)
      bot.createMessage(msg.channel.id, '', { file: image, name: 'itsJoke.jpg' })
    })
  }
}

module.exports = itsJoke