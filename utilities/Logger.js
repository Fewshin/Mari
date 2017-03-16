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
  bcommand (msg) { console.log(`${chalk.bgGreen.bold( ' Base Command ' )} ${chalk.magenta.bold(msg.channel.guild ? msg.channel.guild.name : 'in PMs')} : ${chalk.cyan.bold(`${msg.author.username} (${msg.author.id})`)} > ${msg.content} ${clockstamp()}` ) }
  acommand (msg) { console.log(`${chalk.bgCyan.bold( ' Admin Command ' )} ${chalk.magenta.bold(msg.channel.guild ? msg.channel.guild.name : 'in PMs')} : ${chalk.cyan.bold(`${msg.author.username} (${msg.author.id})`)} > ${msg.content} ${clockstamp()}` ) }
  scommand (msg) { console.log(`${chalk.bgRed.bold( ' System Command ' )} ${chalk.magenta.bold(msg.channel.guild ? msg.channel.guild.name : 'in PMs')} : ${chalk.cyan.bold(`${msg.author.username} (${msg.author.id})`)} > ${msg.content} ${clockstamp()}` ) }
  error (content) { console.log(`${chalk.bgRed.bold( ' Error ' )} ${content} ${clockstamp()}` ) }
}

module.exports = Logger