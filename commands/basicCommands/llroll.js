const request = require('superagent')
const Logger = require('../../utilities/Logger')
const log = new Logger('bgBlue', 'System')
const canvasManager = require('../../utilities/canvasManager')
const render = new canvasManager()

class llroll {
  getName () {
    return 'llroll'
  }
  getDesc () {
    return { simple: 'Roll Love Live cards!', advanced: 'Roll for Love Live cards!', usage: 'm!llroll <Number between 1-10 or 10 + 1>' }
  }
  simpleCommand (msg, args) {
    return null
  }
  command (msg, bot, tag, args) {
    let RNG = Math.ceil(Math.random() * 100) 
    function rarityFinder () {
      if (RNG === 1) {
        return 'UR'
      }
      else if (RNG <= 5) {
        return 'SSR'
      }
      else if (RNG <= 20) {
        return 'SR'
      }
      else {
        return 'R'
      }
    }
    let searchURL = 'http://schoolido.lu/api/cards/?&is_special=False&is_event=False&ordering=random&is_promo=False&rarity=' + rarityFinder()
    request
      .get(searchURL)
      .end((err, res) => {
        if (err) { log.error(err) ; bot.createMessage(msg.channel.id, 'There was an error, contact Fewshin#5253 with the details. ```' + err.message + '```') }
        else {
          const payload = res.body.results[0]
          msg.channel.sendTyping().then(render.loveLiveCards([`http:${payload.card_image}`], function (idolImage) {bot.createMessage(msg.channel.id, `${rarityFinder()}\n${payload.translated_collection} ${payload.idol.name}\nThis command is in testing, if there are issues don\'t hesitate to contact Fewshin#5253 with details.`, { file: idolImage, name: `${payload.translated_collection}_${payload.idol.name}.png` })}))
        }
      })
  }  
}
//bot.createMessage(msg.channel.id, `${rarityFinder()}\n${payload.translated_collection} ${payload.idol.name}\nThis command is in testing, if there are issues don\'t hesitate to contact Fewshin#5253 with details.`, { file: render.loveLiveCards([`http:${payload.card_image}`]), name: `${payload.translated_collection}_${payload.idol.name}.png` })
module.exports = llroll