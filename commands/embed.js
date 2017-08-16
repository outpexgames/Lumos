exports.run = function (client, message, args, args2, cmd, config) {
    const Discord = require('discord.js');
    const embed = new Discord.RichEmbed()
        .setColor("#3f00ff")
        .setAuthor(message.author.username + "\n")
        .setFooter(message.author.id)
        .setDescription(args.join(' '))
    message.channel.send({ embed: embed })
}