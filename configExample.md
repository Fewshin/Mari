## Config Example    
    ``` json
    {
        "token":"Bot TOKEN_HERE", // <--- Out the token here, leave the Bot part in or else it won't boot.
        "shardCount":"1", //<--- How many instances of the bot you want to run. Discord only allows a maximum of 4000 guilds per shard so ideally this number is: Math.ceil(num of guilds / 4000) 
        "prefix":"m!", //<--- The standard prefix for the baseCommands.
        "adminPrefix": "m#", //<--- Commands for server management, require specific server permissions depending on the command.
        "sysPrefix": "m$", //<--- Commands used to assist in development of the bot. Usually you don't want users using these.
        "defaultImageFormat":"gif", //<--- What format you want all the images in when asking for avatars and such.
        "defaultImageSize":"1024", //<--- The size of the previously mentioned images.
        "defaultTimezone":"US/Central", //<--- Timezone that everything is logged in. Timezone list with proper formatting can be found here: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
        "exclusions": { "guilds": [  ], "channels": [  ], "users": [  ], "bots": true }, //<--- Location to put IDs of people, guilds, or channels you don't want using the bot.
        "sysAdmins": [  ] //<--- IDs for users able to use system commands. 
    }
    ```