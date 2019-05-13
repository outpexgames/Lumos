const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
    let user = args[0]
    let guild = message.guild
    logger.log('info', `Unban command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
    const config = require("../config.json");
    const embed19 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}unban`)
        .addField("**Usage:**", `${config.prefix}unban <id>`)
        .addField("**Example:**", `${config.prefix}unban 837463763483`)
        .addField("**Expected Result From Example:**", "User with specified id will be unbaned.")
    if (args.join(' ') == "") return message.channel.send({ embed: embed19 })
    if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return message.reply('You must be a moderator to unban people!').catch(console.error)
    if (!user) return message.reply('Please mention someone to unban!').catch(console.error)
    if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) return message.reply('I do not have the correct permissions!').catch(console.error)
    if (user === message.author) return message.reply("You cannot unban yourself")
    const channelsendlol = new Discord.RichEmbed()
        .setColor('#00008b')
        .setTimestamp()
        .setThumbnail(message.author.avatarURL)
        .addField('Action:', "Unban")
        .addField('User:', user)
        .addField("Moderator:", message.author.username + "#" + message.author.discriminator)

    const okgoogle = new Discord.RichEmbed()
        .setColor('#00008b')
        .setTimestamp()
        .setThumbnail(message.author.avatarURL)
        .addField('Action:', "Unban")
        .addField('User:', user)
        .addField("Moderator:", message.author.username + "#" + message.author.discriminator)

    setTimeout(function () {
        message.guild.unban(user).catch(err => console.error(err))
    }, 1000);
    message.channel.send({ embed: channelsendlol })
    guild.channels.find(val1 => val1.name === "modlog").send({ embed: okgoogle }).catch(err => console.error(err));


};
