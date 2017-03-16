const config = require('../config.json')
const Logger = require('../utilities/Logger')
const log = new Logger('bgBlue', 'System')
class commandFrame {
  constructor (options) {
    this.options = options || {}
    this.aPrefix = config.adminPrefix
    this.prefix = config.prefix
    this.sPrefix = config.sysPrefix
  }
  handler (msg) {
    if (msg.content.startsWith(this.aPrefix)) {
      log.custom('bgMagenta', 'Admin Command', `${msg.author.username} | ${msg.channel.guild.name} > ${msg.content}`)
    }
    else if (msg.content.startsWith(this.prefix)) {
      log.custom('bgGreen', 'Base Command', `${msg.author.username} | ${msg.channel.guild.name} > ${msg.content}}`)
    }
    else if (msg.content.startsWith(this.sPrefix)) {
      log.custom('bgRed', 'System Command', `${msg.author.username} | ${msg.channel.guild.name} > ${msg.content}`)
    }
    else { return }
  }
}

module.exports = commandFrame