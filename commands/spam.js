// const winston = require('winston')
// var logger = new (winston.Logger)({
//     transports: [
//         new winston.transports.Console(),
//         new winston.transports.File({ filename: './log.txt' })
//     ]
// })
// exports.run = function (client, message, args, args2, cmd) {
//     const Discord = require('discord.js');
//     const config = require("../config.json");
//     var guild = message.guild;
//     let lastWord = args.join(' ').split(' ').splice(-1);
//     let msg = args.join(' ').slice(0, args.join(' ').indexOf(lastWord))
//     let loop = args.join(' ').slice(args.join(' ').indexOf(lastWord))
    
//     const embed19 = new Discord.RichEmbed()
//         .setColor("#f0ffff")
//         .setDescription("**Command: **" + `${config.prefix}spam - use at your own risk`)
//         .addField("**Usage:**", `${config.prefix}spam <text> <times>`)
//         .addField("**Example:**", `${config.prefix}spam Please don't do this 100`)
//         .addField("**Expected Result From Example:**", "Please don't do this should be spammed 100 times... (please don't do this, seriously...)")
//     if (args.join(' ') == "" || args2.join(" ") == "") return message.channel.send({ embed: embed19 })
//     if (loop > 15) return message.reply("Too big, try a smaller number!")
//     for (var i = 0; i < loop; i++) {
//         message.channel.send(msg)
//     }
//     logger.log('info', `Spam command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
// }