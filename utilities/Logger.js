const config = require('../config.json')
const moment = require('moment-timezone')
const chalk = require('chalk')

function clockstamp () {
  return ` > ${chalk.green.bold(moment().tz(config.defaultTimezone).format(' h:mm A MM/DD'))}`
}

class Logger {
  constructor (bg, title) {
    this.title = title
    this.bg = bg 
  }
  custom (bg = this.bg, title = this.title, content) { console.log(`${chalk[bg].bold(` ${title || 'LOG'} `)} ${content} ${clockstamp()}`) }
  system (content) { console.log(`${chalk.bgBlue.bold( ' System ' )} ${content} ${clockstamp()}` ) }
  command (content) { console.log(`${chalk.bgCyan.bold( ' Command ' )} ${content} ${clockstamp()}` ) }
  error (content) { console.log(`${chalk.bgRed.bold( ' Error ' )} ${content} ${clockstamp()}` ) }
}

module.exports = Logger