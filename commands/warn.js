exports.run = function (client, message, args, args2, cmd, config) {
    if (!message.guild.member(message.author).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('Insufficant Permissions').catch(console.error)
    const Discord = require('discord.js');
    let reason = args.slice(1).join(' ')
    let user = message.mentions.users.first()
    let modlog = client.channels.find("name", "modlog")
    if (!modlog) return message.reply("mod-log required")
    if (reason.length < 1) return message.reply("Reason Required")
    if (message.mentions.users.size < 1) return message.reply("You must mention someone to warn them.").catch(console.error)
    if (user === message.author) return message.reply("You cannot warn yourself")
    const embed = new Discord.RichEmbed()
        .setColor('#2D7FFF') //change the color!!!
        .setTimestamp()
        .setThumbnail(message.author.avatarURL)
        .addField('Action:', "Warning")
        .addField('User:', user.username + '#' + user.discriminator)
        .addField("User ID:", user.id)
        .addField("Moderator:", message.author.username + "#" + message.author.discriminator)
        .addField("Reason:", reason)
    client.channels.get(modlog.id).sendEmbed(embed, {
        disableEveryone: true
    });
    const embed1 = new Discord.RichEmbed()
        .setColor('#2D7FFF') //change the color!!!
        .setTimestamp()
        .setThumbnail(message.author.avatarURL)
        .addField('Action:', "Warning")
        .addField('User:', user.username + '#' + user.discriminator)
        .addField("User ID:", user.id)
        .addField("Moderator:", message.author.username + "#" + message.author.discriminator)
        .addField("Reason:", reason)
    message.channel.sendEmbed(embed1, {
        disableEveryone: true
    });
};