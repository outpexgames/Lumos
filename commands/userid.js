exports.run = function (client, message, args, args2, cmd) {
    let user = message.mentions.users.first();
    const Discord = require('discord.js');
    const config = require("./config.json");
    const embed19 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}userid`)
        .addField("**Usage:**", `${config.prefix}userid <@username>`)
        .addField("**Example:**", `${config.prefix}userid @AirFusion`)
        .addField("**Expected Result From Example:**", "<my id>")
    if (!user) {
        return message.channel.send({embed: embed19})
    }
    message.channel.send(user.id);
}