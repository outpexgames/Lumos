const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    if (!message.guild.member(message.author).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('Insufficant Permissions').catch(console.error)
    var guild = message.guild;
    logger.log('info', `Mute command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
    const Discord = require('discord.js');
    const config = require("../config.json");
    let reason = args.slice(1).join(' ')
    let user = message.mentions.users.first()
    let member = message.guild.member(user)
    const embed19 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}mute`)
        .addField("**Usage:**", `${config.prefix}mute <@username> <reason>`)
        .addField("**Example:**", `${config.prefix}mute @AirFusion STAP SPAMMING >.<`)
        .addField("**Expected Result From Example:**", "Mentioned User Muted with Mute Role")
    if (args.join(' ') == "") return message.channel.send({ embed: embed19 })
    let muteRole = client.guilds.get(message.guild.id).roles.find(val => val.name === 'Mute')
    if (!muteRole) return message.reply("Mute Role required")
    if (message.mentions.users.size < 1) return message.reply("You must mention someone to mute them.").catch(console.error)
    if (reason.length < 1) return message.reply("Reason Required")
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply('Bot has insufficant Perms').catch(console.error)
    if (user === message.author) return message.reply("You cannot mute yourself")
    message.guild.member(user).addRole(muteRole).catch(err => console.error(err))

    const embed = new Discord.RichEmbed()
        .setColor('#ffbf00')
        .setTimestamp()
        .setThumbnail(user.avatarURL)
        .addField('Action:', "Mute")
        .addField('User:', user.username + '#' + user.discriminator)
        .addField("User ID:", user.id)
        .addField("Moderator:", message.author.username + "#" + message.author.discriminator)
        .addField("Reason:", reason)
        .addField("Server:", message.guild)


    const embed1 = new Discord.RichEmbed()
        .setColor('#ffbf00')
        .setTimestamp()
        .setThumbnail(user.avatarURL)
        .addField('Action:', "Mute")
        .addField('User:', user.username + '#' + user.discriminator)
        .addField("User ID:", user.id)
        .addField("Moderator:", message.author.username + "#" + message.author.discriminator)
        .addField("Reason:", reason)

    message.channel.send({ embed: embed1 })
    user.send({ embed: embed })
    guild.channels.find(val1 => val1.name === "modlog").send({ embed: embed1 }).catch(err => console.error(err));


};
