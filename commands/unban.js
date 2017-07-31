exports.run = function (client, message, args, args2, cmd, config) {
//let reason = args.slice(1).join(' ');
    const Discord = require('discord.js');
    let user = args[0]
    let member = message.guild.member(user)
    if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return message.reply('You must be a moderator to unban people!').catch(console.error)
    if (!user) return message.reply('Please mention someone to ban!').catch(console.error)
   // if (reason.length < 1) return message.reply('Please supply a reason for the ban!').catch(console.error)
    if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) return message.reply('I do not have the correct permissions!').catch(console.error)
    if (user === message.author) return message.reply("You cannot unban yourself")
      //  if (message.guild.member(user).bannable) { //message.guild.member(member) && member.bannable
        const channelsendlol = new Discord.RichEmbed()
            .setColor('#4b0082') //change the color!!!
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .addField('Action:', "Unban")
            .addField('User:', user)
            .addField("Moderator:", message.author.username + "#" + message.author.discriminator)
            //.addField("Reason:", reason)
       message.channel.send({embed: channelsendlol})
        const okgoogle = new Discord.RichEmbed()
            .setColor('#4b0082') //change the color!!!
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .addField('Action:', "Unban")
            .addField('User:', user)
            .addField("Moderator:", message.author.username + "#" + message.author.discriminator)
            //.addField("Reason:", reason)
        //  .addField('Kicked User ID: ', `${message.mentions.users.first().id}`)


        client.channels.find("name", "modlog").send({embed: okgoogle})
        //message.channel.send("\n\n")
        setTimeout(function () {
           message.guild.unban(user)
        }, 1000);



    };
