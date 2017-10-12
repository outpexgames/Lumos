exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js')
    const config = require("./config.json");
    const embed = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}div`)
        .addField("**Usage:**", `${config.prefix}div <dividend/first number> <divisor/second number>`)
        .addField("**Example:**", `${config.prefix}div 4 2`)
        .addField("**Expected Result From Example:**", "2")
    if (args.join(' ') == '') return message.channel.send({ embed: embed })
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce((p, c) => p / c);
    message.channel.send(total);

};