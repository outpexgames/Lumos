
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
var tcom = require('thesaurus-com');
const randomWord = require('random-word');
const ipInfo = require("ipinfo");
const winston = require('winston')
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
})
client.on('guildDelete', (guild) => {
    console.log(chalk.white(`Left/Kicked from guild ${guild.name} ID: ${guild.id}  Owner ID: ${guild.ownerID}`))
});
// client.on("presenceUpdate", (oldMember, newMember) => {
//     let guild = newMember.guild;
//     let minecraft = guild.roles.find("name", "Playing Minecraft");
//     let csgo = guild.roles.find("name", "Playing CS:GO");
//     let garryMod = guild.roles.find("name", "Playing Garry's Mod");
//     let gta = guild.roles.find("name", "Playing GTA");
//     let rainbow6 = guild.roles.find("name", "Playing Rainbow Six Siege");
//     let halflife = guild.roles.find("name", "Playing Half-Life");
//     let dnd = guild.roles.find("name", "DND/Do Not Disturb");
//     let idle = guild.roles.find("name", "Idle");
//     let blackops = guild.roles.find("name", "Playing Call of Duty: Black Ops III");
//     let roblox = guild.roles.find("name", "Playing Roblox");
//     let pubg = guild.roles.find("name", "Playing PUBG");
//     let leagueoflegend = guild.roles.find("name", "Playing League of Legends");
//     if (!minecraft) return;
//     if (!csgo) return;
//     if (!garryMod) return;
//     if (!gta) return;
//     if (!halflife) return;
//     if (!dnd) return;
//     if (!idle) return;
//     if (!blackops) return;
//     if (!roblox) return;
//     if (!pubg) return;
//     if (!leagueoflegend) return;

//     if (newMember.user.presence.status === "dnd") {
//         newMember.addRole(dnd);
//         logger.log('info', `dnd (presence update) role given to ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     if (newMember.user.presence.status != "dnd" && newMember.roles.has(dnd.id)) {
//         newMember.removeRole(dnd);
//         logger.log('info', `dnd (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     if (newMember.user.presence.status === "idle") {
//         newMember.addRole(idle)
//         logger.log('info', `idle (presence update) role given to ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     if (newMember.user.presence.status !== "idle" && newMember.roles.has(idle.id)) {
//         newMember.removeRole(idle);
//         logger.log('info', `idle (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }

//     if (newMember.user.presence.game && newMember.user.presence.game.name === "Minecraft") {
//         newMember.addRole(minecraft);
//         logger.log('info', `minecraft (presence update) role added to ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (!newMember.user.presence.game && newMember.roles.has(minecraft.id)) {
//         newMember.removeRole(minecraft);
//         logger.log('info', `minecraft (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (newMember.user.presence.game !== "Minecraft" && newMember.roles.has(minecraft.id)) {
//         newMember.removeRole(minecraft);
//         logger.log('info', `minecraft (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }

//     if (newMember.user.presence.game && newMember.user.presence.game.name === "Counter-Strike Global Offensive") {
//         newMember.addRole(csgo);
//         logger.log('info', `Counter-Strike Global Offensive (presence update) role added to ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (!newMember.user.presence.game && newMember.roles.has(csgo.id)) {
//         newMember.removeRole(csgo);
//         logger.log('info', `Counter-Strike Global Offensive (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (newMember.user.presence.game !== "Counter-Strike Global Offensive" && newMember.roles.has(csgo.id)) {
//         newMember.removeRole(csgo);
//         logger.log('info', `Counter-Strike Global Offensive (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }

//     if (newMember.user.presence.game && newMember.user.presence.game.name === "Garry's Mod") {
//         newMember.addRole(garryMod);
//         logger.log('info', `Garry's Mod (presence update) role added to ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (!newMember.user.presence.game && newMember.roles.has(garryMod.id)) {
//         newMember.removeRole(garryMod);
//         logger.log('info', `Garry's Mod (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (newMember.user.presence.game !== "Garry's Mod" && newMember.roles.has(garryMod.id)) {
//         newMember.removeRole(garryMod);
//         logger.log('info', `Garry's Mod (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }

