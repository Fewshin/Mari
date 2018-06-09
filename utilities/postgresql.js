const config = require('../config.json')
const { Pool, Client } = require('pg')

class postgresql {
  constructor (options) {
    this.options = options || {}
  }
  addToTable (tableName) {
    const client = new Client ({
      user: config.postgresql.user,
      host: config.postgresql.host,
      database: config.postgresql.database,
      password: config.postgresql.password,
      port: config.postgresql.port
    })
    client.connect()

    client.query()
  }
  createTable (tableName, columns) {
    const client = new Client ({
      user: config.postgresql.user,
      host: config.postgresql.host,
      database: config.postgresql.database,
      password: config.postgresql.password,
      port: config.postgresql.port
    })
    client.connect()  
    client.query(`CREATE TABLE ${tableName} ( ${columns.join(', ')} )`)
  }
}