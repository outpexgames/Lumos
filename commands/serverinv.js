exports.run = function (client, message, args, args2, cmd) {
    message.guild.defaultChannel.createInvite({ maxAge: 300 }).then(inv => message.channel.send(inv.url ? inv.url : "discord.gg/" + inv.code))
}