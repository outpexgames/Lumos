const ms = require('ms');

exports.run = function (client, message, args, args2, cmd, config) {
    const Discord = require('discord.js');
    let modlog = client.channels.find("name", "modlog")
    if (!message.guild.member(message.author).hasPermission('MANAGE_CHANNELS')) return message.reply('Insufficant Permissions').catch(console.error)
    if (!client.lockit) client.lockit = [];
    let time = args.join(' ');
    let validUnlocks = ['release', 'unlock'];
    if (!time) return message.reply('You must set a duration for the lockdown in either hours, minutes or seconds');
    const embed = new Discord.RichEmbed()
        .setColor('#2D7FFF') //change the color!!!
        .setTimestamp()
        .setThumbnail(message.author.avatarURL)
        .addField('Action:', "Lockdown")
        .addField('Duration/Time:', time)
        .addField("Moderator:", message.author.username + "#" + message.author.discriminator)

    client.channels.get(modlog.id).sendEmbed(embed, {
        disableEveryone: true
    });
    if (validUnlocks.includes(time)) {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
        }).then(() => {
            message.channel.send('Lockdown lifted.');
            clearTimeout(client.lockit[message.channel.id]);
            delete client.lockit[message.channel.id];
        }).catch(error => {
            console.log(error);
        });
    } else {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() => {
            message.channel.send(`Channel locked down for ${ms(ms(time), { long: true })}`).then(() => {

                client.lockit[message.channel.id] = setTimeout(() => {
                    message.channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: null
                    }).then(message.channel.send('Lockdown lifted.')).catch(console.error);
                    delete client.lockit[message.channel.id];
                }, ms(time));

            }).catch(error => {
                console.log(error);
            });
        });
    }
};
