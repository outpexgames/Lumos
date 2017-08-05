
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const path = require('path')
const config = require("./config.json");
const chalk = require('chalk');
var YouTube = require('youtube-node');
var google = require('google')
var youTube = new YouTube();
const youtubeKey = config.yt;
youTube.setKey(youtubeKey)
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./');
const embed = new Discord.RichEmbed()
var pastebin = require('./node_modules/pastebin/src/pastebin.js')(config.pastebin);
const { binary } = require('./util.js')
var wolfram = require('wolfram').createClient(config.wolfram)
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
        message.channel.send(`Problem loading ${cmd}: ${error}`).then(
            response => response.delete(1000).catch(error => console.log(error.stack))
        ).catch(error => console.log(error.stack));
    }
    message.channel.send(`${cmd} reload was a success!`).then(
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

    if (command === "outer-reload") {
        if (message.author.id === config.owner) {
            if (!args || args.size < 1) return message.reply("Must provide a command name to reload.");
            // the path is relative to the *current folder*, so just ./filename.js
            delete require.cache[require.resolve(`./${args[0]}.js`)];
            message.reply(`:white_check_mark: The command ${args[0]} has been reloaded`);
        }
        else {
            message.reply(":x: Insufficant Permissions!")
        }
    }

    if (command === "wolfram") { //WIP
        wolfram.query(args.join(' '), function (err, result) {
            if (err) throw err
            localStorage.setItem('Wolfram-Results.json', result);
            message.channel.send({ files: ['Wolfram-Results.json'] });
            message.channel.send("**Solution: **" + result)
            console.log(result)
        })
    }


    if (command === "eval") {
        if (message.author.id === config.owner) {
            var x = Date.now();
            //var y = 0;
            try {
                var jvs = args.join(" ");
                var done = eval(jvs);
                if (typeof done !== "string")
                    done = require("util").inspect(done);
                message.channel.send(":white_check_mark: **Output:**\n" + "```" + `${clean(done)}` + "```");
                localStorage.setItem('Eval-Results.json', clean(done));
                message.channel.send({ files: ['Eval-Results.json'] });
                pastebin.new({ title: 'Eval Results', content: clean(done) }, function (err, ret) {
                    if (err)
                        message.channel.send(err);
                    else
                        message.channel.send(ret);

                });
                var y = Date.now();
                var noplz = y - x
                message.channel.send("Time used: " + noplz + " ms");
            }

            catch (e) {
                message.channel.send(":x: **Output:**\n" + `\`ERROR\` \`\`\`x1\n${clean(e)}\n\`\`\``);
                localStorage.setItem('Eval-Results.json', clean(e));
                message.channel.send({ files: ['Eval-Results.json'] });
                pastebin.new({ title: 'Eval Results', content: clean(e) }, function (err, ret) {
                    if (err)
                        message.channel.send(err);
                    else
                        message.channel.send(ret);

                });
                var y = Date.now();
                var noplz = y - x
                message.channel.send("Time used: " + noplz + " ms");
            }
        }
        else {
            message.channel.send("HEY! Stop trying to get into Fusion's computer!")
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