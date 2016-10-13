var config = require("./config.json")
var package = require("./package.json")
const chalk = require('chalk')
var testtag = chalk.bgRed.bold(' Testing ') + ' '
var moment = require('moment-timezone')
var timestamp = chalk.green.bold(moment().tz(config.defaultTimezone).format(' > h:mm A MM/D'))
var session = require('express-session')
var express = require('express');
var app = express();
app.use('/images', express.static(config.imageDirectory))
var passport = require('passport')
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy
var TwitterStrategy = require('passport-twitter').Strategy;
var redis = require('redis')
var client = redis.createClient({detect_buffers: true, db: 15})
client.on('error', err => {console.log(chalk.bgRed.bold(' Redis Error ') + err)})
const Eris = require('eris');
var bot = new Eris.CommandClient(config.token, {}, {
    description: package.description,
    owner: package.author,
    prefix: config.prefix
});
console.log(chalk.bgBlue.bold(' System ') + ' Initiating' + timestamp)
bot.on('ready', () => {
    console.log(chalk.bgGreen.bold(' Eris ') + ' Bot is active');
    if (isNaN(config.notificationChannel) === false) {
    bot.createMessage(config.notificationChannel,   config.notificationMessage + ' > ' + moment().tz(config.defaultTimezone).format('h:mm A') + '**')}
    if (config.simpleLog.toLowerCase().startsWith('no') === true){
    console.log(chalk.bgCyan.bold(' Config ') + ' Number of Admins: ' + config.adminids.length)
    console.log(chalk.bgCyan.bold(' Config ') + ' Current Timezone: ' + config.defaultTimezone)}
    bot.editGame({
        name: config.defaultgame
    })
})
//==================================================================
bot.registerCommand('ping', (msg,args) => {
    console.log(chalk.bgYellow.bold(' Command ') + ' ' + chalk.magenta.bold(msg.channel.guild.name) + ' > ' + chalk.cyan.bold(msg.author.username) + ': ' + msg.content + timestamp)
    return 'Pong!'
}, { 
    description: 'Pong!',
    fullDescription: 'Used to check if the bot is up.'
});
//======================================================================
bot.registerCommand('time', (msg,args) => {
    console.log(chalk.bgYellow.bold(' Command ') + ' ' + chalk.magenta.bold(msg.channel.guild.name) + ' > ' + chalk.cyan.bold(msg.author.username) + ': ' + msg.content + timestamp)
    // console.log(testtag + moment().tz(config.defaultTimezone).format())
    // console.log(testtag + moment().tz('Asia/Taipei').format())
    // var tz3 = moment().tz(config.defaultTimezone).format('hmm')
    // var tz31 = moment.tz.zone(config.defaultTimezone)
    // var tz4 = moment().tz('Asia/Taipei').format('hmm')
    // console.log(testtag + tz31.parse(Date.UTC(tz3)))
    // if (args[0] === 'convert') {
    //     var tz1 = moment().tz(args[1]).format('Z')
    //     var tz2 = moment().tz(args[2]).format('Z')
    //     return  'The date and time in ' + args[2] + ' is ' + moment().tz(args[2]).format('MMMM Do YYYY, h:mm:ss a')
    // }
    //else {
        if (moment.tz.zone(args.join(' ')) !== null){
            return moment().tz(args.join(' ')).format('MMMM Do YYYY, h:mm:ss a')}
        else if (args.join(' ') === ''){
            return moment().tz(config.defaultTimezone).format('MMMM Do YYYY, h:mm:ss a')}
        else {
            return 'Invalid Timezone, the command uses TZ timezone formatting which can be found here: http://frid.li/timezones. \nThe default timezone is: ' + config.defaultTimezone}
    //}
}, { 
    description: 'Check the Time',
    fullDescription: 'Used to check the date and time of a timezone. Uses TZ timezones which can be found here: http://frid.li/timezones. \nThe default timezone is: ' + config.defaultTimezone
});
//==============================================================================
bot.registerCommand('joke', (msg,args) => {
    console.log(chalk.bgYellow.bold(' Command ') + ' ' + chalk.magenta.bold(msg.channel.guild.name) + ' > ' + chalk.cyan.bold(msg.author.username) + ': ' + msg.content + timestamp)
    return 'http://i.imgur.com/jlVc2k7.jpg'
}, { 
    description: 'It\'s Joke',
    fullDescription: 'IT\'s JUST A PRANK BRO'
});
//====================================================================
bot.registerCommand('todo', (msg ,args) =>{
    console.log(chalk.bgYellow.bold(' Command ') + ' ' + chalk.magenta.bold(msg.channel.guild.name) + ' > ' + chalk.cyan.bold(msg.author.username) + ': ' + msg.content + timestamp)
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
    console.log(chalk.bgYellow.bold(' Command ') + ' ' + chalk.magenta.bold(msg.channel.guild.name) + ' > ' + chalk.cyan.bold(msg.author.username) + ': ' + msg.content + timestamp)
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
    console.log(chalk.bgYellow.bold(' Command ') + ' ' + chalk.magenta.bold(msg.channel.guild.name) + ' > ' + chalk.cyan.bold(msg.author.username) + ': ' + msg.content + timestamp)
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
        if (err) { return console.log(chalk.bgRed.bold(' Express Error ') + ' ' + err); }
        res.send([
            'Todo List:',
            reply.join(', ')
        ].join('\n'))
    })
});

app.listen(config.portListen, function () {
  console.log(chalk.bgMagenta(' Express ') + ' Localhost is active');
});

// passport.use(new TwitterStrategy({
//     consumerKey: config.twitterConsumerKey,
//     consumerSecret: config.twitterConsumerSecret,
//     callbackURL: "http://localhost/auth/twitter/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//     User.findOrCreate(config.ownername, function(err, user) {
//       if (err) { return console.log(chalk.bgRed.bold(' OAuth Error ') + ' ' + err); }
//       done(null, user);
//     });
//   }
// ));
// app.get('/auth/twitter', passport.authenticate('twitter'));
// app.get('/auth/twitter/callback',
//   passport.authenticate('twitter', { successRedirect: '/',
//                                      failureRedirect: '/login' }));