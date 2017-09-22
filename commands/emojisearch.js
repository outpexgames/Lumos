exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
    const config = require("./config.json");
    const embed1 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}emojisearch`)
        .addField("**Usage:**", `${config.prefix}emojisearch <name>`)
        .addField("**Example:**", `${config.prefix}embed smile`)
        .addField("**Expected Result From Example:**", "Shoud return the custom emoji in the server named smile.")
    if (args.join(' ') == "") return message.channel.send({ embed: embed1 })
    const search = client.emojis.find("name", args.join(' '));
    message.reply(`${search}`);
}