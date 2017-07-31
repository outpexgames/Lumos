exports.run = function (client, message, args, args2, cmd, config) {
    if (!message.guild.member(message.author).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('Insufficant Permissions').catch(console.error)
    const Discord = require('discord.js');
    //let reason = args.slice(1).join(' ')
    let user = message.mentions.users.first()
    let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Mute')
    let modlog = client.channels.find("name", "modlog")
    if (!modlog) return message.reply("mod-log required")
    if (!muteRole) return message.reply("Mute Role required")
    if (message.mentions.users.size < 1) return message.reply("You must mention someone to mute them.").catch(console.error)
    //if (reason.length < 1) return message.reply("Reason Required")
    if (user === message.author) return message.reply("You cannot unmute yourself")
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply('Bot has insufficant Perms').catch(console.error)
    if (message.guild.member(user).roles.has(muteRole.id)) {
        message.guild.member(user).removeRole(muteRole);
    }

    const embed = new Discord.RichEmbed()
        .setColor('#ff4f00') //change the color!!!
        .setTimestamp()
        .setThumbnail(message.author.avatarURL)
        .addField('Action:', "UnMute")
        .addField('User:', user.username + '#' + user.discriminator)
        .addField("User ID:", user.id)
        .addField("Moderator:", message.author.username + "#" + message.author.discriminator)

    client.channels.get(modlog.id).send({embed: embed})

    const embed1 = new Discord.RichEmbed()
        .setColor('#ff4f00') //change the color!!!
        .setTimestamp()
        .setThumbnail(message.author.avatarURL)
        .addField('Action:', "UnMute")
        .addField('User:', user.username + '#' + user.discriminator)
        .addField("User ID:", user.id)
        .addField("Moderator:", message.author.username + "#" + message.author.discriminator)

    message.channel.send({embed: embed1})


};
