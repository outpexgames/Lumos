exports.run = function (client, message, args, args2, cmd, config) {
    let reason = args.slice(1).join(' ');
    const Discord = require('discord.js');
    let user = message.mentions.users.first()
    let member = message.guild.member(user)
    if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) return message.reply('You must be a moderator to kick people!').catch(console.error)
    if (message.mentions.users.size < 1) return message.reply('Please mention someone to kick!').catch(console.error)
    if (reason.length < 1) return message.reply('Please supply a reason for the kick!').catch(console.error)
    if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('I do not have the correct permissions!').catch(console.error)
    if (user === message.author) return message.reply("You cannot kick yourself")
        if (message.guild.member(member) && member.kickable) {
        const channelsendlol = new Discord.RichEmbed()
            .setColor('#2D7FFF') //change the color!!!
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .addField('Action:', "Kick")
            .addField('User:', user.username + '#' + user.discriminator)
            .addField("User ID:", user.id)
            .addField("Moderator:", message.author.username + "#" + message.author.discriminator)
            .addField("Reason:", reason)
            console.log(channelsendlol)
       message.channel.send({embed: channelsendlol})
            
        
        user.send('You have been kicked');
        const okgoogle = new Discord.RichEmbed()
            .setColor('#2D7FFF') //change the color!!!
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .addField('Action:', "Kick")
            .addField('User:', user.username + '#' + user.discriminator)
            .addField("User ID:", user.id)
            .addField("Moderator:", message.author.username + "#" + message.author.discriminator)
            .addField("Reason:", reason)
        //  .addField('Kicked User ID: ', `${message.mentions.users.first().id}`)

            console.log(okgoogle)
        client.channels.find("name", "modlog").send({embed: okgoogle})
        //message.channel.send("\n\n")
        setTimeout(function () {
            message.guild.member(user).kick();
        }, 1000);



    }
    else {
        message.reply("This user doesn't exist in the server!")
    }
};