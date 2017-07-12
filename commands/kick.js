 exports.run = function (client, message, args, args2, cmd, config) {
let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first()
        let member = message.guild.member(user)
        if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) return message.reply('You must be a moderator to kick people!').catch(console.error)
        if (message.mentions.users.size < 1) return message.reply('Please mention someone to kick!').catch(console.error)
        if (reason.length < 1) return message.reply('Please supply a reason for the kick!').catch(console.error)
        if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('I do not have the correct permissions!').catch(console.error)
        if (message.guild.member(member) && member.kickable) {
            message.channel.send(`**__${member} was kicked from ${message.guild.name}.__**\n\n**Kicked by:** ` + message.author.username + "#" + message.author.discriminator + '\n\n**Reason:** *' + reason + '*' + '\n\n**Date:** *' + Date() + '*');
            client.channels.find("name", "modlog").sendMessage(`**__${member} was kicked from ${message.guild.name}.__**\n\n**Kicked by:** ` + message.author.username + "#" + message.author.discriminator + '\n\n**Reason:** *' + reason + '*' + '\n\n**Date:** *' + Date() + '*\n\n');
            //message.channel.send("\n\n")
            setTimeout(function () {
                message.guild.member(user).kick();
            }, 1000);
          


        }
        else {
            message.reply("This user doesn't exist in the server!")
        }
 };