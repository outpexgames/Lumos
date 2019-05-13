/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Jim Fang. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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
var antispam = require("discord-anti-spam");
const Sentry = require('@sentry/node'); //Ln 15 & 16 are optional. Sentry Tracking
Sentry.init({ dsn: config.sentry });
const ipInfo = require("ipinfo");
const winston = require('winston')
var xkcd = require('xkcd');
const Sequelize = require('sequelize');
var Wolfram = require('node-wolfram')
require('./util/eventLoader')(client);
const filter = require('leo-profanity')
const { exec } = require("child_process");
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
const Enmap = require('enmap');
const Provider = require('enmap-sqlite');
const settings = new Enmap({ provider: new Provider({ name: "settings" }) });

const outputErr = (msg, stdData) => {
    let { stdout, stderr } = stdData;
    stderr = stderr ? ["`STDERR`", "```sh", client.clean(stderr.substring(0, 800)) || " ", "```"] : [];
    stdout = stdout ? ["`STDOUT`", "```sh", client.clean(stdout.substring(0, stderr ? stderr.length : 2046 - 40)) || " ", "```"] : [];
    let message = stdout.concat(stderr).join("\n").substring(0, 2000);
    message.edit(message);
};

const doExec = (cmd, opts = {}) => { // -exec func
    return new Promise((resolve, reject) => {
        exec(cmd, opts, (err, stdout, stderr) => {
            if (err) return reject({ stdout, stderr });
            resolve(stdout);
        });
    });
};

const defaultSettings = {
    welcome: true,
    welcomeChannel: "general"
}



function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

client.on('error', console.error);

client.on('guildCreate', async (guild) => {
    console.log(chalk.white(`Joined guild ${guild.name} ID: ${guild.id}  Owner ID: ${guild.ownerID} Size: ${guild.memberCount}`))
    logger.log('info', `Joined guild ${guild.name} ID: ${guild.id}  Owner ID: ${guild.ownerID} Size: ${guild.memberCount} Time: ${Date()}`)
    settings.set(guild.id, defaultSettings);
    logger.log('info', `Database SET`)
    if (config.createMuteRoleUponJoin) {
        guild.createRole({
            name: `Mute`,
            color: 'BLACK',
            position: 1,
            hoist: false,
            mentionable: false,
            permissions: 0,

        }).catch(e => console.error(e))
        logger.log('info', 'muterole created')
    }
})
client.on('guildDelete', async (guild) => {
    console.log(chalk.white(`Left/Kicked from guild ${guild.name} ID: ${guild.id}  Owner ID: ${guild.ownerID} Size: ${guild.memberCount}`))
    logger.log('info', `Left/Kicked from guild ${guild.name} ID: ${guild.id}  Owner ID: ${guild.ownerID} Size: ${guild.memberCount} Time ${Date()}`)
    settings.delete(guild.id);
    logger.log('info', 'Database DEL')
});

