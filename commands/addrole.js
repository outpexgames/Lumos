const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    if (message.guild.member(message.author).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) { //roles.has is false for addroel & removerole
        const Discord = require('discord.js');
        const config = require("./config.json");
        const embed = new Discord.RichEmbed()
            .setColor("#f0ffff")
            .setDescription("**Command: **" + `${config.prefix}addrole`)
            .addField("**Usage:**", `${config.prefix}addrole <@username> <Role>`)
            .addField("**Example:**", `${config.prefix}addrole @AirFusion Owner`)
            .addField("**Expected Result From Example:**", "AirFusion should have role Owner")
        let member = message.guild.member(message.mentions.users.first());
        let role = message.guild.roles.find("name", args2.join(' '));
        if (!member || !role) return message.channel.send({ embed: embed })
        message.channel.send(`Role ${role} has been added to ${member} `)
        member.addRole(role).catch(console.error);
    }
    else {
        message.channel.send("You Do Not Have the Permission `MANAGE_ROLES_OR_PERMISSIONS`");
    }
    logger.log('info', `Addrole command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()}`)    
};