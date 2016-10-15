var config = require("./config.json")
var package = require("./package.json")
var moment = require('moment-timezone')
//=======================================================
const chalk = require('chalk')
var testtag = chalk.bgRed.bold(' Testing ') + ' '
var commandtag = chalk.bgYellow.bold(' Command ') + ' '
var canvastag = chalk.bgCyan.bold(' Canvas ') + ' '
//============================================================
var session = require('express-session')
var express = require('express');
var app = express();
app.use('/images', express.static(config.imageDirectory))
//==================================================================
var passport = require('passport')
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy
var TwitterStrategy = require('passport-twitter').Strategy;
//==================================================================
var redis = require('redis')
var client = redis.createClient({detect_buffers: true, db: 15})
client.on('error', err => {console.log(chalk.bgRed.bold(' Redis Error ') + err + clockstamp())})
//====================================================================================
// var Canvas = require('canvas')
// var Image = Canvas.Image
//======================================================
const Eris = require('eris')
var bot = new Eris.CommandClient(config.token, {}, {
    description: package.description,
    owner: package.author,
    prefix: config.prefix
});
console.log(chalk.bgBlue.bold(' System ') + ' Initiating' + clockstamp())
bot.on('ready', () => {
    console.log(chalk.bgGreen.bold(' Eris ') + ' Bot is active');
    if (isNaN(config.notificationChannel) === false) {
    bot.createMessage(config.notificationChannel,   config.notificationMessage + ' > ' + moment().tz(config.defaultTimezone).format('h:mm A') + '**')}
    if (config.simpleLog.toLowerCase().startsWith('no') === true){
    console.log(chalk.bgCyan.bold(' Config ') + ' Number of Admins: ' + config.adminids.length)
    console.log(chalk.bgCyan.bold(' Config ') + ' Current Timezone: ' + config.defaultTimezone)}
    bot.editStatus({name: config.defaultgame})
})
function guildName (msg) {
    var servername = "in PMs"
    if(msg.guild) {servername = msg.guild.name} return servername}
function msgAuthor (msg) {
    return msg.author.username}
function clockstamp () {
    return ' >' + chalk.green.bold(moment().tz(config.defaultTimezone).format(' h:mm A MM/D'))}
function commandLogger (msg) {
    return console.log(commandtag + chalk.magenta.bold(guildName(msg)) + ' > ' + chalk.cyan.bold(msgAuthor(msg)) + ': ' + msg.content + clockstamp())}
// function canvasImage (msg) {
//     var canvas = new Canvas(args[0], args[1])
//     var ctx = canvas.getContext('2d')
//     return ctx}
//==================================================================
bot.registerCommand('ping', (msg,args) => {
    commandLogger(msg)
    return 'Pong!'
}, { 
    description: 'Pong!',
    fullDescription: 'Used to check if the bot is up.'
});
//======================================================================
// bot.registerCommand('image', (msg,args) => {
//     commandLogger(msg)
//     return 'THE COMMAND WORKS NERDDDDDDDDDDD'
// }, { 
//     description: 'Image Rendering',
//     fullDescription: 'Uses Canvas to render an image from the host\'s image folder.'
// });
//===================================================================================
bot.registerCommand('status', (msg,args) => {
    commandLogger(msg)
        if (config.adminids.indexOf(msg.author.id) > -1) {
            bot.editStatus({name: args.join(' ')})
            return 'Status Updated!'}
        else {
            return 'You don\'t have permission to do this.'}
}, { 
    description: 'Status editor.',
    fullDescription: 'Used to change the game the bot is playing.'
});
//============================================================================
bot.registerCommand('time', (msg,args) => {
    commandLogger(msg)
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
            return moment().tz(args.join(' ')).format('MMMM Do YYYY, h:mm:ss A')}
        else if (args.join(' ') === ''){
            return moment().tz(config.defaultTimezone).format('MMMM Do YYYY, h:mm:ss A')}
        else {
            return 'Invalid Timezone, the command uses TZ timezone formatting which can be found here: http://frid.li/timezones. \nThe default timezone is: ' + config.defaultTimezone}
    //}
}, { 
    description: 'Check the Time',
    fullDescription: 'Used to check the date and time of a timezone. Uses TZ timezones which can be found here: http://frid.li/timezones. \nThe default timezone is: ' + config.defaultTimezone
});
//==============================================================================
bot.registerCommand('joke', (msg,args) => {
    commandLogger(msg)
    return 'http://i.imgur.com/jlVc2k7.jpg'
}, { 
    description: 'It\'s Joke',
    fullDescription: 'IT\'s JUST A PRANK BRO'
});
//====================================================================
bot.registerCommand('todo', (msg ,args) =>{
    commandLogger(msg)
    if(config.adminids.indexOf(msg.author.id) > -1){
        client.sadd('todo', args.join(' '))
        return 'Todo Updated!'}
    else{
        return 'You don\'t have permission to do this.'}
}, {
    description: 'Adds to todo list!',
    fullDescription: 'Add to my infinitely long todo list!'
})
//==================================================================
bot.registerCommand('echo', (msg ,args) =>{
    commandLogger(msg)
    if(config.adminids.indexOf(msg.author.id) > -1){
        return args.join(' ')}
    else{
        return 'You don\'t have permission to do this.'}
}, {
    description: 'm!echo',
    fullDescription: 'Echos what you say.'
})
//====================================================================================================================================================================================
bot.registerCommand('stats', (msg ,args) =>{
    commandLogger(msg)
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
        if (err) { return console.log(chalk.bgRed.bold(' Express Error ') + ' ' + err + clockstamp()); }
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