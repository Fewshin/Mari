const Logger = require('../utilities/Logger')
const log = new Logger('bgBlue', 'System')
const _ = require('lodash')
const children = require('require-all') ({dirname: __dirname + '/systemCommands', resolve: function(Children) {return new Children()}})

class sysCommand {
  constructor (options) {
    this.options = options || {}
  }
  processor (msg, bot, tag, args) {
    for (let i = 0; i < _.values(children).length; i++) {
      if (_.values(children)[i].getName() === tag) { 
        log.scommand(msg) 
        if (_.values(children)[i].simpleCommand(msg, args) === null || _.values(children)[i].simpleCommand(msg, args) === undefined) {
          try { _.values(children)[i].command(msg, bot, tag, args) }
          catch (err) { bot.createMessage(msg.channel.id, err.message) ; log.error(err) }
        }
        else {
          try { bot.createMessage(msg.channel.id, _.values(children)[i].simpleCommand(msg, args)) }
          catch (err) { bot.createMessage(msg.channel.id, err.message) ; log.error(err) }
        }
      }
    }
  }
}

module.exports = sysCommand