const config = require('./config.json')
const Logger = require('./utilities/Logger')
const log = new Logger('bgBlue', 'System')
const chronManager = require('./utilities/chronManager')
const chron = new chronManager()
const commandFrame = require('./commands/commandManager')
const input = new commandFrame()
const Eris = require('eris')
class Core {
  constructor (options) {
    this.options = options || {}
    this.shardCount = process.env.SHARD_COUNT % 10
    this.shardID = process.env.SHARD_ID % 10
    this.imageSize = config.defaultImageSize
    this.imageFormat = config.defaultImageFormat
    this.token = config.token
  }
  botOn () {
    if (this.token === null || this.token === undefined) { log.error(`No Token`) }
    this.bot = new Eris.Client(this.token, {autoreconnect: true, maxShards: this.shardCount, firstShardID: this.shardID, lastShardID: this.shardID, defaultImageSize: this.imageSize, defaultImageFormat: this.imageFormat})
    log.system(`Initiating shard ${this.shardID}`)
    this.bot.on('shardReady', id => { log.system(`Shard ${id} is active.`) })
    //this.bot.on('ready', () => { log.system(`Bot is on`) })
    this.bot.on('error', err => { log.error(`${err}`) ; if (!err) { return } })
    this.bot.on('messageCreate', message => { input.handler(message, this.bot)})
    this.bot.connect()
    chron.loveLiveReset(this.bot)
  }
}

module.exports = Core