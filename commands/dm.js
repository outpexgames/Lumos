exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
    let user = message.mentions.users.first()
    //  user.send(`You have a message from user: ${message.author.username} | ID: ${message.author.id}\nMessage: ${args2.join(' ')}`)
    const config = require("./config.json");
    const embed1 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}dm`)
        .addField("**Usage:**", `${config.prefix}dm <@username> <Your message>`)
        .addField("**Example:**", `${config.prefix}dm @AirFusion hello`)
        .addField("**Expected Result From Example:**", "Mentioned user should get a DM from the bot with the correct message & message in chat should be deleted.")
    if (!user || args2.join(' ') == "") return message.channel.send({embed: embed1})
    const embed = new Discord.RichEmbed()
        .setColor("#008000")
        .setTitle(`You Have a New Message From ${message.author.username}`)
        .setDescription("ID: " + message.author.id)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp()
        .addField("Message:", args2.join(' '))

    user.send({ embed: embed })
    message.delete(2)
}