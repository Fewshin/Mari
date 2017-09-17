const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const config = require('../config.json')
let mongoUrl = `mongodb://${config.mongoIP}:${config.mongoPort}/${config.mongoDB}`

const Logger = require('./utilities/Logger')
const log = new Logger('bgBlue', 'System')

class dataManager {
  constructor (options) {
    this.options = options || {}
  }
  redis () {
    return
  }
  mongoPurge (callback) {
    let count = 0
    MongoClient.connect(mongoUrl, function(err, db) {
      if (err) { log.error(`${err}`) ; if (!err) { return } }
      db.collection('guildInfo').drop(function(err, delOK) {
        if (err) { log.error(`${err}`) ; if (!err) { return } }
        if (delOK) log.system(`Collection guildInfo deleted!`)
        count++
      })
      db.collection('userInfo').drop(function(err, delOK) {
        if (err) { log.error(`${err}`) ; if (!err) { return } }
        if (delOK) log.system(`Collection userInfo deleted!`)
        count++
      })
      if (count = 2) { db.close ; return callback }
    })
  }
  mongoCreate (callback) {
    let count = 0
    MongoClient.connect(mongoUrl, function(err, db) {
      if (err) { log.error(`${err}`) ; if (!err) { return } }
      db.createCollection('userInfo', function(err, res) {
        if (err) { log.error(`${err}`) ; if (!err) { return } }
        log.system(`Collection userInfo created!`)
        count ++
      })
      db.createCollection('guildInfo', function(err, res) {
        if (err) { log.error(`${err}`) ; if (!err) { return } }
        log.system(`Collection guildInfo created!`)
        count ++
      })
      if (count = 2) { db.close ; return callback }
    })
  }
  bootStoreGuild (guildArray) {
    MongoClient.connect(mongoUrl, function(err, db) {
      if (err) { log.error(`${err}`) ; if (!err) { return } }
      for (i = 0; i < guildArray.length; i++) {
        db.collection('guildInfo').insertOne({ name: guildArray[i].name, object: guildArray[i] }, function (err, res) {
          if (err) { log.error(`${err}`) ; if (!err) { return } }
          if (i = guildArray.length - 1) { log.system(`Initial guildInfo based on name stored!`) }
        })
        db.collection('guildInfo').insertOne({ id: guildArray[i].id, object: guildArray[i] }, function (err, res) {
          if (err) { log.error(`${err}`) ; if (!err) { return } }
          if (i = guildArray.length - 1) { log.system(`Initial guildInfo based on ID stored!`) }
        })
        if (i = guildArray.length - 1) { db.close() }
      }
    })
  }
  bootStoreUser (userArray) {
    MongoClient.connect(mongoUrl, function(err, db) {
      if (err) { log.error(`${err}`) ; if (!err) { return } }
      for (i = 0; i < userArray.length; i++) {
        db.collection('userInfo').insertOne({ name: userArray[i].username, object: userArray[i] }, function (err, res) {
          if (err) { log.error(`${err}`) ; if (!err) { return } }
          if (i = userArray.length - 1) { log.system(`Initial userInfo based on name stored!`) }
        })
        db.collection('userInfo').insertOne({ id: userArray[i].id, object: userArray[i] }, function (err, res) {
          if (err) { log.error(`${err}`) ; if (!err) { return } }
          if (i = userArray.length - 1) { log.system(`Initial userInfo based on ID stored!`) }
        })
        if (i = userArray.length - 1) { db.close() }
      }
    })
  }
  addUser (user) {
    MongoClient.connect(mongoUrl, function(err, db) {
      if (err) { log.error(`${err}`) ; if (!err) { return } }
      db.collection('userInfo').find({ id: user.id }).toArray(function(err, res) {
        if (err) { 
          db.collection('userInfo').insertOne({ name: user.username, object: user }, function (err, res) {
            if (err) { log.error(`${err}`) ; if (!err) { return } }
          })
          db.collection('userInfo').insertOne({ id: user.id, object: user }, function (err, res) {
            if (err) { log.error(`${err}`) ; if (!err) { return } }
          })
        }
        else { return }
        db.close()
      })
    })
  }
  addGuild (guild) {
    let count = 0
    MongoClient.connect(mongoUrl, function(err, db) {
      if (err) { log.error(`${err}`) ; if (!err) { return } }
      for (i = 0; i < guild.members.map(u => u).length; i++) {
        db.collection('userInfo').find({ id: guild.members.map(u => u).id }).toArray(function(err, res) {
          if (err) { 
            db.collection('userInfo').insertOne({ name: guild.members.map(u => u).username, object: user }, function (err, res) {
              if (err) { log.error(`${err}`) ; if (!err) { return } }
            })
            db.collection('userInfo').insertOne({ id: guild.members.map(u => u).id, object: user }, function (err, res) {
              if (err) { log.error(`${err}`) ; if (!err) { return } }
            })
          }
          else { return }
        })
        if (i = guild.members.map(u => u).length - 1) { count++ }
      }
      db.collection('guildInfo').insertOne({ name: guild.name, object: guild }, function (err, res) {
        if (err) { log.error(`${err}`) ; if (!err) { return } }
        count ++
      })
      db.collection('guildInfo').insertOne({ id: guild.id, object: guild }, function (err, res) {
        if (err) { log.error(`${err}`) ; if (!err) { return } }
        count++
      })
      if (count = 3) { db.close() }
    })
  }
}

module.exports = dataManager