const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})

exports.run = function (client, message, args, args2, cmd) {
    var guild = message.guild;
    const Discord = require('discord.js');
    const config = require("../config.json");
    const embed = new Discord.RichEmbed()
        .setColor("36393E")
        .setDescription("Thank you for your feedback!")
        .setTitle(`There are two ways of giving feedback: 1. Filling out the following feedback form. 2. Doing the feedback command again with your feedback after it. ex: ${config.prefix}-feedback <your message>`)
        .addField('Feedback Form', 'https://goo.gl/forms/gbbHrNHP756uOZVG2')
        .setTimestamp()
    message.channel.send({ embed: embed })
    if (args.join(' ') !== "") {
        message.delete(2)
        message.reply("Feedback received from Discord Chatbox! Thank you for your feedback!")
        client.users.find(val1 => val1.id === config.owner).send(`New feedback from ${message.author.tag} from server: ${message.guild.name}. Message/Feedback: ${args.join(' ')}`)
    }
    logger.log('info', `feedback command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
}