exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
    const config = require("./config.json");
    const embed1 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}embed`)
        .addField("**Usage:**", `${config.prefix}embed <text>`)
        .addField("**Example:**", `${config.prefix}embed hello`)
        .addField("**Expected Result From Example:**", "Embed message with message author info & message.")
    if (args.join(' ') == "") return message.channel.send({embed: embed1})
    const embed = new Discord.RichEmbed()
        .setColor("#3f00ff")
        .setAuthor("Author: " + message.author.username + "\n")
        .setFooter("ID: " + message.author.id)
        .addField("Message:", args.join(' '))
    message.channel.send({ embed: embed })
}