client.on('guildMemberAdd', async member => {
    let guild = member.guild;
    let welcomeMessages;
    let welcomeChanneles;
    try {
        welcomeMessages = settings.getProp(guild.id, "welcome");
        welcomeChanneles = settings.getProp(guild.id, "welcomeChannel");
    } catch (err) {
        console.log(err)
        if (err.indexOf(" does not exist in the enmap settings") != -1) {
            settings.set(guild.id, defaultSettings);
        }
    }
    welcomeMessages = settings.getProp(guild.id, "welcome");
    welcomeChanneles = settings.getProp(guild.id, "welcomeChannel");

    if (welcomeMessages) {
        if (member.user.bot) {
            try {
                client.guilds.find(t => t.id == member.guild.id).channels.find(t => t.name == welcomeChanneles).send(`A Wild Bot Has Appeared On The Server... \n The Bot's Name Is: ${member.user} OHHHHHHH... :/`)
            } catch (err) {
                console.log(err.name)
                if (err.name === "TypeError" && err.message === "Cannot read property 'send' of null" || err.name === "DiscordAPIError" && err.message === "Missing Permissions") { // or missing permissions
                    settings.setProp(member.guild.id, "welcomeChannel", getDefaultChannel(member.guild).name)
                    welcomeChanneles = settings.getProp(guild.id, "welcomeChannel");
                    client.guilds.find(t => t.id == member.guild.id).channels.find(t => t.name == welcomeChanneles).send(`A Wild Bot Has Appeared On The Server... \n The Bot's Name Is: ${member.user} OHHHHHHH... :/`)
                    message.reply("The channel you have set for the welcome messages is invalid, the welcome messages channel has been reset to the first channel. Please edit it if needed with the -setchannel command.")
                }
            }

            logger.log('info', `guildMemberAdd (new member join a guild-Bot) (presence update) triggered by ${member.user.tag} ID: ${member.user.id} Time: ${Date()} Guild: ${guild}`)
            console.log(`guildMemberAdd (new member join a guild-Bot) (presence update) triggered by ${member.user.tag} ID: ${member.user.id} Time: ${Date()} Guild: ${guild}`)
        }
        else {

            try {
                client.guilds.find(t => t.id == member.guild.id).channels.find(t => t.name == welcomeChanneles).send(`Welcome ${member.user} to ${guild.name}`)
            } catch (err) {
                console.log(err.name)
                if (err.name === "TypeError" && err.message === "Cannot read property 'send' of null" || err.name === "DiscordAPIError" && err.message === "Missing Permissions") { // or missing permissions
                    settings.setProp(member.guild.id, "welcomeChannel", getDefaultChannel(member.guild).name)
                    welcomeChanneles = settings.getProp(guild.id, "welcomeChannel");
                    client.guilds.find(t => t.id == member.guild.id).channels.find(t => t.name == welcomeChanneles).send(`Welcome ${member.user} to ${guild.name}`)
                    getDefaultChannel(member.guild).send("The channel you have set for the welcome messages is invalid, the welcome messages channel has been reset to the first channel. Please edit it if needed with the -setchannel command.")
                }
            }
            logger.log('info', `guildMemberAdd (new member join a guild-user/human) (presence update) triggered by ${member.user.tag} ID: ${member.user.id} Time: ${Date()} Guild: ${guild}`)
            console.log(`guildMemberAdd (new member join a guild-user/human) (presence update) triggered by ${member.user.tag} ID: ${member.user.id} Time: ${Date()} Guild: ${guild}`)
        }

    } else {

    }

})


