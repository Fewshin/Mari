//Doesn't actually use Chron
const schedule = require('node-schedule')
const moment = require('moment-timezone')

class chronManager {
  constructor (options) {
    this.options = options || {}
  }
  loveLiveReset (bot) {
    let rule = new schedule.RecurrenceRule()
    rule.minute = 0
    let j = schedule.scheduleJob(rule, function () {
      if (moment().tz('Zulu').format('h A') === '12 AM'){
        bot.createMessage('242538149190959115', '**ENG daily reset just happened!**\n' +
        'Be sure you grab your daily and first song played gem!')}
      else if (moment().tz('Asia/Tokyo').format('h A') === '12 AM') {
        bot.createMessage('242538149190959115', '**JPN daily reset just happened!**\n' +
        'Be sure you grab your daily and first song played gem!')}
    })
  }
}

module.exports = chronManager