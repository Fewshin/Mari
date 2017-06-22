const request = require('superagent')
const Logger = require('../../utilities/Logger')
const log = new Logger('bgBlue', 'System')
const canvasManager = require('../../utilities/canvasManager')
const render = new canvasManager()
const cooldownManager = require('../../utilities/cooldownManager')
const cooldown = new cooldownManager()

class llroll {
  getName () {
    return 'llroll'
  }
  getDesc () {
    return { simple: 'Roll Love Live cards!', advanced: 'Roll for Love Live cards!', usage: 'llroll < Number between 1-10 or 10 + 1 > < aqours or muse >', aliases: ['roll'] }
  }
  simpleCommand (msg, args) {
    return null
  }
  command (msg, bot, tag, args) {
    function rarityFinder (RNG) {
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
    function rarityFinderPlus (RNG) {
      if (RNG === 1) {
        return 'UR'
      }
      else if (RNG <= 5) {
        return 'SSR'
      }
      else {
        return 'SR'
      }
    }
    function linkRarity (i, RNG) {
      if (i == 10) { return rarityFinderPlus(RNG) }
      else { return rarityFinder(RNG) }
    }
    function collectionChecker (payload) {
      if (payload.translated_collection === null) { return 'Rare' }
      else { return payload.translated_collection }
    }
    function messageMaker (idolName, rCount, srCount, ssrCount, urCount, cardCount, payload) {
      if (cardCount > 1) {
        let countArray = [`URs: ${urCount.length}`, `SSRs: ${ssrCount.length}`, `SRs: ${srCount.length}`, `Rs: ${rCount.length}`]
        return `${countArray.join('; ')}\n${idolName.join(', ')}`
      }
      else { return `${payload.rarity}\n${collectionChecker(payload)} ${payload.idol.name}` }
    }
    function imageDecider (payload, value) {
      if (value == 11) { return `http:${payload.round_card_image}` }
      else { return `http:${payload.card_image}` }
    }
    function unitDecider (args) {
      if (args[1] == 'muse' || args[1] == 'μ\'s' || args[1] == 'Muse') { return '%CE%BC%27s' }
      else if (args[1] == 'aqours' || args[1] == 'aquors' || args[1] == 'Aquors' || args[1] == 'Aqours') { return 'aqours' }
      else if (args[1] == undefined || args[1] == null) { return 'aqours,%CE%BC%27s' }
      else { return 'aqours,%CE%BC%27s' }
    }
    if (args[0] == null || args[0] == undefined) { args[0] = 1 }
    if (args[0] == '10+1') { args[0] = 11 }
    if (args[0] % 1 === 0 && args[0] < 12) {
      let urlArray = []
      let idolName = []
      let rCount = []
      let srCount = []
      let ssrCount = []
      let urCount = []
      if (!cooldown.cooldownChecker(msg, tag)[0] || cooldown.cooldownChecker(msg, tag) == undefined || cooldown.cooldownChecker(msg, tag) == null) {
        cooldown.cooldownMaker(args[0] * 10, msg, tag)
        for (let i = 0; i < args[0]; i++) {
          let RNG = Math.ceil(Math.random() * 100) 
          let searchURL = `http://schoolido.lu/api/cards/?&is_special=False&is_event=False&ordering=random&is_promo=False&rarity=${linkRarity(i, RNG)}&idol_main_unit=${unitDecider(args)}`
          request
            .get(searchURL)
            .end((err, res) => {
              if (err) { log.error(err) ; bot.createMessage(msg.channel.id, 'There was an error, contact Fewshin#5253 with the details. ```' + err.message + '```') }
              else {
                const payload = res.body.results[0]
                idolName.push(`${collectionChecker(payload)} ${payload.idol.name}`)
                urlArray.push(imageDecider(payload, args[0]))
                if (linkRarity(i, RNG) === 'R') { rCount.push('R') }
                else if (linkRarity(i, RNG) === 'SR') { srCount.push('SR') }
                else if (linkRarity(i, RNG) === 'SSR') { ssrCount.push('SSR') }
                else if (linkRarity(i, RNG) === 'UR') { urCount.push('UR') }
                else { return }
                if (urlArray.length == args[0]) {
                  log.custom('bgCyan', 'urlArray',`[${urlArray}]`)
                  msg.channel.sendTyping().then(render.loveLiveCards(urlArray, function (idolImage) {
                    bot.createMessage(msg.channel.id, messageMaker(idolName, rCount, srCount, ssrCount, urCount, args[0], payload), { file: idolImage, name: `mariBotScout_${args[0]}.png` }) 
                  })) 
                } 
              }
            })
        }
      }
      else {
        bot.createMessage(msg.channel.id, `Cooldown is active, ${cooldown.cooldownChecker(msg, tag)[1]} seconds remain.`)
      }
    }
  }  
}

module.exports = llroll