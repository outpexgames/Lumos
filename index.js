
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const path = require('path')
const config = require("./config.json");
const chalk = require('chalk');
var YouTube = require('youtube-node');
var google = require('google')
var rand = getRandomIntInclusive(1, 100);
var base64url = require('base64-url');
const werd = require('werd')
const randomWord = require('random-word');
const ipInfo = require("ipinfo");
const winston = require('winston')
const filter = require('leo-profanity')
filter.add(config.profanity)
const os = require("os")
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'log.txt' })
    ]
})
var youTube = new YouTube();
const youtubeKey = config.yt;
youTube.setKey(youtubeKey)
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./');
const embed = new Discord.RichEmbed()
var pastebin = require('./node_modules/pastebin/src/pastebin.js')(config.pastebin);
const { binary } = require('./util.js')
// var wolfram = require('wolfram').createClient(config.wolfram)
var Wolfram = require('node-wolfram')

require('./util/eventLoader')(client);

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
client.on('guildCreate', (guild) => {
    console.log(chalk.white(`Joined guild ${guild.name} ID: ${guild.id}  Owner ID: ${guild.ownerID}`)) //Owner: ${guild.owner.user.tag}
    if (config.createMuteRoleUponJoin) {
        guild.createRole({
            name: `Mute`,
            color: 'BLACK',
            position: 1,
            hoist: false,
            mentionable: false,
            permissions: 0,

        }).catch(e => console.error(e))
    }
})
client.on('guildDelete', (guild) => {
    console.log(chalk.white(`Left/Kicked from guild ${guild.name} ID: ${guild.id}  Owner ID: ${guild.ownerID}`))
});

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
    var guild = message.guild;

    // if (command === "checklist") {
    //     logger.log('info', `checklist command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()} Guild: ${guild}`)
    //     const embed100 = new Discord.RichEmbed()
    //         .setTitle("If a role is true, means you have the role setup correctly, if it is false, then there is something wrong with the role.")
    //         .setColor('#ff0000')
    //         .setFooter(config.name + "CheckList")


    //     let powerbotperm = client.guilds.get(message.guild.id).roles.find("name", "PowerBot")

    //     embed100.addField("PowerBot ADMINISTRATOR Permissions: ", powerbotperm.hasPermission("ADMINISTRATOR"))

    //     let muteRole = client.guilds.get(message.guild.id).roles.find("name", "Mute")
    //     let mute = true;
    //     if (!muteRole) mute = false;
    //     embed100.addField("PowerBot Mute Role (role required for mute command to function): ", mute)
    //     message.channel.send({ embed: embed100 });

    // }

    if (command === "prefix") {
        if (message.author.id === config.owner) {
            config.prefix = args.join(' ');
            fs.writeFile('./config.json', JSON.stringify(config, null, 2), function (err) {
                if (err) return console.error(err);
                // console.log(JSON.stringify(config));
                // console.log('writing to ' + './config.json');
                message.channel.send(`Prefix Successfully Changed to ${config.prefix}.`)
            });
        } else {
            message.reply("Only the bot owner can change the prefix.")
        }

    }

    if (command === "wolfram") {
        const embed = new Discord.RichEmbed()
            .setColor("#f0ffff")
            .setDescription("**Command: **" + `${config.prefix}wolfram`)
            .addField("**Usage:**", `${config.prefix}wolfram <query>`)
            .addField("**Example:**", `${config.prefix}wolfram 1+2`)
            .addField("**Expected Result From Example:**", "Should return a lot of information about 1+2 - May be quite spammy...")
        if (!args.join(" ")) return message.channel.send({ embed: embed })

        wolfram = new Wolfram(config.wolfram)

        wolfram.query(args.join(' '), function (error, result) {
            if (error) {
                console.log(error);
                message.edit("Couldn't talk to Wolfram Alpha :(")
            } else {
                console.log(JSON.stringify(result));
                var response = "";
                if (result.queryresult.$.success == "true") {
                    message.delete();
                    if (result.queryresult.hasOwnProperty("warnings")) {
                        for (var i in result.queryresult.warnings) {
                            for (var j in result.queryresult.warnings[i]) {
                                if (j != "$") {
                                    try {
                                        message.channel.send(result.queryresult.warnings[i][j][0].$.text);
                                    } catch (e) {
                                        console.log("WolframAlpha: failed displaying warning:\n" + e.stack());
                                    }
                                }
                            }
                        }
                    }
                    if (result.queryresult.hasOwnProperty("assumptions")) {
                        for (var i in result.queryresult.assumptions) {
                            for (var j in result.queryresult.assumptions[i]) {
                                if (j == "assumption") {
                                    try {
                                        message.channel.send(`Assuming ${result.queryresult.assumptions[i][j][0].$.word} is ${result.queryresult.assumptions[i][j][0].value[0].$.desc}`);
                                    } catch (e) {
                                        console.log("WolframAlpha: failed displaying assumption:\n" + e.stack());
                                    }
                                }
                            }
                        }
                    }
                    for (var a = 0; a < result.queryresult.pod.length; a++) {
                        var pod = result.queryresult.pod[a];
                        response += "**" + pod.$.title + "**:\n";
                        for (var b = 0; b < pod.subpod.length; b++) {
                            var subpod = pod.subpod[b];
                            //can also display the plain text, but the images are prettier
                            /*for(var c=0; c<subpod.plaintext.length; c++)
                            {
                                response += '\t'+subpod.plaintext[c];
                            }*/
                            for (var d = 0; d < subpod.img.length; d++) {
                                response += "\n" + subpod.img[d].$.src;
                                message.channel.send(response);
                                response = "";
                            }
                        }
                        response += "\n";
                    }
                } else {
                    if (result.queryresult.hasOwnProperty("didyoumeans")) {
                        var msg = [];
                        for (var i in result.queryresult.didyoumeans) {
                            for (var j in result.queryresult.didyoumeans[i].didyoumean) {
                                msg.push(result.queryresult.didyoumeans[i].didyoumean[j]._);
                            }
                        }
                        message.edit("Did you mean: " + msg.join(" "));
                    } else {
                        message.edit("No results from Wolfram Alpha :(");
                    }
                }
            }
        });



        logger.log('info', `Wolfram command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)

    }

    if (command === "test") {
        message.channel.send("Nothing here to see :p")
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

    if (command === "setmuterole") {
        if (message.author.id != config.owner) return message.reply("Invalid Permissions - Command is owner only.")
        else {
            // if (args.join(' ') != "true" || args.join(' ') != "false") return message.reply("Please enter \"true\" for yes, and \"false\" for no.")
            if (args.join(' ') === "true") {
                config.createMuteRoleUponJoin = true;
                fs.writeFile('./config.json', JSON.stringify(config, null, 2), function (err) {
                    if (err) return console.error(err);
                    // console.log(JSON.stringify(config));
                    // console.log('writing to ' + './config.json');
                    message.channel.send(`createMuteRoleUponJoin Successfully Changed to ${config.createMuteRoleUponJoin}.`)
                });
            }
            else if (args.join(' ') === "false") {
                config.createMuteRoleUponJoin = false;
                fs.writeFile('./config.json', JSON.stringify(config, null, 2), function (err) {
                    if (err) return console.error(err);
                    // console.log(JSON.stringify(config));
                    // console.log('writing to ' + './config.json');
                    message.channel.send(`createMuteRoleUponJoin Successfully Changed to ${config.createMuteRoleUponJoin}.`)
                });
            }
        }
    }

    if (command === "ownerhelp") {
        if (message.author.id === config.owner) { 
        const ownercmds = new Discord.RichEmbed()
            .setColor("#ffd700")
            .setDescription("If you are not the owner, this list is just to make you jealous... Hehe - Owner superpowers :p")
            .addField("Upload to Pastebin when eval", "cmd: setpastebineval")
            .addField("Set if bot creates mute role when joining a server", "cmd: setmuterole")
            .addField("upload result file when eval", "cmd: setuploadfileeval")
            .addField("Set bot game", "cmd: setgame <args>")
            .addField("Set bot status", "cmd: setstatus <args>")
            .addField("Get all of the servers bot is in", "cmd: getallserver")
            .addField("leaves the inputed server. Server name has to be exact.", "cmd: leaveserver <args>")
            .addField("broadcast a message, including update messages", "cmd: broadcast <message/args>")
            .addField("get log", "cmd: getlog")
            .addField("Emergency STOP, incase things get out of control", "cmd: killall")
            .addField("good old eval, evals code from discord chatbox", "cmd: eval <ya code m8 :p>")
            .addField("change the bot's prefix... For trolling purposes only LOL", "cmd: prefix <new prefix which no one will know>")
            .addField("spyon servers by gening invites", "cmd:spyon <server name>")
            .addField("get all loaded user info", "cmd: alluserinfo")

        message.channel.send({ embed: ownercmds })
        }
        logger.log('info', `ownerhelp command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)

    }
    if (command === "setpastebineval") {
        if (message.author.id != config.owner) return message.reply("Invalid Permissions - Command is owner only.")
        else {
            // if (args.join(' ') != "true" || args.join(' ') != "false") return message.reply("Please enter \"true\" for yes, and \"false\" for no.")
            if (args.join(' ') === "true") {
                config.uploadtoPastebinEval = true;
                fs.writeFile('./config.json', JSON.stringify(config, null, 2), function (err) {
                    if (err) return console.error(err);
                    // console.log(JSON.stringify(config));
                    // console.log('writing to ' + './config.json');
                    message.channel.send(`uploadtoPastebinEval Successfully Changed to ${config.createMuteRoleUponJoin}.`)
                });
            }
            else if (args.join(' ') === "false") {
                config.uploadtoPastebinEval = false;
                fs.writeFile('./config.json', JSON.stringify(config, null, 2), function (err) {
                    if (err) return console.error(err);
                    // console.log(JSON.stringify(config));
                    // console.log('writing to ' + './config.json');
                    message.channel.send(`uploadtoPastebinEval Successfully Changed to ${config.createMuteRoleUponJoin}.`)
                });
            }
        }
    }

    if (command === "setuploadfileeval") {
        if (message.author.id != config.owner) return message.reply("Invalid Permissions - Command is owner only.")
        else {
            // if (args.join(' ') != "true" || args.join(' ') != "false") return message.reply("Please enter \"true\" for yes, and \"false\" for no.")
            if (args.join(' ') === "true") {
                config.uploadtoFileEval = true;
                fs.writeFile('./config.json', JSON.stringify(config, null, 2), function (err) {
                    if (err) return console.error(err);
                    // console.log(JSON.stringify(config));
                    // console.log('writing to ' + './config.json');
                    message.channel.send(`uploadtoFileEval Successfully Changed to ${config.uploadtoFileEval}.`)
                });
            }
            else if (args.join(' ') === "false") {
                config.uploadtoFileEval = false;
                fs.writeFile('./config.json', JSON.stringify(config, null, 2), function (err) {
                    if (err) return console.error(err);
                    // console.log(JSON.stringify(config));
                    // console.log('writing to ' + './config.json');
                    message.channel.send(`uploadtoFileEval Successfully Changed to ${config.uploadtoFileEval}.`)
                });
            }
        }
    }


    if (command === "setgame") {
        const config = require("./config.json");
        var guild = message.guild;
        if (message.author.id === config.owner) {
            // client.user.setGame(args.join(' '));
            client.user.setActivity(args.join(' '))

        }
        else {
            message.channel.send("Insufficant Permissions!")
        }
        logger.log('info', `Setgame command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
    }

    if (command === "setstatus") {
        var guild = message.guild;
        if (message.author.id === config.owner) {
            client.user.setStatus(args.join(' '));
        }
        logger.log('info', `Setstatus command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)

    }

    if (command === "getallserver") {
        if (message.author.id === config.owner) {
            let user = message.author;
            user.send(client.guilds.map(e => e.toString()).join(" "));
        }
        else {
            return message.channel.send("Insufficant Permissions");
        }
        logger.log('info', `getallserver command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()} Guild: ${guild}`)
    }

    if (command === "broadcast") {
        if (message.author.id === config.owner) {
            // var check1 = base64url.encode(rand.toString())
            // if (!args.join(' ')) {
            //     message.channel.send('Please get a password! It has been Directly Messaged to you!')
            //     message.author.send("Base 64 of " + rand)
            //     message.author.send("Then remove any equal signs(=) from the result!")
            // }
            // else if (args.join(' ') === check1) {
            function getDefaultChannel(guild) {
                // if(guild.channel.has(guild.id))
                // return guild.channels.get(guild.id)

                if (guild.channels.exists("name", "general"))
                    return guild.channels.find("name", "general");

                // Now we get into the heavy stuff: first channel in order where the bot can speak
                // hold on to your hats!
                return guild.channels
                    .filter(c => c.type === "text" &&
                        c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
                    .sort((a, b) => a.position - b.position ||
                        Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
                    .first();
            }
            client.guilds.map(e => getDefaultChannel(e).send(args.join(' ')))
            // let min = 5; // change min here (WIP)
            // let server = client.guilds.find("name", args.join(' '));
            // server.defaultChannel.send(`Hello, PowerBot will under go a system update in 5 minutes. Please prepare for at least 5-10 minutes of down time. Thank you for your understanding. Together we will make PowerBot better and better! ~AirFusion--Creator of PowerBot`)
            // }
        }
        else {
            return message.channel.send("Insufficant Permissions");
        }
        logger.log('info', `broadcast command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()} Guild: ${guild}`)

    }

    if (command === "leaveserver") {
        if (message.author.id === config.owner) {
            guild = client.guilds.find("name", args.join(' ')).leave();
        }
        else message.channel.send("Insufficant Permissions.")
    }
    if (command === "getlog") {
        if (message.author.id === config.owner) {
            let user = message.author;
            user.send({ files: ['log.txt'] })
        }
        else {
            message.reply("Insufficant Permissions")
        }
    }
    if (command === "killall") {
        message.author.send(`KILLALL COMMAND HAS BEEN ACTIVATED | ID: ${message.author.id} | Tag: ${message.author.tag} | Server: ${message.guild} `)
        if (message.author.id === config.owner) {
            var check = base64url.encode(rand.toString())
            if (!args.join(' ')) {
                message.channel.send('Please get a password! It has been Directly Messaged to you!')
                message.author.send("Base 64 of " + rand)
                message.author.send("Then remove any equal signs(=) from the result!")
            }
            else if (args.join(' ') === check) {
                message.channel.send("Success! View host console for more information. PowerBot shutting down...")
                console.log(chalk.green("PowerBot has been shutdown via Discord Chatbox."))
                console.log(chalk.green("Here are some Information:"))
                console.log(chalk.green(`Auth: ${message.author.username}#${message.author.discriminator} ID: ${message.author.id}`))
                console.log(chalk.green(`Timestamp: ${Date()}`))
                setTimeout(function () {
                    process.abort();
                }, 3000);
            }
            else {
                console.log(check)
                message.channel.send("Incorrect Password")
            }
        } else {
            message.channel.send("Insufficant Permissions")
        }
        logger.log('Information', `Killall command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()} Guild: ${guild}`)

    }

    if (command === "eval") {
        if (message.author.id === config.owner) {
            var x = Date.now();
            try {
                var jvs = args.join(" ");
                var done = eval(jvs);
                if (typeof done !== "string")
                    done = require("util").inspect(done);
                message.channel.send(":white_check_mark: **Output:**\n" + "```" + `${clean(done)}` + "```");
                localStorage.setItem('Eval-Results.json', clean(done));
                if (config.uploadtoFileEval) {
                    message.channel.send({ files: ['Eval-Results.json'] });
                }
                if (config.uploadtoPastebinEval) {
                    pastebin.new({ title: 'Eval Results', content: clean(done) }, function (err, ret) {
                        if (err)
                            message.channel.send(err);
                        else
                            message.channel.send(ret);
                    });
                }
                var y = Date.now();
                var noplz = y - x
                message.channel.send("Time used: " + noplz + " ms");
            }
            catch (e) {
                message.channel.send(":x: **Output:**\n" + `\`ERROR\` \`\`\`x1\n${clean(e)}\n\`\`\``);
                localStorage.setItem('Eval-Results.json', clean(e));
                if (config.uploadtoFileEval) {
                    message.channel.send({ files: ['Eval-Results.json'] });
                }
                if (config.uploadtoPastebinEval) {
                    pastebin.new({ title: 'Eval Results', content: clean(e) }, function (err, ret) {
                        if (err)
                            message.channel.send(err);
                        else
                            message.channel.send(ret);
                    });
                }
                var y = Date.now();
                var noplz = y - x
                message.channel.send("Time used: " + noplz + " ms");
            }
        }
        else {
            message.channel.send("Insufficant Permissions.")
        }
        logger.log('info', `eval command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()} Guild: ${guild}`)

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
// client.on("err", error => {
//     console.log(chalk.red(error.replace(token, "HIDDEN")));
// }); //Broken
client.addListener('error', function (e) {
    var error = e.error;
    console.log(chalk.red(error))
    console.error(error)
    console.log(error);
})

client.login(config.token);