//     if (newMember.user.presence.game && newMember.user.presence.game.name === "Grand Theft Auto San Andreas") {
//         newMember.addRole(gta);
//         logger.log('info', `Grand Theft Auto San Andreas (presence update) role added to ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)

//     }
//     else if (!newMember.user.presence.game && newMember.roles.has(gta.id)) {
//         newMember.removeRole(gta);
//         logger.log('info', `Grand Theft Auto San Andreas (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (newMember.user.presence.game !== "Grand Theft Auto San Andreas" && newMember.roles.has(gta.id)) {
//         newMember.removeRole(gta);
//         logger.log('info', `Grand Theft Auto San Andreas (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }

//     if (newMember.user.presence.game && newMember.user.presence.game.name === "Tom Clancy's Rainbow Six Siege") {
//         newMember.addRole(rainbow6);
//         logger.log('info', `Tom Clancy's Rainbow Six Siege (presence update) role added to ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (!newMember.user.presence.game && newMember.roles.has(rainbow6.id)) {
//         newMember.removeRole(rainbow6);
//         logger.log('info', `Tom Clancy's Rainbow Six Siege (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (newMember.user.presence.game !== "Tom Clancy's Rainbow Six Siege" && newMember.roles.has(rainbow6.id)) {
//         newMember.removeRole(rainbow6);
//         logger.log('info', `Tom Clancy's Rainbow Six Siege (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }

//     if (newMember.user.presence.game && newMember.user.presence.game.name === "Half-Life") {
//         newMember.addRole(halflife);
//         logger.log('info', `Half-Life (presence update) role added to ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (!newMember.user.presence.game && newMember.roles.has(halflife.id)) {
//         newMember.removeRole(halflife);
//         logger.log('info', `Half-Life (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (newMember.user.presence.game !== "Half-Life" && newMember.roles.has(halflife.id)) {
//         newMember.removeRole(halflife);
//         logger.log('info', `Half-Life (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }

//     if (newMember.user.presence.game && newMember.user.presence.game.name === "Call of Duty: Black Ops III") {
//         newMember.addRole(blackops);
//         logger.log('info', `Call of Duty: Black Ops III (presence update) role added to ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (!newMember.user.presence.game && newMember.roles.has(blackops.id)) {
//         newMember.removeRole(blackops);
//         logger.log('info', `Call of Duty: Black Ops III (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (newMember.user.presence.game !== "Call of Duty: Black Ops III" && newMember.roles.has(blackops.id)) {
//         newMember.removeRole(blackops);
//         logger.log('info', `Call of Duty: Black Ops III (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }

//     if (newMember.user.presence.game && newMember.user.presence.game.name === "ROBLOX") {
//         newMember.addRole(roblox);
//         logger.log('info', `ROBLOX (presence update) role added to ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (!newMember.user.presence.game && newMember.roles.has(roblox.id)) {
//         newMember.removeRole(roblox);
//         logger.log('info', `ROBLOX (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (newMember.user.presence.game !== "ROBLOX" && newMember.roles.has(roblox.id)) {
//         newMember.removeRole(roblox);
//         logger.log('info', `ROBLOX (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }

//     // if (newMember.user.presence.game && newMember.user.presence.game.name == "PlayerUnknown's Battlegrounds") {
//     //     newMember.addRole(pubg);
//     // }
//     // else if (!newMember.user.presence.game && newMember.roles.has(pubg.id)) {
//     //     newMember.removeRole(pubg);
//     // }
//     // else if (newMember.user.presence.game !== "PlayerUnknown's Battlegrounds" && newMember.roles.has(pubg.id)) {
//     //     newMember.removeRole(pubg);
//     // }

