exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
    const config = require("./config.json");
    const embed1 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}iduser`)
        .addField("**Usage:**", `${config.prefix}iduser <user id>`)
        .addField("**Example:**", `${config.prefix}iduser 243222905188646912`)
        .addField("**Expected Result From Example:**", "AirFusion™#1243")
    if (args.join(' ') == "") return message.channel.send({embed: embed1})

    message.channel.send(client.users.get(args.join(' ')).username + "#" + client.users.get(args.join(' ')).discriminator);
}