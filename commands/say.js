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
    const filter = require('leo-profanity')
    const embed19 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}say`)
        .addField("**Usage:**", `${config.prefix}say <text>`)
        .addField("**Example:**", `${config.prefix}say hello!`)
        .addField("**Expected Result From Example:**", "hello!")
    if (args.join(' ') == "") return message.channel.send({ embed: embed19 })
    message.delete()
    client.options.disableEveryone = true;
    message.channel.send(filter.clean(args.join(' ')))


    logger.log('info', `Say command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)

};