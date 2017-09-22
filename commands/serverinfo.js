exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
    const config = require("./config.json");
    const embed = new Discord.RichEmbed()
        .setColor('#7d5bbe')
        .setTitle(message.guild.name + ` Server Stats`)
        .addField('📄 Channels', message.guild.channels.size, true)
        .addField('🏠 Default Channel', message.guild.defaultChannel, true)
        .addField(':man: Users', message.guild.memberCount, true)
        .addField(':date: Guild Created At', message.guild.createdAt, true)
        .addField(":globe_with_meridians: Server Region", message.guild.region, true)
        .addField(`:keyboard: AFK Channel ID `, message.guild.afkChannelID, true)
        .addField(`:keyboard: AFK Channel Timeout`, message.guild.afkTimeout + " seconds", true)
        .addField(`:frame_photo: Server Icon`, message.guild.iconURL, true)
        .addField(`:id: Guild ID`, message.guild.id, true)
        .addField(`:man_in_tuxedo: Server Owner`, message.guild.owner, true)
        .addField(`:man_in_tuxedo: Server Owner ID`, message.guild.ownerID, true)
        .addField(`:closed_lock_with_key: Server Verification Level`, message.guild.verificationLevel, true)
        .addField(`:joystick: Roles Size`, message.guild.roles.size, true)


    message.channel.send({ embed: embed })
    // Enable this if you want server roles to be printed message.channel.send("Roles List:\n" + message.guild.roles.map(e => e.toString()).join(" "), { code: 'js' })
    message.guild.defaultChannel.createInvite({ maxAge: 300 }).then(inv => message.channel.send(inv.url ? inv.url : "discord.gg/" + inv.code))
}