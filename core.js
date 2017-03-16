const config = require('./config.json')
const Logger = require('./utilities/Logger')
const log = new Logger('bgBlue', 'System')
const commandFrame = require('./commands/commandManager')
const input = new commandFrame()
const Eris = require('eris')
log.system(`Initiating`)

class Core {
  constructor (options) {
    this.options = options || {}
    this.shardCount = config.shardCount - 1 + 1
    this.imageSize = config.defaultImageSize
    this.imageFormat = config.defaultImageFormat
    this.token = config.token
  }
  botOn () {
    if (this.token === null || this.token === undefined) { log.error(`No Token`) }
    let bot = new Eris.Client(this.token, {autoreconnect: true, maxShards: this.shardCount, defaultImageSize: this.imageSize, defaultImageFormat: this.imageFormat})
    bot.on('ready', () => { log.system(`Bot is on`) })
    bot.on('error', err => { log.error(`${err}`) ; if (!err) { return } })
    bot.on('messageCreate', (msg) => { input.handler(msg)})
    bot.connect()
  }
}

module.exports = Core