//     if (newMember.user.presence.game && newMember.user.presence.game.name == "PLAYERUNKNOWN'S BATTLEGROUNDS") {
//         newMember.addRole(pubg);
//         logger.log('info', `PLAYERUNKNOWN'S BATTLEGROUNDS (presence update) role added to ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (!newMember.user.presence.game && newMember.roles.has(pubg.id)) {
//         newMember.removeRole(pubg);
//         logger.log('info', `PLAYERUNKNOWN'S BATTLEGROUNDS (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (newMember.user.presence.game !== "PLAYERUNKNOWN'S BATTLEGROUNDS" && newMember.roles.has(pubg.id)) {
//         newMember.removeRole(pubg);
//         logger.log('info', `PLAYERUNKNOWN'S BATTLEGROUNDS (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }

//     if (newMember.user.presence.game && newMember.user.presence.game.name == "League of Legends") {
//         newMember.addRole(leagueoflegend);
//         logger.log('info', `League of Legends (presence update) role added to ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (!newMember.user.presence.game && newMember.roles.has(leagueoflegend.id)) {
//         newMember.removeRole(leagueoflegend);
//         logger.log('info', `League of Legends (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     else if (newMember.user.presence.game !== "League of Legends" && newMember.roles.has(leagueoflegend.id)) {
//         newMember.removeRole(leagueoflegend);
//         logger.log('info', `League of Legends (presence update) role removed from ${newMember.user.tag} ID: ${newMember.user.id} Time: ${Date()} Guild: ${guild}`)
//     }
//     //Counter-Strike Global Offensive
// });

//TODO: https://youtu.be/Znvxk14Tg6A
//TODO: https://youtu.be/8AiZBdcPKOM?t=29m10s
//TODO: https://youtu.be/zdQplH3fwbU?t=16m1s
////https://youtu.be/qEDhVKFWoVg?t=18m21s
//https://youtu.be/1AjBVocSQhM?t=24m58s

// const getDefaultChannel = async (guild) => {
//     // get "original" default channel
//     if(guild.channel.has(guild.id))
//       return guild.channels.get(guild.id)

//     // Check for a "general" channel, which is often default chat
//     if(guild.channels.exists("name", "general"))
//       return guild.channels.find("name", "general");

