
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const path = require('path')
const config = require("./config.json");
const chalk = require('chalk');
const embed = new Discord.RichEmbed()
const { morse } = require('./util.js')
require('./util/eventLoader')(client);


//TODO: https://youtu.be/Znvxk14Tg6A
//TODO: https://youtu.be/8AiZBdcPKOM?t=29m10s
//TODO: https://youtu.be/zdQplH3fwbU?t=16m1s
//TODO: @ melmsie github, how did he do pls tts with speak of echos.
////https://youtu.be/qEDhVKFWoVg?t=18m21s
//https://youtu.be/1AjBVocSQhM?t=24m58s

var reload = (message, cmd) => {
    delete require.cache[require.resolve('./commands/' + cmd)];
    try {
        let cmdFile = require('./commands/' + cmd);
    } catch (error) {
        message.channel.sendMessage(`Problem loading ${cmd}: ${error}`).then(
            response => response.delete(1000).catch(error => console.log(error.stack))
        ).catch(error => console.log(error.stack));
    }
    message.channel.sendMessage(`${cmd} reload was a success!`).then(
        response => response.delete(1000).catch(error => console.log(error.stack))
    ).catch(error => console.log(error.stack));
};
exports.reload = reload;






client.on("message", message => {  //message handler starts here!
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);

    let args = message.content.split(" ").slice(1);

    let args2 = message.content.split(" ").slice(2);

    let cmd = args.join(' ');

    let cmd2 = args2.join(' ');
    var res = cmd.slice(0, 1)







    
    if (command === 'stats') {  
        // console.log(message.member)
        // console.log(message.mentions.users.first()) 
        // console.log(message.mentions.users.first().joinedAt)
        let game = ''
        if (message.author.presence.game === null) {
            game = 'Nothing'
        }
        else {
            game = message.author.presence.game.name
        }
        const userInfo = new Discord.RichEmbed()
            .setAuthor('User Info For ' + message.author.username)
            .setColor('#2D7FFF')
            .setThumbnail(message.author.avatarURL)
            //.setDescription('do `pls serverinfo` to see detailed info about the server')
            .addField('Discriminator: ', message.author.discriminator)
            .addField('Status', message.author.presence.status, true)
            .addField('Playing', game, true)
            .addField('Joined Server', message.member.joinedAt)
            .addField('Created Account', message.author.createdAt)
            .addField('Roles', message.member.roles.size > 0 ? message.member.roles.map(d => d.name).join(', ') : 'None')

        message.channel.sendEmbed(userInfo, {
            disableEveryone: true
        })
    }

    if (command === 'userstats') { 
        let user = message.mentions.users.first()
        let game = ''
        if (user.presence.game === null) {
            game = 'Nothing'
        }
        else {
            game = user.presence.game.name
        }
        const userInfo = new Discord.RichEmbed()
            .setAuthor('User Info For ' + user.username)
            .setColor('#2D7FFF')
            .setThumbnail(user.avatarURL)
            //.setDescription('do `pls serverinfo` to see detailed info about the server')
            .addField('Discriminator: ', user.discriminator)
            .addField('Status', user.presence.status, true)
            .addField('Playing', game, true)
            //.addField('Joined Server', message.mentions.users.first().joinedAt)
            .addField('Created Account', user.createdAt)
        //.addField('Roles', message.member.roles.size > 0 ? message.member.roles.map(d => d.name).join(', ') : 'None')

        message.channel.sendEmbed(userInfo, {
            disableEveryone: true
        })
    }


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

    if (command === "botinfo") {  
        const embed = new Discord.RichEmbed()
            .setColor('#7d5bbe')
            .setTitle(client.user.username + " V: " + config.version + ` Stats`)
            .setDescription(client.user.username + ' has been awake for ' + timeCon(process.uptime()))
            .addField('🏠 Guilds', client.guilds.size, true)
            .addField('📄 Text Channels', client.channels.size, true)
            .addField('🤵 Users', client.users.size,  true) //client.users.size
           // .addField('💾 Last Commit', jsonBody[0].commit.message, true)
            .addField('🐏 RAM Usage', `${((process.memoryUsage().heapUsed / 1024) / 1024).toFixed(2)} MB`, true)
            .addField('🏓 Ping', `${(client.ping).toFixed(0)} ms`, true)
        message.channel.sendEmbed(embed, {
            disableEveryone: true
        })
    }
     // added morse & super script
    if(command === "alluserinfo") {  //wip
        // if (message.author.id === "243222905188646912") {
            console.log(client.users)
            //message.member.roles.map(d => d.name).join(', ') : 'None'
        //     const embed = new Discord.RichEmbed()
        //     .setColor('#7d5bbe')
        //     .setTitle(client.user.username + " " + config.version + ` Stats`)
        //     .setDescription(client.user.username + ' has been awake for ' + timeCon(process.uptime()))
        //     .addField("client users", client.users)
        //      message.channel.sendEmbed(embed, {
        //     disableEveryone: true
        // })
            //console.log(client.users)
        //}
        // else {
        //     message.channel.sendMessage("Insufficant Perms")
        // }
    }

    if (command === 'morse') { 
        let morsed = morse(args.join(' ')) //if in exports.run, need to put morse const from line front
        if (morsed.length > 0) {
            message.channel.sendMessage("🍆 Means -")
            message.channel.sendMessage("😄 Means ·")
        } else if (morsed.length > 1500){  //can be caped @ 2000
            message.reply("Your message has been flaged for spam, therefore it won't send")
        } else {
            message.reply("Input cannot be empty :frowning:"); 
           
        }
    }

    if (command === "eval") {
        if (message.author.id === config.owner) {
            try {
                var jvs = args.join(" ");
                var done = eval(jvs);
                if (typeof done !== "string")
                    done = require("util").inspect(done);
                message.channel.sendCode("x1", clean(done));
            } catch (e) {
                message.channel.sendMessage(`\`ERROR\` \`\`\`x1\n${clean(e)}\n\`\`\``);
            }
        }
        else {
            message.channel.sendMessage("HEY! Stop trying to get into Fusion's computer!")
        }
    }

});  //message HANDLER ENDS HERE

function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/` /g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;

}




var token = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on("debug", error => {
    console.log(chalk.cyan(error.replace(token, "HIDDEN")));
});
client.on("warn", error => {
    console.log(chalk.yellow(error.replace(token, "HIDDEN")));
});
client.on("error", error => {
    console.log(chalk.red(error.replace(token, "HIDDEN")));
});



client.login(config.token);