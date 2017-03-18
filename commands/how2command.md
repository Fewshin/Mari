## How to make a command.

``` js
const fs = require('fs') //<--- Requirements for the command go here, keep in mind everything you need from Eris should already be here.

class itsJoke { //<--- Name the class file, in theory it can be whatever you want it to be as long as it's different from the other class files.
  getName () { //<--- This is where you define what will activate the command. If someone were to type ${config.prefix}joke in chat the command would activate.
    return 'joke'
  }
  getDesc () { //<--- This doesn't do anything quite yet although it will be eventually used for the help command. I advise you include this category.
    return { simple: 'It\'s Joke!', advanced: 'Used for jokes.', usage: null }
  }
  simpleCommand (msg, args) { //<--- This part is for simpler commands where you want to return a simple output. For example "return 'Pong'" would make the bot say Pong when triggered. If you don't want to do this return null.
    return null
  }
  command (msg, bot, tag, args) { //<--- This is for more advanced usage. In this instance the bot just runs whatever code you feed it. You don't have to include this part if you are using the simpleCommand function.
    fs.readFile('resources/memes/ITSJOKE.jpg', function(err, data) { 
      let image = new Buffer(data)
      bot.createMessage(msg.channel.id, '', { file: image, name: 'itsJoke.jpg' })
    })
  }
}

module.exports = itsJoke //<--- Export it!
```