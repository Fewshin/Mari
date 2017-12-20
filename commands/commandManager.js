const config = require('../config.json')

const Logger = require('../utilities/Logger')
const log = new Logger('bgBlue', 'System')

const baseCommand = require('./baseCommand')
const basic = new baseCommand()

const sysCommand = require('./sysCommand')
const system = new sysCommand()

const EventEmitter = require('events')
const emitter = new EventEmitter()

const clearRequire = require('clear-require')

function syncReload(callback) {
  clearRequire.all()
  return callback
}

emitter.on('reload', () => {
  syncReload(function () { emitter.emit('done') })
})

class commandFrame {
  constructor (options) {
    this.options = options || {}
    this.aPrefix = config.adminPrefix
    this.prefix = config.prefix
    this.sPrefix = config.sysPrefix
  }
  handler (msg, bot) {
    if (!msg.guild) {
      if (config.exclusions.users.indexOf(msg.author.id) > -1 || config.exclusions.bots && msg.author.bot || msg.author.id === null || msg.author.id === undefined || msg.author.id === bot.user.id || config.selfBot) { return }
    }
    else {
      if (config.exclusions.users.indexOf(msg.author.id) > -1 || config.exclusions.guilds.indexOf(msg.channel.guild.id) > -1 || config.exclusions.channels.indexOf(msg.channel.id) > -1 || config.exclusions.bots && msg.author.bot || msg.author.id === null || msg.author.id === undefined || config.selfBot && msg.author.id != bot.user.id || !config.selfBot && msg.author.id == bot.user.id) { return }
    }
    this.args = msg.content.split(' ').slice(1)
    if (msg.content.startsWith(this.prefix)) {
      this.tag = msg.content.split(' ').slice(0, 1)[0].slice(this.prefix.length)
      basic.processor(msg, bot, this.tag, this.args, this.prefix)
    }
    else if (msg.content.startsWith(this.aPrefix)) {
      log.acommand(msg)
    }
    else if (msg.content.startsWith(this.sPrefix)) {
      this.tag = msg.content.split(' ').slice(0, 1)[0].slice(this.sPrefix.length)
      if (config.sysAdmins.indexOf(msg.author.id) > -1) { system.processor(msg, bot, this.tag, this.args) }
    }
    else { return }
  }
}

module.exports = commandFrame