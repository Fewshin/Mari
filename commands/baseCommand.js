const Logger = require('../utilities/Logger')
const log = new Logger('bgBlue', 'System')
const children = require('require-all') ({dirname: __dirname + '/basicCommands', resolve: function(Children) {return new Children()}})

class baseCommand {
  constructor (options) {
    this.options = options || {}
  }
  processor (msg, tag, args) {
    log.bcommand(msg)
  }
}

module.exports = baseCommand