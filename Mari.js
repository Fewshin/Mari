const cluster = require('cluster')

const Bot = require('./core')
const Mari = new Bot()
const Logger = require('./utilities/Logger')
const log = new Logger('bgBlue', 'System')
const config = require('./config.json')

if (cluster.isMaster) {
	for (let i = 0; i < config.shardCount; i++) {
		cluster.fork({ 'SHARD_ID': i, 'SHARD_COUNT': config.shardCount })
  }
}
else {
  Mari.botOn()
}