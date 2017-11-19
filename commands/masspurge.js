const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd1) {
    const config = require("./config.json");
    const Discord = require('discord.js');
    const embed1 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **"+ `${config.prefix}masspurge`)
        .addField("**Usage:**", `${config.prefix}masspurge <x page>`)
        .addField("**Example:**", `${config.prefix}masspurge 1`)
        .addField("**Expected Result From Example:**", "1 page of messages should be purged from current channel.")
        if (args.join(' ')=="") return message.channel.send({embed: embed1})
    if (message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) {
        let messagecount = parseInt(args2.join(' '));
        message.channel.fetchMessages({ limit: messagecount }).then(messages => message.channel.bulkDelete(messages));
    }
    else {
        message.reply('Insufficant Permissions').catch(console.error)
    }
    logger.log('info', `masspurge command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()}`)    
};