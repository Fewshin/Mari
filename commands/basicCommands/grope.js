const fs = require('fs')

class itsJoke {
  getName () {
    return 'grope'
  }
  getDesc () {
    return { simple: '*grope*', advanced: 'Used for groping.', usage: 'grope', aliases: ['None'] }
  }
  simpleCommand (msg, args) {
    return null
  }
  command (msg, bot, tag, args) {
    let gropeDir = ['resources/memes/GROPE.jpg', 'resources/memes/GROPE2.jpg']
    fs.readFile(gropeDir[Math.floor(Math.random() * gropeDir.length)], function(err, data) { 
      let image = new Buffer(data)
      bot.createMessage(msg.channel.id, '', { file: image, name: 'grope.jpg' })
    })
  }
}

module.exports = itsJoke