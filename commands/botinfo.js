function timeCon(time) {
        time = time * 1000
        let days = 0,
            hours = 0,
            minutes = 0,
            seconds = 0
        days = Math.floor(time / 86400000)
        time -= days * 86400000
        hours = Math.floor(time / 3600000)
        time -= hours * 3600000
        minutes = Math.floor(time / 60000)
        time -= minutes * 60000
        seconds = Math.floor(time / 1000)
        time -= seconds * 1000
        days = days > 9 ? days : "" + days
        hours = hours > 9 ? hours : "" + hours
        minutes = minutes > 9 ? minutes : "" + minutes
        seconds = seconds > 9 ? seconds : "" + seconds
        return (parseInt(days) > 0 ? days + " days " : " ") + (parseInt(hours) === 0 && parseInt(days) === 0 ? "" : hours + " hours ") + minutes + " minutes " + seconds + " seconds."
    }

exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
    const config = require("./config.json");
const embed = new Discord.RichEmbed()
            .setColor('#7d5bbe')
            .setTitle(client.user.username + " V: " + config.version + ` Stats`)
            .setDescription(client.user.username + ' has been awake for ' + timeCon(process.uptime()))
            .addField('🏠 Guilds', client.guilds.size, true)
            .addField('📄 Text Channels', client.channels.size, true)
            .addField('🤵 Users', client.users.size, true) //client.users.size
            // .addField('💾 Last Commit', jsonBody[0].commit.message, true)
            .addField('🐏 RAM Usage', `${((process.memoryUsage().heapUsed / 1024) / 1024).toFixed(2)} MB`, true)
            .addField('🏓 Ping', `${(client.ping).toFixed(0)} ms`, true)
        message.channel.sendEmbed(embed, {
            disableEveryone: true
        })
};