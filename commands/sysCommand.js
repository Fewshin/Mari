const Logger = require('../utilities/Logger')
const log = new Logger('bgBlue', 'System')
const children = require('require-all') ({dirname: __dirname + '/systemCommands', resolve: function(Children) {return new Children()}})

class sysCommand {
  constructor (options) {
    this.options = options || {}
  }
  processor (msg, bot, tag, args) {
    for (let i = 0; i < Object.values(children).length; i++) {
      if (Object.values(children)[i].getName() === tag) { 
        log.scommand(msg) 
        if (Object.values(children)[i].simpleCommand(msg, args) === null || Object.values(children)[i].simpleCommand(msg, args) === undefined) {
          try { Object.values(children)[i].command(msg, bot, tag, args) }
          catch (err) { bot.createMessage(msg.channel.id, err.message) ; log.error(err) }
        }
        else {
          try { bot.createMessage(msg.channel.id, Object.values(children)[i].simpleCommand(msg, args)) }
          catch (err) { bot.createMessage(msg.channel.id, err.message) ; log.error(err) }
        }
      }
    }
  }
}

module.exports = sysCommand