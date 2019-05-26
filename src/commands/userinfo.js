const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
    const config = require("../config.json");
    var guild = message.guild;
    let game = ''
    let user = message.mentions.users.first()
    if (message.author === user || !user) {
        if (message.author.presence.game === null) {
            game = 'Nothing'
        }
        else {
            game = message.author.presence.game.name
        }
        const userInfo = new Discord.RichEmbed()
            .setAuthor('User Info For ' + message.author.username)
            .setColor('#2D7FFF')
            .setThumbnail(message.author.avatarURL)
            .addField('Discriminator: ', message.author.discriminator)
            .addField('Status', message.author.presence.status, true)
            .addField('Playing', game, true)
            .addField('Joined Server', message.member.joinedAt)
            .addField('Created Account', message.author.createdAt)
            .addField('Roles', message.member.roles.size > 0 ? message.member.roles.map(d => d.name).join(', ') : 'None')
        message.channel.send({ embed: userInfo })
    }
    else {

        if (user.presence.game === null) {
            game = 'Nothing'
        }
        else {
            game = user.presence.game.name
        }
        const userInfo = new Discord.RichEmbed()
            .setAuthor('User Info For ' + user.username)
            .setColor('#2D7FFF')
            .setThumbnail(user.avatarURL)
            .addField('Discriminator: ', user.discriminator)
            .addField('Status', user.presence.status, true)
            .addField('Playing', game, true)
            .addField('Created Account', user.createdAt)

        message.channel.send({ embed: userInfo })
    }
    logger.log('info', `Userinfo command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)

};
