const Canvas = require('canvas')
const Image = Canvas.Image
const Logger = require('./Logger')
const log = new Logger('bgBlue', 'System')
const request = require('superagent')
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
    else if (urlArray.length % 2 == 0 && urlArray.length < 12 && urlArray.length != 2) {
      let canvas = new Canvas((urlArray.length / 2) * 512 , 1440)
      let ctx = canvas.getContext('2d')
      let counter = 0
      for (let i = 0; i < urlArray.length; i++) {
        request
          .get(urlArray[i])
          .end(function(err, res){
            if (err) { log.error(err) }
            let img = new Image()
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
    else if (urlArray.length == 2) {
      let canvas = new Canvas(1024, 720)
      let ctx = canvas.getContext('2d')
      let counter = 0
      for (let i = 0; i < urlArray.length; i++) {
        request
          .get(urlArray[i])
          .end(function(err, res){
            if (err) { log.error(err) }
            let img = new Image()
            img.onload = function () {
              ctx.drawImage(img, i * 512, 0, 512, 720)
              log.custom('bgCyan', 'Canvas', `${i} Love Live card rendered`)
              counter++
              if (counter === urlArray.length) { return callback(canvas.toBuffer(img)) }
            }
            img.onerror = function (err) { log.error(err) }
            img.src = res.body
          })  
      }
    }
    else if (urlArray.length == 3 || urlArray.length == 5 || urlArray.length == 7) {
      function widthManager () {
        if (urlArray.length == 3) { return 1024 }
        else if (urlArray.length == 5) { return 1536 }
        else if (urlArray.length == 7) { return 2048 }
      }
      let canvas = new Canvas(widthManager(), 1440)
      let ctx = canvas.getContext('2d')
      let counter = 0
      function positioner (i) {
        if (i == 0) { return [0, 0] }
        else if (i == 1) { return [512, 0] }
        else if (i == 2) { return [256, 720] }
        else if (i == 3) { return [1024, 0] }
        else if (i == 4) { return [768, 720] }
        else if (i == 5) { return [1536, 0] }
        else if (i == 6) { return [1280, 720] }
      }
      for (let i = 0; i < urlArray.length; i++) {
        request
          .get(urlArray[i])
          .end(function(err, res){
            if (err) { log.error(err) }
            let img = new Image()
            img.onload = function () {
              ctx.drawImage(img, positioner(i)[0], positioner(i)[1], 512, 720)
              log.custom('bgCyan', 'Canvas', `${i} Love Live card rendered`)
              counter++
              if (counter === urlArray.length) { return callback(canvas.toBuffer(img)) }
            }
            img.onerror = function (err) { log.error(err) }
            img.src = res.body
          })  
      }
    }
    else if (urlArray.length == 9) {
      let canvas = new Canvas(1536, 2160)
      let ctx = canvas.getContext('2d')
      let counter = 0
      function positioner (i) {
        if (i < 6) { return [Math.floor(i/2)* 512, (i%2) *720] }
        else if (i == 6) { return [0, 1440] }
        else if (i == 7) { return [512, 1440] }
        else if (i == 8) { return [1024, 1440] }
      }
      for (let i = 0; i < urlArray.length; i++) {
        request
          .get(urlArray[i])
          .end(function(err, res){
            if (err) { log.error(err) }
            let img = new Image()
            img.onload = function () {
              ctx.drawImage(img, positioner(i)[0], positioner(i)[1], 512, 720)
              log.custom('bgCyan', 'Canvas', `${i} Love Live card rendered`)
              counter++
              if (counter === urlArray.length) { return callback(canvas.toBuffer(img)) }
            }
            img.onerror = function (err) { log.error(err) }
            img.src = res.body
          })  
      }
    }
    else if (urlArray.length == 11) {
      let canvas = new Canvas(975, 420)
      let ctx = canvas.getContext('2d')
      function inviteChecker () {
        if (config.inviteLink === null || config.inviteLink === undefined) { return '' }
        else { return `, invite the bot to your server: ${config.inviteLink}` }
      }
      ctx.rect(0, 0, 975, 420)
      ctx.fillStyle = 'white'
      ctx.fill()
      let counter = 0
      function positioner (i) {
        if (i == 0) { return [41, 63] }
        else if (i == 1) { return [190, 63] }
        else if (i == 2) { return [339, 63] }
        else if (i == 3) { return [488, 63] }
        else if (i == 4) { return [637, 63] }
        else if (i == 5) { return [786, 63] }
        else if (i == 6) { return [132, 212] }
        else if (i == 7) { return [281, 212] }
        else if (i == 8) { return [430, 212] }
        else if (i == 9) { return [579, 212] }
        else if (i == 10) { return [728, 212] }
      }
      for (let i = 0; i < urlArray.length; i++) {
        request
          .get(urlArray[i])
          .end(function(err, res){
            if (err) { log.error(err) }
            let img = new Image()
            img.onload = function () {
              ctx.drawImage(img, positioner(i)[0], positioner(i)[1], 130, 130)
              log.custom('bgCyan', 'Canvas', `${i} Love Live card rendered`)
              counter++
              if (counter === urlArray.length) { return callback(canvas.toBuffer(img)) }
            }
            img.onerror = function (err) { log.error(err) }
            img.src = res.body
          })  
      }
    }
    else { return }
  }
}

module.exports = canvasManager