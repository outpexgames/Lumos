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
    const embed = new Discord.RichEmbed()
    .setColor("36393E")
    .setDescription("Thank you for your feedback!")
    .addField('Feedback Form', 'https://goo.gl/forms/gbbHrNHP756uOZVG2')
    .setTimestamp()
message.channel.send({embed : embed})
 logger.log('info', `feedback command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)

}