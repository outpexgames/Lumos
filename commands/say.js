const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
    const config = require("../config.json");
    var guild = message.guild;
    let lastWord = args.join(' ').split(' ').splice(-1);
    let msg = args.join(' ').slice(0, args.join(' ').indexOf(lastWord))
    let loop = args.join(' ').slice(args.join(' ').indexOf(lastWord))
    const embed19 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}say`)
        .addField("**Usage:**", `${config.prefix}say <text> <times to say - leave blank for just once>`)
        .addField("**Example:**", `${config.prefix}say hello!`)
        .addField("**Expected Result From Example:**", "hello!")
    if (args.join(' ') == "") return message.channel.send({ embed: embed19 })
    // console.log(loop)
    // console.log(msg)
    if (!msg) {
        message.channel.send(args.join(' '));
        message.delete();
    }
    else if (loop <= 15) {
        message.delete();
        for (var i = 0; i < loop; i++) {
            message.channel.send(msg)
        }
    }
    else if (loop > 15) {
        return message.reply("Too big, try a smaller number!")
    }
    else {
        message.reply("Command Execution Failed")
    }

    logger.log('info', `Say command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)

};