client.on('guildMemberRemove', async member => {
    let guild = member.guild;
    let welcomeMessages1;
    try {
        welcomeMessages1 = settings.getProp(guild.id, "welcome");
        welcomeChanneles = settings.getProp(guild.id, "welcomeChannel");
    } catch (err) {
        console.log(err)
        console.log(err.indexOf(" does not exist in the enmap settings") != -1)
        if (err.name === "TypeError" && err.message === "Cannot convert undefined or null to object" || err.indexOf(" does not exist in the enmap settings") != -1) { //  
            settings.set(guild.id, defaultSettings);
        }
    }
    welcomeMessages1 = settings.getProp(guild.id, "welcome");
    welcomeChanneles = settings.getProp(guild.id, "welcomeChannel");
    if (welcomeMessages1) {
        function getDefaultChannel(guild) {
            // Now we get into the heavy stuff: first channel in order where the bot can speak
            // hold on to your hats!
            return guild.channels
                .filter(c => c.type === "text" &&
                    c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
                .sort((a, b) => a.position - b.position ||
                    Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
                .first();
        }

        if (member.user.bot) {
            try {

                client.guilds.find(t => t.id == member.guild.id).channels.find(t => t.name == welcomeChanneles).send(`Goodbye to Bot ${member.user} :( `)
            } catch (err) {
                console.log(err.name)
                if (err.name === "TypeError" && err.message === "Cannot read property 'send' of null" || err.name === "DiscordAPIError" && err.message === "Missing Permissions") {
                    settings.setProp(member.guild.id, "welcomeChannel", getDefaultChannel(member.guild).name)
                    welcomeChanneles = settings.getProp(guild.id, "welcomeChannel");
                    client.guilds.find(t => t.id == member.guild.id).channels.find(t => t.name == welcomeChanneles).send(`Goodbye to Bot ${member.user} :( `)
                    message.reply("The channel you have set for the welcome messages is invalid, the welcome messages channel has been reset to the first channel. Please edit it if needed with the -setchannel command.")
                }
            }
            logger.log('info', `guildMemberRemove (member laves a guild-Bot) (presence update) triggered by ${member.user.tag} ID: ${member.user.id} Time: ${Date()} Guild: ${guild}`)
            console.log(`guildMemberRemove (member laves a guild-Bot) (presence update) triggered by ${member.user.tag} ID: ${member.user.id} Time: ${Date()} Guild: ${guild}`)
        }
        else {
            try {
                //(node:18440) UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'send' of null
                client.guilds.find(t => t.id == member.guild.id).channels.find(t => t.name == welcomeChanneles).send(`Goodbye to user ${member.user} :(`)
            } catch (err) {
                console.log(err.name)
                if (err.name === "TypeError" && err.message === "Cannot read property 'send' of null" || err.name === "DiscordAPIError" && err.message === "Missing Permissions") { // or missing permissions
                    settings.setProp(member.guild.id, "welcomeChannel", getDefaultChannel(member.guild).name) //client.guilds.find(t => t.id == member.guild.id).channels.first().name
                    welcomeChanneles = settings.getProp(guild.id, "welcomeChannel");
                    client.guilds.find(t => t.id == member.guild.id).channels.find(t => t.name == welcomeChanneles).send(`Goodbye to user ${member.user} :(`)
                    getDefaultChannel(member.guild).send("The channel you have set for the welcome messages is invalid, the welcome messages channel has been reset to the first channel. Please edit it if needed with the -setchannel command.")
                }
            }

            logger.log('info', `guildMemberRemove (member leaves a guild-member/human) (presence update) triggered by ${member.user.tag} ID: ${member.user.id} Time: ${Date()} Guild: ${guild}`)
            console.log(`guildMemberRemove (member leaves a guild-member/human) (presence update) triggered by ${member.user.tag} ID: ${member.user.id} Time: ${Date()} Guild: ${guild}`)
        }

    } else {

    }
})

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


client.on("message", async message => {  //message handler starts here!
    client.options.disableEveryone = true;
    if (message.author.bot) return;


    let command;
    let args;
    let args2;

    const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : message.content.charAt(0);

    
    if (prefix === config.prefix) {
        command = message.content.split(" ")[0];
        command = command.slice(config.prefix.length);
        args = message.content.split(" ").slice(1);
        args2 = message.content.split(" ").slice(2);
    }
    else if (prefix === '<@305475826982453250> ') {
        command = message.content.split(" ")[1];
        args = message.content.split(" ").slice(2);
        args2 = message.content.split(" ").slice(3);
    }
    else {
        return;
    }
    let cmd = args.join(' ');
    let cmd2 = args2.join(' ');
    var res = cmd.slice(0, 1)
    var guild = message.guild;

    if (command === "serverconf") {
        if ((message.member.hasPermission("MANAGE_MESSAGES") && message.member.hasPermission("MANAGE_GUILD")) || message.member.hasPermission("ADMINISTRATOR") || message.author.id === config.owner) {
            try {
                const guildConf = settings.get(message.guild.id);
                const key = args[0];
                let configKeys;

                configKeys = "";
                Object.keys(guildConf).forEach(key => {
                    configKeys += `${guildConf[key]}\n`;
                });
            } catch (err) {
                if (err.name === "TypeError" && err.message === "Cannot convert undefined or null to object" || err.indexOf(" does not exist in the enmap settings") != -1) { 
                    settings.set(message.guild.id, defaultSettings);
                }

            }
            const guildConf = settings.get(message.guild.id);
            const key = args[0];
            configKeys = "";
            Object.keys(guildConf).forEach(key => {
                configKeys += `${guildConf[key]}\n`;
            });
            let welcomeStatus = guildConf.welcome
            let channelStatus = guildConf.welcomeChannel
            if (!welcomeStatus) {
                const serverconfinfo1 = new Discord.RichEmbed()
                    .setDescription(`**${guild}'s Server Configuration** \n Welcome Messages: <true> means welcome msgs are enabled <false> means they are turned off.  Welcome Message Channel: the channel where welcome msgs will go to if welcome msgs are enabled.`)
                    .setColor("36393E")
                    .addField("Welcome Messages", `${welcomeStatus}`)
                    .addField("Welcome Message Channel", `N/A`)
                message.channel.send({ embed: serverconfinfo1 })
            } else {
                const serverconfinfo = new Discord.RichEmbed()
                    .setDescription(`${guild}'s Server Configuration | Welcome Messages: <true> means welcome msgs are enabled <false> means they are turned off.  Welcome Message Channel: the channel where welcome msgs will go to if welcome msgs are enabled.`)
                    .setColor("36393E")
                    .addField("Welcome Messages", `${welcomeStatus}`)
                    .addField("Welcome Message Channel", `#${channelStatus}`)
                message.channel.send({ embed: serverconfinfo })
            }
        } else {
            message.reply("Insufficant Permissions!")
        }

    }
    if (command === "setmsg") {
        if ((message.member.hasPermission("MANAGE_MESSAGES") && message.member.hasPermission("MANAGE_GUILD")) || message.member.hasPermission("ADMINISTRATOR") || message.author.id === config.owner) {
            const setmsghelp = new Discord.RichEmbed()
                .setColor("#f0ffff")
                .setDescription("**Command: **" + `${config.prefix}setmsg`)
                .addField("**Usage:**", `${config.prefix}setmsg <true for welcome msgs, false for no welcome msgs>`)
                .addField("**Example:**", `${config.prefix}setmsg true`)
                .addField("**Expected Result From Example:**", "Welcome messages for the current server should be turned on.")
            if (args.join(' ') === '') return message.channel.send({ embed: setmsghelp })
            let input;
            if (args.join(' ') === "true") {
                input = true
            }
            else if (args.join(' ') === "false") {
                input = false
            }
            else {
                return;
            }

            let guildN = settings.get(message.guild.id);
            let configKeys = "";
            try {
                Object.keys(guildN).forEach(key => {
                    configKeys += `${guildN[key]}\n`;
                })
            } catch (err) {
                console.log(err.name)
                console.log(err.message)
                if (err.name === "TypeError" && err.message === "Cannot convert undefined or null to object" || err.indexOf(" does not exist in the enmap settings") != -1) {
                    settings.set(message.guild.id, defaultSettings);
                }
            }
            settings.setProp(message.guild.id, "welcome", input)
            message.reply(`:white_check_mark: Success! Server welcome messages set to ${input}`)
        } else {
            message.reply("Insufficant Permissions!")
        }
    }

    if (command === "setchannel") {
        if ((message.member.hasPermission("MANAGE_MESSAGES") && message.member.hasPermission("MANAGE_GUILD")) || message.member.hasPermission("ADMINISTRATOR") || message.author.id === config.owner) {
            const setmsghelp = new Discord.RichEmbed()
                .setColor("#f0ffff")
                .setDescription("**Command: **" + `${config.prefix}setchannel`)
                .addField("**Usage:**", `${config.prefix}setchannel <the channel for welcome msgs without the hashtag. Just the name of the channel>`)
                .addField("**Example:**", `${config.prefix}setmsg general`)
                .addField("**Expected Result From Example:**", "All welcome msgs should go to that channel")
            //add helper
            if (args.join(' ') === '') return message.channel.send({ embed: setmsghelp })
            if (args.join(' ').indexOf('#') > -1) {
                message.reply("Enter the name of the channel only! Without the hashtag!")

            } else {
                let guildN = settings.get(message.guild.id);
                let configKeys = "";
                try {
                    Object.keys(guildN).forEach(key => {
                        configKeys += `${guildN[key]}\n`;
                    })

                } catch (err) {
                    console.log(err.name)
                    console.log(err.message)
                    if (err.name === "TypeError" && err.message === "Cannot convert undefined or null to object" || err.indexOf(" does not exist in the enmap settings") != -1) {
                        settings.set(message.guild.id, defaultSettings);
                    }
                }


                try {
                    let test = client.guilds.find(t => t.id == message.guild.id).channels.find(val => val.name === args.join(' ')).id
                } catch (err) {
                    message.reply("Please use a channel that is accessible by the bot!")
                    console.error(err)
                    return;
                }
                settings.setProp(message.guild.id, "welcomeChannel", args.join(' '))

                message.reply(`:white_check_mark: Success! Server welcome channel set to #${args.join(' ')}`)
            }
        } else {
            message.reply("Insufficant Permissions!")
        }
    }
    if (command === "prefix") {
        if (message.author.id === config.owner) {
            config.prefix = args.join(' ');
            fs.writeFile('./config.json', JSON.stringify(config, null, 2), function (err) {
                if (err) return console.error(err);
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
        const { DiscordAPIError } = require('discord.js');
        try {
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
        } catch (error) {
            if (error instanceof DiscordAPIError) Error.captureStackTrace(error);
            console.error(error);
        }


        logger.log('info', `Wolfram command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)

    }

    if (command === "test") {
        try {
            message.channel.send(null)
        } catch (error) {
            console.error(error)
        }

        find("id", config.owner).send("Test")
        message.guild.name
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

    if (command === "setmuterole") {
        if (message.author.id != config.owner) return message.reply("Invalid Permissions - Command is owner only.")
        else {
            if (args.join(' ') === "true") {
                config.createMuteRoleUponJoin = true;
                fs.writeFile('./config.json', JSON.stringify(config, null, 2), function (err) {
                    if (err) return console.error(err);
                    message.channel.send(`createMuteRoleUponJoin Successfully Changed to ${config.createMuteRoleUponJoin}.`)
                });
            }
            else if (args.join(' ') === "false") {
                config.createMuteRoleUponJoin = false;
                fs.writeFile('./config.json', JSON.stringify(config, null, 2), function (err) {
                    if (err) return console.error(err);
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
                .addField("broadcast a message", "cmd: broadcast <message/args>")
                .addField("get log", "cmd: getlog")
                .addField("Emergency STOP, incase things get out of control requires pm2, otherwise use restart", "cmd: killall")
                .addField("Manual restart", "cmd: restart requries pm2, otherwise works as a killall cmd")
                .addField("exec cmd/bash scripts", "cmd: exec <args>")
                .addField("good old eval, evals code from discord chatbox", "cmd: eval <ya code m8 :p>")
                .addField("change the bot's prefix... For trolling purposes only LOL", "cmd: prefix <new prefix which no one will know>")
                .addField("spyon servers by gening invites", "cmd:spyon <server name>")
                .addField("get all loaded user info", "cmd: alluserinfo")
                .addField('Get the host machine' / 's IP address ONLY! No user data leaks :P', "cmd: -gethostip")

            message.channel.send({ embed: ownercmds })
        }
        logger.log('info', `ownerhelp command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)

    }

    if (command === "setpastebineval") {
        if (message.author.id != config.owner) return message.reply("Invalid Permissions - Command is owner only.")
        else {
            if (args.join(' ') === "true") {
                config.uploadtoPastebinEval = true;
                fs.writeFile('./config.json', JSON.stringify(config, null, 2), function (err) {
                    if (err) return console.error(err);
                    message.channel.send(`uploadtoPastebinEval Successfully Changed to ${config.createMuteRoleUponJoin}.`)
                });
            }
            else if (args.join(' ') === "false") {
                config.uploadtoPastebinEval = false;
                fs.writeFile('./config.json', JSON.stringify(config, null, 2), function (err) {
                    if (err) return console.error(err);
                    message.channel.send(`uploadtoPastebinEval Successfully Changed to ${config.createMuteRoleUponJoin}.`)
                });
            }
        }
    }

    if (command === "setuploadfileeval") {
        if (message.author.id != config.owner) return message.reply("Invalid Permissions - Command is owner only.")
        else {
            if (args.join(' ') === "true") {
                config.uploadtoFileEval = true;
                fs.writeFile('./config.json', JSON.stringify(config, null, 2), function (err) {
                    if (err) return console.error(err);
                    message.channel.send(`uploadtoFileEval Successfully Changed to ${config.uploadtoFileEval}.`)
                });
            }
            else if (args.join(' ') === "false") {
                config.uploadtoFileEval = false;
                fs.writeFile('./config.json', JSON.stringify(config, null, 2), function (err) {
                    if (err) return console.error(err);
                    message.channel.send(`uploadtoFileEval Successfully Changed to ${config.uploadtoFileEval}.`)
                });
            }
        }
    }


    if (command === "setgame") {
        const config = require("./config.json");
        var guild = message.guild;
        if (message.author.id === config.owner) {
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

            user.send(client.guilds.map(e => e.toString()).join(`, `));

        }
        else {
            return message.channel.send("Insufficant Permissions");
        }
        logger.log('info', `getallserver command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()} Guild: ${guild}`)
    }

    if (command === 'getinfoserver') {
        const getx = client.guilds.find(server => server.id === args.join(' '))
        message.author.send(getx.name)
    }

    if (command === "broadcast") {
        if (message.author.id === config.owner) {
            function getDefaultChannel(guild) {
                if (guild.channels.exists("name", "general"))
                    return guild.channels.find(val11 => val11.name === "general");
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

        }
        else {
            return message.channel.send("Insufficant Permissions");
        }
        logger.log('info', `broadcast command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()} Guild: ${guild}`)

    }

    if (command === "leaveserver") {
        if (message.author.id === config.owner) {
            guild = client.guilds.find(val => val.name === args.join(' ')).leave();
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

    if (command === "restart") {

        if (message.author.id === config.owner) {

            message.channel.send(config.name + " is restarting...")
            message.reply(":white_check_mark: Restart should be complete, check -botinfo for confirmation.")

            setTimeout(function () {
                process.abort();
            }, 1000);
        } else {
            message.channel.send("Insufficant Permissions")
        }
        logger.log('info', `restart command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()} Guild: ${guild}`)

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
                let versionSelector = 0;
                if (config.name === "PowerBot Signature Edition™#0636") {
                    let versionSelector = 1;
                }
                setTimeout(async function () {
                    const command = `pm2 stop ${versionSelector}` // add exec cmd to credits NOTE: 0 = powerbot or default host of the code [add in readme that make sure process is in #0 if using pm2] 1 = signature
                    const outMessage = await message.channel.send(`Running \`${command}\`...`);
                    let stdOut = await doExec(command).catch(data => outputErr(outMessage, data));
                    stdOut = stdOut.substring(0, 1750);
                    outMessage.edit(`\`OUTPUT\`
              \`\`\`sh
              ${clean(stdOut)}
              \`\`\``);
                }, 3000);
            }
            else {
                console.log(check)
                message.channel.send("Incorrect Password")
            }
        } else {
            message.channel.send("Insufficant Permissions")
        }
        logger.log('info', `Killall command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()} Guild: ${guild}`)

    }



    if (command === "exec") {

        if (message.author.id === config.owner) {
            const command = args.join(" ");
            const outMessage = await message.channel.send(`Running \`${command}\`...`);
            let stdOut = await doExec(command).catch(data => outputErr(outMessage, data));
            stdOut = stdOut.substring(0, 1750);
            outMessage.edit(`\`OUTPUT\`
      \`\`\`sh
      ${clean(stdOut)}
      \`\`\``);
        } else {
            message.reply("Only the bot owner can use this command")
        }
        logger.log('info', `exec command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()} Guild: ${guild}`)
    }

    if (command === "eval") {
        if (message.author.id === config.owner) {
            logger.log('info', `eval command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()} Guild: ${guild}`)
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
client.on("error", (error) => {
    console.error(chalk.red(error.replace(token, "HIDDEN")));
});

client.addListener('DiscordAPIError', function (e) {
    var disapierr = e.error
    console.log(chalk.red(disapierr))
    console.error(error)
    console.log(error);
})
client.addListener('error', function (e) {
    var error = e.error;
    console.log(chalk.red(error))
    console.error(error)
    console.log(error);
})

client.login(config.token);
