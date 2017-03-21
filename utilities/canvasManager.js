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
    else if (urlArray.length % 2 === 0 && urlArray.length < 12) {
      let canvas = new Canvas((urlArray.length / 2) * 512 , 1440)
      let ctx = canvas.getContext('2d')
      let counter = 0
      for (let i = 0; i < urlArray.length; i++) {
        request
          .get(urlArray[i])
          .end(function(err, res){
            if (err) { log.error(err) }
            let img = new Image()
            function heightBoiz () {
              if (i % 2 === 0) { return 0 }
              else { return 720 }
            }
            img.onload = function () {
              ctx.drawImage(img, Math.floor(i/2)* 512,(i%2) *720, 512, 720)
              log.custom('bgCyan', 'Canvas', `${i} Love Live card rendered`)
              counter++
              if (counter === urlArray.length) { return callback(canvas.toBuffer(img)) }
            }
            img.onerror = function (err) { log.error(err) }
            img.src = res.body
          })  
      }
    }
  }
}

module.exports = canvasManager