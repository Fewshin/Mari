const cluster = require('cluster')
const config = require('./config.json')
const Bot = require('./core')
const Mari = new Bot()
const Logger = require('./utilities/Logger')
const log = new Logger('bgBlue', 'System')

if (cluster.isMaster) {
  for (let i = 0; i < config.shardCount; i++) {
    cluster.fork({ 'SHARD_ID': i, 'SHARD_COUNT': config.shardCount })
  }
}
else {
  Mari.botOn()
}