//     // Now we get into the heavy stuff: first channel in order where the bot can speak
//     // hold on to your hats!
//     return guild.channels
//       .filter(c => c.type === "text" &&
//        c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
//      .sort((a, b) => a.position - b.position ||
//        Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
//      .first();
//   }

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
 
    // if (command === "outer-reload") {
    //     if (message.author.id === config.owner) {
    //         if (!args || args.size < 1) return message.reply("Must provide a command name to reload.");
    //         // the path is relative to the *current folder*, so just ./filename.js
    //         delete require.cache[require.resolve(`./${args[0]}.js`)];
    //         message.reply(`:white_check_mark: The command ${args[0]} has been reloaded`);
    //     }
    //     else {
    //         message.reply(":x: Insufficant Permissions!")
    //     }
    // }

    // if (command === "spam") {
    //     for (var i = 0; i < 10; i++) {
    //         message.channel.send(args.join(' '))
    //     }
    //     logger.log('info', `Spam command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
    // }


        if (command === "checklist") {
            logger.log('info', `checklist command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()} Guild: ${guild}`)
            const embed100 = new Discord.RichEmbed()
                .setTitle("If a role is true, means you have the role setup correctly, if it is false, then there is something wrong witht the role.")
                .setColor('#ff0000')
                .setFooter(config.name + "CheckList")
           
    
            let powerbotperm = client.guilds.get(message.guild.id).roles.find("name", "PowerBot")
    
            embed100.addField("PowerBot ADMINISTRATOR Permissions: ", powerbotperm.hasPermission("ADMINISTRATOR"))
    
            let muteRole = client.guilds.get(message.guild.id).roles.find("name", "Mute")
            let mute = true;
            if (!muteRole) mute = false;
            embed100.addField("PowerBot Mute Role: ", mute)
            message.channel.send({ embed: embed100 });
    
        }
    

    if (command === "wolfram") { //WIP
        // wolfram.query(args.join(' '), function (err, result) {
        //     if (err) throw err
        //     localStorage.setItem('Wolfram-Results.json', result);
        //     message.channel.send({ files: ['Wolfram-Results.json'] });
        //     message.channel.send("**Solution: **" + result)
        //     console.log(result)
        // })


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
        console.log(message.channel)
        console.log("ENDLJSLFJSLJFLKSJGLS")
        logger.log('info', `Test command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
        message.channel.send(os.hostname)
        message.channel.send(os.platform)

    }



    //     if (command === "triangle") {
    //         var a = parseInt(args[0]);
    //         var b = parseInt(args[1]);
    //         var c = parseInt(args[2]);
    //         if (a + b > c && a + c > b && b + c > a) {
    //         message.channel.send("Makes a triangle")
    //     }
    //     else {
    //         message.channel.send("Does not make a triangle")
    //     }
    //     logger.log('info', `triangle command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
    // }

    //Team Fortress 2
    // if (command === "getip") {
    //     let user = message.author;
    //     ipInfo((err, cLoc) => {
    //         user.send(JSON.stringify(err || cLoc));
    //     })
    // }

    // if (command === "iduser") {
    //     message.channel.send(client.users.get(args.join(' ')).username + "#" + client.users.get(args.join(' ')).discriminator);
    // }

    // if (command === "iplookup") {
    //     let user = message.author;
    //     ipInfo(args.join(' '), (err, cLoc) => {
    //         user.send(JSON.stringify(err || cLoc));
    //     });
    // }


    // if (command === "userid") {
    //     let user = message.mentions.users.first()
    //     message.channel.send(user.id)
    // }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

    // if (command === "stuff") {
    //     const embed1010 = new Discord.RichEmbed()
    //         .setColor("#f0ffff")
    //         .addField("Synonyms: ", tcom.search(args.join(' ')).synonyms)
    //     console.log(tcom.search(args.join(' ')));
    //     message.channel.send({ embed: embed1010 })
    //     message.channel.send(tcom.search(args.join(' ')).antonyms);

    // }

    // if (command === "randword") {
    //     message.channel.send(randomWord())
    // }
    if (command === "party") {
        let ayy = client.emojis.find("name", ":ditto:")
// message.channel.send(":congablob: :congablob: :congablob: :congablob: :congablob ::hype: :ditto: :hype: :ditto: :hype: :parrot: :congablob: :congablob: :congablob: :parrot:")
        message.reply(ayy)
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
        logger.log('Information', `Getallserver command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()} Guild: ${guild}`)
    }

    if (command === "update") {
        if (message.author.id === config.owner) {
            // var check1 = base64url.encode(rand.toString())
            // if (!args.join(' ')) {
            //     message.channel.send('Please get a password! It has been Directly Messaged to you!')
            //     message.author.send("Base 64 of " + rand)
            //     message.author.send("Then remove any equal signs(=) from the result!")
            // }
            // else if (args.join(' ') === check1) {
            let min = 5; // change min here (WIP)
            let server = client.guilds.find("name", args.join(' '));
            server.defaultChannel.send(`Hello, ${config.name} will under go a system update in ${min} minutes. Please prepare for at least 5-10 minutes of down time. Thank you for your understanding. Together we will make ${config.name} better and better! ~AirFusion--Creator of ${config.name}`)
            // }
        }
        else {
            return message.channel.send("Insufficant Permissions");
        }
        logger.log('Information', `Update command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()} Guild: ${guild}`)

    }

    if (command === "leaveserver") {
        if (message.author.id === config.owner) {
            guild = client.guilds.find("name", args.join(' ')).leave();
        }
        else message.channel.send("Insufficant Permissions.")
    }
    if (command === "getlog") {
        let user = message.author;
        user.send({ files: ['log.txt'] })
    }
    if (command === "killall") {
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
    // if (command == "game") {
    //     let user = message.mentions.users.first();
    //     message.channel.send(user.presence.game.name);
    //     logger.log('Information', `Game command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()} Guild: ${guild}`)

    // }
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
            message.channel.send("Insufficant Permissions.")
        }
        logger.log('Information', `Eval command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()} Guild: ${guild}`)

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
