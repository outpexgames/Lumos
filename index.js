
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const path = require('path')
const config = require("./config.json");
const chalk = require('chalk');
const embed = new Discord.RichEmbed()
const { binary } = require('./util.js')
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

    // !!!added super script
    if (command === "alluserinfo") {  //wip
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