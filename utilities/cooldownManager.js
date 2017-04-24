const config = require('../config.json')
const cooldownMap = new Map()

class cooldownManager {
  constructor (options) {
    this.options = options || {}
  }
  cooldownMaker (count, msg, command) {
    cooldownMap.set(`${msg.author.id}-${command}`, Date.now() + (count * 1000))
  }
  cooldownChecker (msg, command) {
    if (config.sysAdmins.indexOf(msg.author.id) > -1 && !config.exclusions.adminCooldown) { return [false, null] }
    else if (cooldownMap.has(`${msg.author.id}-${command}`)) {
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