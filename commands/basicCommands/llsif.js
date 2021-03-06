const request = require('superagent')
const Logger = require('../../utilities/Logger')
const log = new Logger('bgBlue', 'System')
const canvasManager = require('../../utilities/canvasManager')
const render = new canvasManager()
const cooldownManager = require('../../utilities/cooldownManager')
const cooldown = new cooldownManager()
const cooldownCount = require('../basicCooldowns.json')

class llsif {
  getName () {
    return 'llsif'
  }
  getDesc () {
    return { simple: 'Searches the Schoolido.lu API', advanced: 'Searches the Schoolido.lu API for specific cards', usage: 'llsif [ Card ID | Set ] < Set Name > < UR >', aliases: ['sif', 'sic'] }
  }
  simpleCommand (msg, args) {
    return null
  }
  command (msg, bot, tag, args) { 
    function idChecker (payload) {
      if (payload.card_image == null || payload.card_image == 'null' || payload.card_image == undefined || payload.card_image == 'undefined') {
        return [`http:${payload.card_idolized_image}`]
      }
      else if (payload.card_idolized_image == null || payload.card_idolized_image == 'null' || payload.card_idolized_image == undefined || payload.card_idolized_image == 'undefined') {
        return [`http:${payload.card_image}`]
      }
      else { return [`http:${payload.card_image}`, `http:${payload.card_idolized_image}`] }
    }
    function setChecker (args, payload) {
      if (args[2] === null || args[2] === undefined) {
        return [[`http:${payload.results[0].card_image}`, `http:${payload.results[1].card_image}`, `http:${payload.results[2].card_image}`, `http:${payload.results[3].card_image}`, `http:${payload.results[4].card_image}`, `http:${payload.results[5].card_image}`, `http:${payload.results[6].card_image}`, `http:${payload.results[7].card_image}`, `http:${payload.results[8].card_image}`], cooldownCount.llsif.set]
      }
      else if (args[2] == 'UR') {
        let urArray = []
        for (let i = 0; i < 9; i++) {  
          if (payload.results[i].rarity == 'UR') {
            urArray.push(`http:${payload.results[i].card_image}`)
            urArray.push(`http:${payload.results[i].card_idolized_image}`)
          }
          if (i == 8) { return [urArray, cooldownCount.llsif.UR] }
        }
      }
      else if (args[2] == 'idolized') {
        return [[`http:${payload.results[0].card_idolized_image}`, `http:${payload.results[1].card_idolized_image}`, `http:${payload.results[2].card_idolized_image}`, `http:${payload.results[3].card_idolized_image}`, `http:${payload.results[4].card_idolized_image}`, `http:${payload.results[5].card_idolized_image}`, `http:${payload.results[6].card_idolized_image}`, `http:${payload.results[7].card_idolized_image}`, `http:${payload.results[8].card_idolized_image}`], cooldownCount.llsif.set]
      }
    }
    function collectionChecker (payload) {
      if (payload.translated_collection === null) { return 'Rare' }
      else { return payload.translated_collection }
    }
    if (!cooldown.cooldownChecker(msg, tag)[0] || cooldown.cooldownChecker(msg, tag) == undefined || cooldown.cooldownChecker(msg, tag) == null) {
      if (Number.isInteger(parseInt(args[0]))) {
        request
          .get(`http://schoolido.lu/api/cards/${args[0]}`)
          .end((err, res) => {
            if (err) { log.error(err) ; bot.createMessage(msg.channel.id, `${args[0]} isn't a valid ID.`) ; cooldown.cooldownMaker(cooldownCount.llsif.fail, msg, tag) }
            else {
              cooldown.cooldownMaker(cooldownCount.llsif.id, msg, tag)
              const payload = res.body
              msg.channel.sendTyping().then(render.loveLiveCards(idChecker(payload), function (idolImage) {
                bot.createMessage(msg.channel.id, `Card ID: ${payload.id}\n${collectionChecker(payload)} ${payload.idol.name}\n<${payload.website_url}>`, { file: idolImage, name: `mariBotIDSearch_${args[0]}.png` }) 
              })) 
            }
          })
      }
      else if (args[0] == 'set') {
        if (args[1] == null || args[1] == undefined ) { bot.createMessage(msg.channel.id, `No set specified.`) ; return }
        request
          .get(`http://schoolido.lu/api/cards/?&is_special=False&is_event=False&translated_collection=${args[1]}`)
          .end((err, res) => {
            if (err) { log.error(err) ; bot.createMessage(msg.channel.id, `${args[1]} isn't a valid set.`) ; cooldown.cooldownMaker(cooldownCount.llsif.fail, msg, tag) }
            else if (res.body.results.length < 1) { bot.createMessage(msg.channel.id, `${args[1]} isn't a valid set.`) ; cooldown.cooldownMaker(cooldownCount.llsif.fail, msg, tag) }
            else {
              const payload = res.body
              cooldown.cooldownMaker(setChecker(args, payload)[1], msg, tag)
              msg.channel.sendTyping().then(render.loveLiveCards(setChecker(args, payload)[0], function (idolImage) {
                bot.createMessage(msg.channel.id, ``, { file: idolImage, name: `mariBotSetSearch_${args[1]}.png` }) 
              })) 
            }
          })
      }
    }
    else {
      bot.createMessage(msg.channel.id, `Cooldown is active, ${cooldown.cooldownChecker(msg, tag)[1]} seconds remain.`)
    }
  }
}

module.exports = llsif