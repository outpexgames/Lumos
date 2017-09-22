exports.run = function (client, message, args, args2, cmd, config) {
    if (message.guild.member(message.author).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
        const Discord = require('discord.js');
        const config = require("./config.json");
        const embed19 = new Discord.RichEmbed()
            .setColor("#f0ffff")
            .setDescription("**Command: **" + `${config.prefix}removerole`)
            .addField("**Usage:**", `${config.prefix}removerole <@username> <Role>`)
            .addField("**Example:**", `${config.prefix}removerole @AirFusion Owner`)
            .addField("**Expected Result From Example:**", "Specified role should be removed from mentioned user")
        if (args.join(' ') == "" && args2.join(" ") == "") return message.channel.send({ embed: embed19 })
        let member = message.guild.member(message.mentions.users.first());
        let role = message.guild.roles.find("name", args2.join(' '));
        if (member.id === message.author.id) return message.reply("You cannot remove a role you have")
        member.removeRole(role).catch(console.error);
        message.channel.send(`Role ${role} has been removed from ${member} `)
    }
    else {
        message.channel.send('You do not have the permission MANAGE_ROLES_OR_PERMISSIONS');
    }
};