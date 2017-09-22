exports.run = function (client, message, args, args2, cmd, res) {
    const Discord = require('discord.js');
    const config = require("./config.json");
    const embed = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}^`)
        .addField("**Usage:**", `${config.prefix}^ <num base> <exponent value>`)
        .addField("**Example:**", `${config.prefix}^ 2 3`)
        .addField("**Expected Result From Example:**", "8")
    if (args2 == "" || args == "") return message.channel.send({ embed: embed });
    var res = args[0];
    var answer = Math.pow(res, args2.join(' '));
    message.channel.send(answer);
};