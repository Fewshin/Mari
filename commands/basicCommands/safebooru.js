const request = require('superagent')
const Logger = require('../../utilities/Logger')
const log = new Logger('bgBlue', 'System')
const cooldownManager = require('../../utilities/cooldownManager')
const cooldown = new cooldownManager()
const cooldownCount = require('../basicCooldowns.json')

class safebooru {
  getName () {
    return 'safebooru'
  }
  getDesc () {
    return { simple: 'Searches the Safebooru API', advanced: 'Searches the Schoolido.lu API for specific cards', usage: 'safebooru tag', aliases: [] }
  }
  simpleCommand (msg, args) {
    return null
  }
  command (msg, bot, tag, args) { 
    if (!cooldown.cooldownChecker(msg, tag)[0] || cooldown.cooldownChecker(msg, tag) == undefined || cooldown.cooldownChecker(msg, tag) == null) {
    request
      .get(`http://safebooru.org/index.php?page=dapi&s=post&q=index&tags=${args[0]}&json=1`)
      .end((err, res) => {
        if (err) { log.error(err) ; bot.createMessage(msg.channel.id, `Error with search term.`) ; cooldown.cooldownMaker(cooldownCount.safebooru.search, msg, tag) }
        else {
          cooldown.cooldownMaker(cooldownCount.safebooru.search, msg, tag)
          const payload = JSON.parse(res.text)[Math.floor(Math.random() * 100)]
          bot.createMessage(msg.channel.id, [`Score: ${payload.score}`,
            `URL: http://safebooru.org/index.php?page=post&s=view&id=${payload.id}`,
            `Image URL: http://safebooru.org//images/${payload.directory}/${payload.image}`].join('\n'))
        }
      })
    }
    else {
      bot.createMessage(msg.channel.id, `Cooldown is active, ${cooldown.cooldownChecker(msg, tag)[1]} seconds remain.`)
    }
  }
}

module.exports = safebooru