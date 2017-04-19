const request = require('superagent')
const Logger = require('../../utilities/Logger')
const log = new Logger('bgBlue', 'System')
const canvasManager = require('../../utilities/canvasManager')
const render = new canvasManager()
const cooldownManager = require('../../utilities/cooldownManager')
const cooldown = new cooldownManager()

class llsif {
  getName () {
    return 'llsif'
  }
  getDesc () {
    return { simple: 'Searches the Schoolido.lu API', advanced: 'Searches the Schoolido.lu API for specific cards', usage: 'm!llsif [ Card ID | Set | Idol ]' }
  }
  simpleCommand (msg, args) {
    return null
  }
  command (msg, bot, tag, args) { 
    function cardChecker (payload) {
      const filler = [
        'http://i.imgur.com/PexGKWP.png',
        'http://i.imgur.com/uMgJaSa.png',
        'http://i.imgur.com/k8Qzav1.png',
        'http://i.imgur.com/amDQvae.png',
        'http://i.imgur.com/l94Ad1l.png'
      ]
      if (payload.card_image == null || payload.card_image == 'null' || payload.card_image == undefined || payload.card_image == 'undefined') {
        return [filler[Math.floor(Math.random() * 5)], `http:${payload.card_idolized_image}`]
      }
      else if (payload.card_idolized_image == null || payload.card_idolized_image == 'null' || payload.card_idolized_image == undefined || payload.card_idolized_image == 'undefined') {
        return [payload.card_image, filler[Math.floor(Math.random() * 5)]]
      }
      else { return [`http:${payload.card_image}`, `http:${payload.card_idolized_image}`] }
    }
    function collectionChecker (payload) {
      if (payload.translated_collection === null) { return 'Rare' }
      else { return payload.translated_collection }
    }
    if (!cooldown.cooldownChecker(msg, tag)[0] || cooldown.cooldownChecker(msg, tag) == undefined || cooldown.cooldownChecker(msg, tag) == null) {
      if (Number.isInteger(parseInt(args[0]))) {
        cooldown.cooldownMaker(20, msg, tag)
        request
          .get(`http://schoolido.lu/api/cards/${args[0]}`)
          .end((err, res) => {
            if (err) { log.error(err) ; bot.createMessage(msg.channel.id, `${args[0]} isn't a valid ID.`) }
            else {
              const payload = res.body
              msg.channel.sendTyping().then(render.loveLiveCards(cardChecker(payload), msg.author.id, tag, function (idolImage) {
                bot.createMessage(msg.channel.id, `Card ID: ${payload.id}\n${collectionChecker(payload)} ${payload.idol.name}\n<${payload.website_url}>`, { file: idolImage, name: `mariBotIDSearch_${args[0]}.png` }) 
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