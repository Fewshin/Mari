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
      return callback('I don\'t want to fucking write this part mannnnnnnnnn.')
    }
    else { return }
  }
}

module.exports = canvasManager