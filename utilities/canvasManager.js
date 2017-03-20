const Canvas = require('canvas')
const Image = Canvas.Image
const Logger = require('./Logger')
const log = new Logger('bgBlue', 'System')
const request = require('superagent')
const _ = require('lodash')
const fs = require('fs')

class canvasManager {
  constructor (options) {
    this.options = options || {}
  }
  loveLiveCards (urlArray, callback) {
    if (urlArray.length === 1) {
      request
        .get(urlArray[0])
        .end(function(err, res){
          if (err) { log.error(err) }
          return callback(res.body)
        })
    }
  }
}

module.exports = canvasManager