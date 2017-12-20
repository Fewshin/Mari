const Logger = require('../utilities/Logger')
const log = new Logger('bgBlue', 'System')
const children = require('require-all') ({dirname: __dirname + '/basicCommands', resolve: function(Children) {return new Children()}})

class baseCommand {
  constructor (options) {
    this.options = options || {}
  }
  processor (msg, bot, tag, args, prefix) {
    if (tag == 'help') {
      if (args[0] == null || args[0] == undefined) {
        log.bcommand(msg)
        function commandArray () {
          let counter = 0
          let cArray = []
          for (let i = 0; i < Object.values(children).length; i++) {
            cArray.push(`**${Object.values(children)[i].getName()}** - ${Object.values(children)[i].getDesc().simple}`)
            counter++
            if (counter == Object.values(children).length) { return cArray }
          }
        }
        try { bot.createMessage( msg.channel.id, `${['\`\`\`js', '\'Base Commands\'', '\`\`\`'].join('\n')}\n${commandArray().join('\n')}` ) }
        catch (err) { bot.createMessage(msg.channel.id, err.message) ; log.error(err) }
      }
      else {
        for (let i = 0; i < Object.values(children).length; i++) {
          if (Object.values(children)[i].getName() == args[0]) {
            log.bcommand(msg)
            try { bot.createMessage(msg.channel.id, `\`\`\`js\n\'${prefix}${Object.values(children)[i].getName()}\'\n\`\`\`\n**Description**: ${Object.values(children)[i].getDesc().advanced}\n**Usage**: ${prefix}${Object.values(children)[i].getDesc().usage}`) }
            catch (err) { bot.createMessage(msg.channel.id, err.message) ; log.error(err) } 
          }
        } 
      }
    }
    else {
      for (let i = 0; i < Object.values(children).length; i++) {
        if (Object.values(children)[i].getName() === tag) { 
          log.bcommand(msg) 
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
}

module.exports = baseCommand