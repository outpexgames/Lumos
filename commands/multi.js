exports.run = function (client, message, args, args2, cmd) {
    const config = require("./config.json");
    const Discord = require('discord.js');
    const embed1 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}multi`)
        .addField("**Usage:**", `${config.prefix}multi <Multiplier> <Multiplicand>`)
        .addField("**Example:**", `${config.prefix}multi 1 2`)
        .addField("**Expected Result From Example:**", "2")
    if (args.join(' ') == "") return message.channel.send({ embed: embed1 })
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce((p, c) => p * c);
    message.channel.send(total);
};