const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
    const config = require("./config.json");
    const embed1 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}emotclean`)
        .addField("**Usage:**", `${config.prefix}emotclean <number | at least 2>`)
        .addField("**Example:**", `${config.prefix}emotclean 2`)
        .addField("**Expected Result From Example:**", "Shoud clean the reactions of 1 message of the bot.")
    if (args.join(' ') == "") return message.channel.send({ embed: embed1 })
    message.channel.fetchMessages({ limit: parseInt(args[0], 10) }).then(messagelog => {
        message.edit(`Clearing Reactions from this channel for ${args[0]} messages...`).then(setTimeout(message.delete.bind(message), 2000));
        messagelog.forEach(message => {
            message.clearReactions();

        });
    });
    logger.log('info', `Emotclean command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()}`)    
    
}