const config = require('../config.json')
const fs = require('fs')
//const file = new File('../log.txt')
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
  custom (bg = this.bg, title = this.title, content) { 
    console.log(`${clockstamp()}${chalk[bg].bold(` ${title || 'LOG'} `)} ${content}`) 
    // fs.open('log.txt', 'r', (err, fd) => {
    //   if (err) {
    //     if (err.code === 'ENOENT') {
    //       console.log(`${clockstamp()}${chalk.bgRed.bold( ' Error ' )} Log File doesn't exist!`)
    //       return
    //     }
    //     throw err
    //   }
    //   else {
    //     file.open('w')
    //     file.write(`${clockstamp()}${chalk[bg].bold(` ${title || 'LOG'} `)} ${content}`)
    //     file.close()
    //   }
    // })
  }
  system (content) { 
    console.log(`${clockstamp()}${chalk.bgBlue.bold( ' System ' )} ${content}`)
    // fs.open('log.txt', 'r', (err, fd) => {
    //   if (err) {
    //     if (err.code === 'ENOENT') {
    //       console.log(`${clockstamp()}${chalk.bgRed.bold( ' Error ' )} Log File doesn't exist!`)
    //       return
    //     }
    //     throw err
    //   }
    //   else {
    //     file.open('w')
    //     file.write(`${clockstamp()}${chalk.bgBlue.bold( ' System ' )} ${content}`)
    //     file.close()
    //   }
    // })
  }
  bcommand (msg) { 
    console.log(`${clockstamp()}${chalk.bgGreen.bold( ' Base Command ' )} ${chalk.magenta.bold(msg.channel.guild ? msg.channel.guild.name : 'in PMs')} : ${chalk.cyan.bold(`${msg.author.username} (${msg.author.id})`)} > ${msg.content}`) 
    // fs.open('log.txt', 'r', (err, fd) => {
    //   if (err) {
    //     if (err.code === 'ENOENT') {
    //       console.log(`${clockstamp()}${chalk.bgRed.bold( ' Error ' )} Log File doesn't exist!`)
    //       return
    //     }
    //     throw err
    //   }
    //   else {
    //     file.open('w')
    //     file.write(`${clockstamp()}${chalk.bgGreen.bold( ' Base Command ' )} ${chalk.magenta.bold(msg.channel.guild ? msg.channel.guild.name : 'in PMs')} : ${chalk.cyan.bold(`${msg.author.username} (${msg.author.id})`)} > ${msg.content}`)
    //     file.close()
    //   }
    // })
  }
  acommand (msg) { 
    console.log(`${clockstamp()}${chalk.bgCyan.bold( ' Admin Command ' )} ${chalk.magenta.bold(msg.channel.guild ? msg.channel.guild.name : 'in PMs')} : ${chalk.cyan.bold(`${msg.author.username} (${msg.author.id})`)} > ${msg.content}`) 
    // fs.open('log.txt', 'r', (err, fd) => {
    //   if (err) {
    //     if (err.code === 'ENOENT') {
    //       console.log(`${clockstamp()}${chalk.bgRed.bold( ' Error ' )} Log File doesn't exist!`)
    //       return
    //     }
    //     throw err
    //   }
    //   else {
    //     file.open('w')
    //     file.write(`${clockstamp()}${chalk.bgCyan.bold( ' Admin Command ' )} ${chalk.magenta.bold(msg.channel.guild ? msg.channel.guild.name : 'in PMs')} : ${chalk.cyan.bold(`${msg.author.username} (${msg.author.id})`)} > ${msg.content}`)
    //     file.close()
    //   }
    // })
  }
  scommand (msg) { 
    console.log(`${clockstamp()}${chalk.bgRed.bold( ' System Command ' )} ${chalk.magenta.bold(msg.channel.guild ? msg.channel.guild.name : 'in PMs')} : ${chalk.cyan.bold(`${msg.author.username} (${msg.author.id})`)} > ${msg.content}`) 
    // fs.open('log.txt', 'r', (err, fd) => {
    //   if (err) {
    //     if (err.code === 'ENOENT') {
    //       console.log(`${clockstamp()}${chalk.bgRed.bold( ' Error ' )} Log File doesn't exist!`)
    //       return
    //     }
    //     throw err
    //   }
    //   else {
    //     file.open('w')
    //     file.write(`${clockstamp()}${chalk.bgRed.bold( ' System Command ' )} ${chalk.magenta.bold(msg.channel.guild ? msg.channel.guild.name : 'in PMs')} : ${chalk.cyan.bold(`${msg.author.username} (${msg.author.id})`)} > ${msg.content}`)
    //     file.close()
    //   }
    // })
  }
  error (content) { 
    console.log(`${clockstamp()}${chalk.bgRed.bold( ' Error ' )} ${content}`) 
    // fs.open('log.txt', 'r', (err, fd) => {
    //   if (err) {
    //     if (err.code === 'ENOENT') {
    //       console.log(`${clockstamp()}${chalk.bgRed.bold( ' Error ' )} Log File doesn't exist!`)
    //       return
    //     }
    //     throw err
    //   }
    //   else {
    //     file.open('w')
    //     file.write(`${clockstamp()}${chalk.bgRed.bold( ' Error ' )} ${content}`)
    //     file.close()
    //   }
    // })
  }
}

module.exports = Logger