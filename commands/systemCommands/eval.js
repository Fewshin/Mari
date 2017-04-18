const Logger = require('../../utilities/Logger')
const log = new Logger('bgBlue', 'System')
const canvasManager = require('../../utilities/canvasManager')
const render = new canvasManager()
const request = require('superagent')
const _ = require('lodash')
const moment = require('moment-timezone')
const chalk = require('chalk')
const config = require('../../config.json')
const pack = require('../../package.json')

class Eval {
  getName () {
    return 'eval'
  }
  simpleCommand (msg, args) {
    return null
  }
  command(msg, bot, tag, args) {
    function evaluate (msg, args) {
      try { return eval(args.join(' ')) }
      catch (err) { return err.message }
    }
    bot.createMessage(msg.channel.id, '```' + evaluate(msg, args) + '```')
  }
}

module.exports = Eval