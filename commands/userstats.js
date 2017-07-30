exports.run = function (client, message, args, args2, cmd) {
     const Discord = require('discord.js');
    
let user = message.mentions.users.first()
        let game = ''
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
            //.setDescription('do `pls serverinfo` to see detailed info about the server')
            .addField('Discriminator: ', user.discriminator)
            .addField('Status', user.presence.status, true)
            .addField('Playing', game, true)
            //.addField('Joined Server', message.mentions.users.first().joinedAt)
            .addField('Created Account', user.createdAt)
        //.addField('Roles', message.member.roles.size > 0 ? message.member.roles.map(d => d.name).join(', ') : 'None')

        message.channel.sendEmbed(userInfo, {
            disableEveryone: true
        })
};