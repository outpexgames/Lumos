const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd, res) {
    const Discord = require('discord.js');
    const config = require("../config.json");
    var guild = message.guild;
    const embed = new Discord.RichEmbed()
        .setColor("36393E")
        .setDescription("Thank you for voting! - Vote at the following websites:")
        .addField("Discord Bot List (discordbots.org)", `https://discordbots.org/bot/460610749283172353`)
        .addField("Discord Bot List (discordbotlist.com)", `https://discordbotlist.com/bots/460610749283172353`)
        .addField("Bots on Discord", "https://bots.ondiscord.xyz/bots/460610749283172353")
        .addField("Bots for Discord", "https://botsfordiscord.com/bots/460610749283172353")
    message.channel.send({embed: embed})
    logger.log('info', `vote command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
};