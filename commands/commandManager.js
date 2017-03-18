const config = require('../config.json')
const Logger = require('../utilities/Logger')
const log = new Logger('bgBlue', 'System')

const baseCommand = require('./baseCommand')
const basic = new baseCommand()

class commandFrame {
  constructor (options) {
    this.options = options || {}
    this.aPrefix = config.adminPrefix
    this.prefix = config.prefix
    this.sPrefix = config.sysPrefix
  }
  handler (msg, bot) {
    if (config.exclusions.users.indexOf(msg.author.id) > -1 || config.exclusions.guilds.indexOf(msg.channel.guild.id) > -1 || config.exclusions.channels.indexOf(msg.channel.id) > -1 || config.exclusions.bots && msg.author.bot || msg.author.id === null || msg.author.id === undefined) { return }
    this.args = msg.content.split(' ').slice(1)
    this.tag = msg.content.split(' ').slice(0, 1)[0].slice(2)
    if (msg.content.startsWith(this.prefix)) {
      basic.processor(msg, bot, this.tag, this.args)
    }
    else if (msg.content.startsWith(this.aPrefix)) {
      log.acommand(msg)
    }
    else if (msg.content.startsWith(this.sPrefix)) {
      log.scommand(msg)
    }
    else { return }
  }
}

module.exports = commandFrame