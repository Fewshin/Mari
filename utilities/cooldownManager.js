const cooldownMap = new Map()

class cooldownManager {
  constructor (options) {
    this.options = options || {}
  }
  cooldownMaker (count, msg, command) {
    cooldownMap.set(`${msg.author.id}-${command}`, Date.now() + (count * 1000))
  }
  cooldownChecker (msg, command) {
    if (cooldownMap.has(`${msg.author.id}-${command}`)) {
      if (cooldownMap.get(`${msg.author.id}-${command}`) > Date.now()) {
        return [true, ((cooldownMap.get(`${msg.author.id}-${command}`) - Date.now()) / 1000)]
      }
      else {
        cooldownMap.delete(`${msg.author.id}-${command}`) 
        return [false, null]
      }
    }
    else { return [false, null] }
  }
}

module.exports = cooldownManager