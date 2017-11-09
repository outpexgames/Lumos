 function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})

 exports.run = function (client, message, args, args2, cmd) {
  const Discord = require('discord.js');
  const config = require("./config.json");
  var select = getRandomIntInclusive(1,3);
  if (select === 1) {
    const embed = new Discord.RichEmbed()
        .setColor('#ccff00')
        .setTitle("PowerBot Help\n")
        .addField('Prefix', `\`${config.prefix}\``)
        .addField('Example:', `\`${config.prefix}ping\``)
        .addField('Commands:', `Do \`${config.prefix}commands\` to see a full list of commands.`)
        // .addField('Github', `The repo for this bot can be found [here](https://github.com/melmsie/memedaddy).`)
        .addField('Support Server:', `Come [here](https://discord.gg/Zu9uHAU) to get help or just hang out.`)

    message.channel.send({embed: embed})
  }
    if (select === 2) {
    const embed = new Discord.RichEmbed()
        .setColor('#0072bb')
        .setTitle("PowerBot Help\n")
        .addField('Prefix:', `\`${config.prefix}\``)
        .addField('Example:', `\`${config.prefix}ping\``)
        .addField('Commands:', `Do \`${config.prefix}commands\` to see a full list of commands.`)
       // .addField('Github', `The repo for this bot can be found [here](https://github.com/melmsie/memedaddy).`)
        .addField('Support Server:', `Come [here](https://discord.gg/Zu9uHAU) to get help or just hang out.`)
    message.channel.send({embed: embed})
  }
    if (select === 3) {
    const embed = new Discord.RichEmbed()
        .setColor('#ff4f00')
        .setTitle("PowerBot Help\n")
        .addField('Prefix:', `\`${config.prefix}\``)
        .addField('Example:', `\`${config.prefix}ping\``)
        .addField('Commands:', `Do \`${config.prefix}commands\` to see a full list of commands.`)
        //.addField('Github', `The repo for this bot can be found [here](https://github.com/melmsie/memedaddy).`)
        .addField('Support Server:', `Come [here](https://discord.gg/Zu9uHAU) to get help or just hang out.`)

    message.channel.send({embed: embed})
  }
  logger.log('info', `Google command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()}`)    
  
 };
