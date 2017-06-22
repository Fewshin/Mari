const Logger = require('../utilities/Logger')
const log = new Logger('bgBlue', 'System')
const _ = require('lodash')
const children = require('require-all') ({dirname: __dirname + '/basicCommands', resolve: function(Children) {return new Children()}})

class baseCommand {
  constructor (options) {
    this.options = options || {}
  }
  processor (msg, bot, tag, args, prefix) {
    if (tag == 'help') {
      if (args[0] == null || args[0] == undefined) {
        function commandArray () {
          let counter = 0
          let cArray = []
          for (let i = 0; i < _.values(children).length; i++) {
            cArray.push(`**${_.values(children)[i].getName()}** - ${_.values(children)[i].getDesc().simple}`)
            counter++
            if (counter == _.values(children).length) { return cArray }
          }
        }
        try { bot.createMessage( msg.channel.id, `${['\`\`\`js', '\'Base Commands\'', '\`\`\`'].join('\n')}\n${commandArray().join('\n')}` ) }
        catch (err) { bot.createMessage(msg.channel.id, err.message) ; log.error(err) }
      }
      else {
        for (let i = 0; i < _.values(children).length; i++) {
          if (_.values(children)[i].getName() == args[0]) {
            try { bot.createMessage(msg.channel.id, `\`\`\`js\n\'${prefix}${_.values(children)[i].getName()}\'\n\`\`\`\n**Description**: ${_.values(children)[i].getDesc().advanced}\n**Usage**: ${prefix}${_.values(children)[i].getDesc().usage}`) }
            catch (err) { bot.createMessage(msg.channel.id, err.message) ; log.error(err) } 
          }
        } 
      }
    }
    else {
      for (let i = 0; i < _.values(children).length; i++) {
        if (_.values(children)[i].getName() === tag) { 
          log.bcommand(msg) 
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
}

module.exports = baseCommand