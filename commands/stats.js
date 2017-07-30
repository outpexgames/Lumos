exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
let game = ''
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
            //.setDescription('do `pls serverinfo` to see detailed info about the server')
            .addField('Discriminator: ', message.author.discriminator)
            .addField('Status', message.author.presence.status, true)
            .addField('Playing', game, true)
            .addField('Joined Server', message.member.joinedAt)
            .addField('Created Account', message.author.createdAt)
            .addField('Roles', message.member.roles.size > 0 ? message.member.roles.map(d => d.name).join(', ') : 'None')

        message.channel.sendEmbed(userInfo, {
            disableEveryone: true
        })
};