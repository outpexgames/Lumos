function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
    const config = require("./config.json");
    var select = getRandomIntInclusive(1, 3);
    // if (select === 1) {
    const embed = new Discord.RichEmbed()
        .setColor('#ccff00') //change the color!
        .setTitle("PowerBot Commands\n\n")
        .addField("Prefix", `\`${config.prefix}\``)
        .addField("Caution", "__**Every Command Starts with the Prefix**__\n__**Every Thing below is in the format of:**__\n__**<Command>|<Command Description>(Special Notes)**__\n__**<Usage>**__")
        .addField('^|Calculate Exponents', `\`^<Base> <Exponent>\``)
        .addField('add|Add Numbers', `\`add <First Number> <Second Number>\``)
        .addField('addrole|Add Roles to Users **(Special Permission Required: MANAGE_ROLES_OR_PERMISSIONS)**', `\`addrole <@user> <Role>\``)
        .addField('afk|Set the Author of the message AFK', `\`afk\``)
        .addField('afkexit|Set the Author of the message from AFK to online/active', `\`afkexit\``)
        .addField('anagram|Finds if Two Words are Anagrams', `\`anagram<Word1> <Word2>\``)
        .addField("avasteal|Steals someone's avatar", `\`avasteal <@user>\``)
        .addField('avatar|Gives You a Link to Your Avatar', `\`avatar\``)
        //add ccencode & ccdecode
        .addField('color|Returns a link to ColorHex', `\`color\``)
        .addField('commands|Brings Up This Page', `\`commands\``)
        .addField('date|Returns the Date', `\`date\``)
        .addField('div|Divide Numbers', `\`div <First Number> <Second Number>\``)
        .addField('dnd|Set the Author of the message in Do Not Disturb Mode', `\`dnd\``)
        .addField('dndexit|Set the Author of the message from Do Not Disturb to active/online', `\`dndexit\``)
        .addField('help|Brings up the Help Page', `\`help\``)
        .addField('kick|Kick a User **(Special Permission Required: KICK_MEMBERS)**', `\`kick<@User> <Reason>\``)
        .addField('masspurge|Purge`\`x\``pages of messages', `\`masspurge<x pages>\``)
        .addField('multi|Multiply Numbers', `\`multi <First Number> <Second Number>\``)
        .addField('pika|Returns "boo"', `\`pika\``)
        .addField('ping|Returns "Pong" and the speed in ms', `\`ping\``)
        //reload missing & not working
        .addField('removerole|Removes a Role From a User **(Special Permission Required: MANAGE_ROLES_OR_PERMISSIONS)**', `\`removerole <@User> <Role>\``)
        .addField('say|Echo what you said/sent', `\`say <Message You Want To Echo>\``)
        .addField("setgame|Sets PowerBot's game! **(Special Permissions Required: This Command Is Owner ONLY!)**", `\`setgame <Mood/Game>\``)
    //25
    message.channel.sendEmbed(embed, {
        disableEveryone: true
    })
    const embed1 = new Discord.RichEmbed()
        .setColor('#ccff00') //change the color!
        //.setTitle("PowerBot Commands-Continued\n\n")
        .addField("setstatus|Sets PowerBot's status! Online, Idle, DnD etc... **(Special Permission Required: This Command Is Owner ONLY!)**", `\`setstatus <Online/Idle/DnD/Invisible>\``)
        .addField("spyon|Generate Invites to Servers That PowerBot Is In **(Special Permissions Required: This Command Is Owner ONLY!)**", `\`spyon <ServerName>\``)
        .addField('sqrt|Square Root the User Input Number', `\`sqrt <Square Root Number>\``)
        .addField('startup|Displays Some Startup Information', `\`startup\``)
        .addField('subtract|Subtracts numbers', `\`subtract <First Number> <Second Number>\``)
   
    message.channel.sendEmbed(embed1, {
        disableEveryone: true
    })

    //   }
};