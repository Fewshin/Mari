const Logger = require('../../utilities/Logger')
const log = new Logger('bgBlue', 'System')

class baseCommand {
  constructor (options) {
    this.options = options || {}
  }
}

module.exports = baseCommand