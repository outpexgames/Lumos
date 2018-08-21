
const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
    const config = require("../config.json");
    var guild = message.guild;
    logger.log('info', `Commands command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
    const embed = new Discord.RichEmbed()
        .setColor('#ccff00') //change the color!
        .setTitle("PowerBot Commands\n\n")
        .addField("Prefix:", `\`${config.prefix}\``)

        .addField("Caution!:", "__**Every Command Starts with the Prefix**__\n__**Every Thing below is in the format of:**__\n__**<Command>|<Command Description>(Special Notes)**__\n__**<Usage>**__")
        .addField('^|Calculate Exponents', `\`^<Base> <Exponent>\``)
        .addField('add|Add Numbers', `\`add <First Number> <Second Number>\``)
        .addField('addrole|Add Roles to Users **(Special Permission Required: MANAGE_ROLES_OR_PERMISSIONS)**', `\`addrole <@user> <Role>\``)
        // .addField('afk|Set the Author of the message AFK', `\`afk\``)
        // .addField('afkexit|Set the Author of the message from AFK to online/active', `\`afkexit\``)
        .addField('anagram|Finds if Two Words are Anagrams', `\`anagram <Word1> <Word2>\``)
        .addField("avasteal|Steals someone's avatar", `\`avasteal <@user>\``)
        .addField('avatar|Gives You a Link to Your Avatar', `\`avatar\``)
        .addField('ban|Bans a mentioned member **(Special Permission Required: BAN_MEMBERS)**', `\`ban <@user>\``)
        .addField('binary|Converts something to binary', `\`binary <word/number>\``)
        .addField('botinfo|Displays info about the bot', `\`botinfo\``)
        .addField('ccdecode|Decodes a message using caesar cipher', `\`ccdecode <encoded message (repleace spaces with _)> <shift>\``)
        .addField('ccencode|Encodes a message using caesar cipher', `\`ccencode <message (repleace spaces with _)> <shift>\``)
        .addField('checklist|A checklist to check if PowerBot has the correct permissions to run.', `\`checklist\``)
        .addField('clean|Cleans reaction on messages by PowerBot', `\`clean <number of messages (atleast 2; which is one message)>\``)
        .addField('color|Returns a link to ColorHex', `\`color\``)
        .addField('commands|Brings up the commands page', `\`commands\``)
        .addField('date|Returns the Date', `\`date\``)
        .addField('div|Divide Numbers', `\`div <First Number> <Second Number>\``)
        .addField('dm|Directly Message a mentioned user', `\`dm <@user> <message>\``)
        .addField('embed|Sends a embeded version of a message', `\`embed <your message>\``)
        .addField('emojimap|Displays all custom uploaded emojis on a server', `\`emojimap\``)
        .addField('emojisearch|Search for the emoji that you input', `\`emojisearch <emoji name>\``)
        .addField('feedback|A command to send feedback.', `\`feedback\``)
        .addField("game|Find a user's current game", `\`game <@user>\``)
        .addField('google|Search Google for the user input', `\`google <quary>\``)
        .addField('help|Brings up the Help Page', `\`help\``)
        .addField("iduser|Get users username and discrim from a id", `\`iduser <id>\``)
        .addField('invite|Sends a link to invite the bot', `\`invite\``)
        .addField('iplookup|Get information about a ip address - IP addresses WILL NOT be logged or used for malicious purposes!', `\`iplookup <ip>\``)
        .addField('kick|Kick a User **(Special Permission Required: KICK_MEMBERS)**', `\`kick<@User> <Reason>\``)
        .addField('lockdown|Locks down the messaged channel **(Special Permission Required: MANAGE_CHANNELS)**', `\`lockdown <time; h/m/s>\``)
        .addField('unlock|Unlocks the lockdown in the current channel **(Special Permission Required: MANAGE_CHANNELS)**', `\`lockdown unlock\``)
        .addField('masspurge|Purge`\`x\``pages of messages **(Special Permission Required: MANAGE_MESSAGES)**', `\`masspurge <x pages>\``)
        .addField('morse|Converts words & sentences into morse code', `\`morse <letter/word/sentence>\``) //from here
        .addField('multi|Multiply Numbers', `\`multi <Multiplier> <Multiplicand>\``)
        .addField('mute|Mute the mentioned user **(Special Permission Required: MANAGE_ROLES_OR_PERMISSIONS)**', `\`mute <@user>\``)
        .addField('numrand|Number randomizer', `\`numrand <min range number> <max range number>\``)
        .addField('pika|Returns "boo"', `\`pika\``)
        .addField('ping|Returns "Pong" and the speed in ms', `\`ping\``)
        ////////////////////////////

        //add ccencode & ccdecode

        // .addField('dnd|Set the Author of the message in Do Not Disturb Mode', `\`dnd\``)
        // .addField('dndexit|Set the Author of the message from Do Not Disturb to active/online', `\`dndexit\``)

        
        
      
        
        
        //reload missing & not working
        .addField('removerole|Removes a Role From a User **(Special Permission Required: MANAGE_ROLES_OR_PERMISSIONS)**', `\`removerole <@User> <Role>\``)
        .addField('say|Echo what you said/sent', `\`say <Message You Want To Echo>\``)
    //  .addField("setgame|Sets PowerBot's game! **(Special Permissions Required: This Command Is Owner ONLY!)**", `\`setgame <Mood/Game>\``)
    //25
    message.channel.send({ embed: embed })

    const embed1 = new Discord.RichEmbed()
        .setColor('#ccff00') //change the color!
        //.setTitle("PowerBot Commands-Continued\n\n")
        // .addField("setstatus|Sets PowerBot's status! Online, Idle, DnD etc... **(Special Permission Required: This Command Is Owner ONLY!)**", `\`setstatus <Online/Idle/DnD/Invisible>\``)
        // .addField("spyon|Generate Invites to Servers That PowerBot Is In **(Special Permissions Required: This Command Is Owner ONLY!)**", `\`spyon <ServerName>\``)
        .addField('sqrt|Square Root the User Input Number', `\`sqrt <Square Root Number>\``)
        // .addField('startup|Displays Some Startup Information', `\`startup\``)
        .addField('subtract|Subtracts numbers', `\`subtract <First Number> <Second Number>\``)

        .addField('unban|Unbans a user by ID **(Special Permission Required: BAN_MEMBERS)**', `\`unban <user ID>\``)
        .addField('warn|Warns a mentioned user **(Special Permission Required: MANAGE_ROLES_OR_PERMISSIONS)**', `\`warn <@user>\``)
        
        .addField('unmute|Unmute the mentioned user **(Special Permission Required: MANAGE_ROLES_OR_PERMISSIONS)**', `\`unmute <@user>\``)
       
        .addField('stats|Displays status about the author of the message', `\`stats\``)
        .addField('userstats|Displays stats on the mentioned user', `\`userstats <@user>\``)

        


        .addField('yt|Search YouTube for videos, channels & playlists', `\`yt <video name/channel name/playlist name>\``)
        //wolfram WIP

        //  .addField('outer-reload|Reloads the specified file in the outer file structure **(Special Permission Required: This Command Is Owner ONLY!)**', `\`outer-reload <reload file name>\``)
        // .addField('reload|Reloads the specified file in the file structure **(Special Permission Required: This Command Is Owner ONLY!)**', `\`reload <module name>\``)

        .addField('prime|Finds the nth prime', `\`prime <n th>\``)
    message.channel.send({ embed: embed1 })

    const embed2 = new Discord.RichEmbed()
        .setColor('#ccff00')
        
        .addField(`rps|Rock paper scissor game`, `\`rps <your selection>\``)


        //  .addField('killall|A kill switch for PowerBot', `\`killall <password with no equal signs>\``)
        .addField('serverinv|Generates a invite for the current server', `\`serverinv\``)


        .addField('serverinfo|Get information about the current server', `\`serverinfo\``)
        .addField('userid|Get a mentioned users id from a mention', `\`userid <@user>\``)


        .addField("randword|Get a random word", `\`randword\``)

        //   .addField("synant|Find the synonyms & antonyms of a word", `\`synant <word>\``)
        .addField("triangle|To see if 3 values make a triangle", `\`triangle <1st value> <2nd value> <3rd value>\``)
        .addField("wolfram|Searches Wolfram Alpha for the user input", `\`wolfram <query>\``)
        // .addField('party|Its a party command... Type it and find out! ;)', `\`party\``)
    message.channel.send({ embed: embed2 })































};
