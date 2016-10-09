var config = require("./config.json")
var package = require("./package.json")
var express = require('express');
var app = express();
app.use('/images', express.static(config.imageDirectory))
var redis = require('redis')
var client = redis.createClient({detect_buffers: true, db: 15})
client.on('error', err => {console.log('Redis Error: ' + err)})
const Eris = require('eris');
var bot = new Eris.CommandClient(config.token, {}, {
    description: package.description,
    owner: package.author,
    prefix: config.prefix
});
bot.on('ready', () => {
    console.log('Bot is active');
    if (isNaN(config.notificationChannel) === false) {
    bot.createMessage(config.notificationChannel, config.notificationMessage)}
    console.log('Number of Admins: ' + config.adminids.length)
    bot.editGame({
        name: config.defaultgame
    })
})
//==================================================================
bot.registerCommand('ping', 'Pong!', { 
    description: 'Pong!',
    fullDescription: 'Used to check if the bot is up.'
});
//======================================================================
bot.registerCommand('joke', 'http://i.imgur.com/jlVc2k7.jpg', { 
    description: 'It\'s Joke',
    fullDescription: 'IT\'s JUST A PRANK BRO'
});
//====================================================================
//todo.push(args[0])
bot.registerCommand('todo', (msg ,args, todo) =>{
    if(config.adminids.indexOf(msg.author.id) > -1){
        client.sadd('todo', args.join(' '))
        return 'Todo Updated!'
    }
    else{
        return 'You don\'t have permission to do this.'
        }
}, {
    description: 'Adds to todo list!',
    fullDescription: 'Add to my infinitely long todo list!'
})
//==================================================================
bot.registerCommand('echo', (msg ,args) =>{
    if(config.adminids.indexOf(msg.author.id) > -1){
        return args.join(' ')
    }
    else{
        return 'You don\'t have permission to do this.'
    }
}, {
    description: 'm!echo',
    fullDescription: 'Echos what you say.'
})
//====================================================================================================================================================================================
bot.registerCommand('stats', (msg ,args) =>{
    return '__**Bot Information**__:\n' +
    '\n**Version**: ' +
    package.version +
    '\n**Uptime**: ' + 
    Math.round(bot.uptime / (1000 * 60 * 60)) + ' Hours, ' + Math.round(bot.uptime / (1000 * 60)) % 60 + ' Minutes, ' + Math.round(bot.uptime / 1000) % 60 + ' Seconds.' +
    '\n**Guilds**: ' +
    bot.guilds.size +
    '\n**Channels**: ' +
    Object.keys(bot.channelGuildMap).length +
    '\n**Users**: ' +
    bot.users.size
}, { 
    description: 'Stats on the bot',
    fullDescription: 'Used to check the Bot\'s Stats.'
})
//====================================================================================================================================================================================
bot.connect();
app.get('/', function (req, res) {
    client.smembers('todo', function (err, reply) {
        res.send([
            'Todo List:',
            reply.join(', ')
        ].join('\n'))
    })
});

app.listen(config.portListen, function () {
  console.log('Localhost is active');
});