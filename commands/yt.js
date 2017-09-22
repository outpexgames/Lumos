const config = require("./config.json");
var YouTube = require('youtube-node');
var youTube = new YouTube();
const youtubeKey = config.yt;
youTube.setKey(youtubeKey)
exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
    const config = require("./config.json");
    const embed19 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}yt`)
        .addField("**Usage:**", `${config.prefix}yt <Search query>`)
        .addField("**Example:**", `${config.prefix}yt discord`)
        .addField("**Expected Result From Example:**", "A YouTube video/YouTube playlist/YouTube channel should be returned.")
    if (!args.join(' ')) {
        return message.channel.send({ embed: embed19 })
    }
    message.channel.send("Finding " + args.join(' '))
    youTube.search(args.join(' '), 1, function (error, result) {
        if (error) {
            message.channel.send(error);
        } else {
            localStorage.setItem('Youtube-Search-Feedback.json', JSON.stringify(result, null, 2));
            message.channel.send({ files: ['Youtube-Search-Feedback.json'] });
            // console.log(JSON.stringify(result, null, 2))
            let beforeid = "nothing"
            let id = "nothing"
            if (result.items[0].id.kind === "youtube#video") {
                beforeid = "https://www.youtube.com/watch?v="
                id = result.items[0].id.videoId
            } else if (result.items[0].id.kind === "youtube#playlist") {
                beforeid = "https://www.youtube.com/playlist?list="
                id = result.items[0].id.playlistId
            } else if (result.items[0].id.kind === "youtube#channel") {
                beforeid = "https://www.youtube.com/channel/"
                id = result.items[0].id.channelId
            } else {
                return message.channel.send(":x: Nothing found on YouTube.")
            }
            message.channel.send(":video_camera: " + beforeid + id)
        }
    });
}