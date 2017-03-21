const config = require('../config.json')
const moment = require('moment-timezone')
const chalk = require('chalk')

function clockstamp () {
  return `[${chalk.green.bold(moment().tz(config.defaultTimezone).format('h:mm A MM/DD'))}]`
}

class Logger {
  constructor (bg, title) {
    this.title = title
    this.bg = bg 
  }
  custom (bg = this.bg, title = this.title, content) { console.log(`${clockstamp()}${chalk[bg].bold(` ${title || 'LOG'} `)} ${content}`) }
  system (content) { console.log(`${clockstamp()}${chalk.bgBlue.bold( ' System ' )} ${content}` ) }
  bcommand (msg) { console.log(`${clockstamp()}${chalk.bgGreen.bold( ' Base Command ' )} ${chalk.magenta.bold(msg.channel.guild ? msg.channel.guild.name : 'in PMs')} : ${chalk.cyan.bold(`${msg.author.username} (${msg.author.id})`)} > ${msg.content}` ) }
  acommand (msg) { console.log(`${clockstamp()}${chalk.bgCyan.bold( ' Admin Command ' )} ${chalk.magenta.bold(msg.channel.guild ? msg.channel.guild.name : 'in PMs')} : ${chalk.cyan.bold(`${msg.author.username} (${msg.author.id})`)} > ${msg.content}` ) }
  scommand (msg) { console.log(`${clockstamp()}${chalk.bgRed.bold( ' System Command ' )} ${chalk.magenta.bold(msg.channel.guild ? msg.channel.guild.name : 'in PMs')} : ${chalk.cyan.bold(`${msg.author.username} (${msg.author.id})`)} > ${msg.content}` ) }
  error (content) { console.log(`${clockstamp()}${chalk.bgRed.bold( ' Error ' )} ${content}` ) }
}

module.exports = Logger