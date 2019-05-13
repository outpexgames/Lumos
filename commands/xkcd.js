const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})

exports.run = function (client, message, args, args2, cmd) {
    var xkcd = require('xkcd');
    const Discord = require('discord.js')
    const config = require("../config.json");
    var guild = message.guild;
    const xkcdData = new Discord.RichEmbed()
    const xkcdData1 = new Discord.RichEmbed()
    if (args.join(' ') === '') {
        xkcd(function (data) {
            xkcdData.setTitle(`Current XKCD #${data.num}`)
            xkcdData.setImage(data.img)
            xkcdData.setColor("36393E")

            xkcdData.addField('Title', data.title)
            xkcdData.addField('Year', data.year)
            xkcdData.addField('Link', `https://xkcd.com/${data.num}`)
            xkcdData.setFooter(`Get a specific XKCD, do ${config.prefix}xkcd <xkcd number>`)
            message.channel.send({ embed: xkcdData })
        });

    } else {


        xkcd(args.join(' '), function (data) {
            xkcdData1.setTitle(`Current XKCD #${data.num}`)
            xkcdData1.setImage(data.img)
            xkcdData1.setColor("36393E")

            xkcdData1.addField('Title', data.title)
            xkcdData1.addField('Year', data.year)
            xkcdData1.addField('Link', `https://xkcd.com/${data.num}`)
            xkcdData1.setFooter(`Get a specific XKCD, do ${config.prefix}xkcd <xkcd number>`)
            message.channel.send({ embed: xkcdData1 })
        });
    }
    logger.log('info', `xkcd command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
}