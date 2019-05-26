const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    var guild = message.guild;
    logger.log('info', `Ban command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
    let reason = args.slice(1).join(' ');
    const Discord = require('discord.js');
    var isnum = /^\d+$/.test(args[0]);
    let user;
    if (message.mentions.users.size < 1 && isnum === true) {
        user = args[0]
        console.log(user)
    }
    else if (message.mentions.users.size < 1 && isnum === false) {
        message.reply("Mention someone to ban or provide an ID to ban")
        console.log(user)
    }
    else if (message.mentions.users.size >= 1 && isnum === false) {
        user = message.mentions.users.first()
        console.log(user)
    }
    else if (message.mentions.users.size >= 1 && isnum === true) {
        message.reply("Mention someone to ban or provide an ID to ban")
        console.log(user)
    }
    console.log(user)
    console.log(args[0])
    let member = message.guild.member(user)

    const config = require("../config.json");
    const embed = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}ban`)
        .addField("**Usage:**", `${config.prefix}ban <@username> <reason>`)
        .addField("**Example:**", `${config.prefix}ban @AirFusion STAPPP!!!! >.<`)
        .addField("**Expected Result From Example:**", "Specified User Should Be Banned; Ban Log Should Be Sent To Channel #modlog")
    if (message.mentions.users.size < 1 && reason.length < 1) return message.channel.send({ embed: embed })
    if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return message.reply('You must be a moderator to ban people!').catch(console.error)
    if (reason.length < 1) return message.reply('Please supply a reason for the ban!').catch(console.error)
    if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) return message.reply('I do not have the correct permissions!').catch(console.error)
    if (user === message.author) return message.reply("You cannot ban yourself")



    if (isnum === false) {
        if (message.guild.member(user).bannable) {
            const channelsendlol = new Discord.RichEmbed()//send to current channel
                .setColor('#ff0000')
                .setTimestamp()
                .setThumbnail(user.avatarURL)
                .addField('Action:', "Ban[Mention]")
                .addField('User:', user.username + '#' + user.discriminator)
                .addField("User ID:", user.id)
                .addField("Moderator:", message.author.username + "#" + message.author.discriminator)
                .addField("Reason:", reason)
                .addField("Server:", message.guild)

            const okgoogle = new Discord.RichEmbed()//modlog sending
                .setColor('#ff0000')
                .setTimestamp()
                .setThumbnail(user.avatarURL)
                .addField('Action:', "Ban[Mention]")
                .addField('User:', user.username + '#' + user.discriminator)
                .addField("User ID:", user.id)
                .addField("Moderator:", message.author.username + "#" + message.author.discriminator)
                .addField("Reason:", reason)

            message.channel.send({ embed: okgoogle });
            user.send({ embed: channelsendlol })
            setTimeout(function () {
                message.guild.ban(user)
            }, 1000);
            guild.channels.find(val1 => val1.name === "modlog").send({ embed: okgoogle }).catch(e);

        }
        else {
            message.reply(":x: I can not ban " + user)
        }

    } else if (isnum === true) {
        const userSend = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(client.users.get(user).avatarURL)
            .addField('Action:', "Ban[ID]")
            .addField('User:', client.users.get(user).username + '#' + client.users.get(user).discriminator)
            .addField("User ID:", user)
            .addField("Moderator:", message.author.username + "#" + message.author.discriminator)
            .addField("Reason:", reason)
            .addField("Server:", message.guild)
            .setTitle(`This message is a notice, it does not signal a final ban has been made. It just signals that someone tried to ban you`)
        client.users.get(user).send({ embed: userSend }).catch(err => console.error(err))

        message.guild.ban(user)
            .then((User) => {



                const idBanmodlog = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setThumbnail(client.users.get(user).avatarURL)
                    .addField('Action:', "Ban[ID]")
                    .addField('User:', client.users.get(user).username + '#' + client.users.get(user).discriminator)
                    .addField("User ID:", user)
                    .addField("Moderator:", message.author.username + "#" + message.author.discriminator)
                    .addField("Reason:", reason)
                message.channel.send({ embed: idBanmodlog });
                client.users.get(user).send({ embed: userSend }).catch(err => console.error(err))
                guild.channels.find(val => val.name === "modlog").send({ embed: idBanmodlog }).catch(error => console.error(error));
            })
            .catch((err) => {
                console.log(err)
                message.reply(":x: I can not ban " + user)
            })

    }

};
