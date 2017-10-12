var google = require('google')

exports.run = function (client, message, args, args2, cmd) {
    google.resultsPerPage = 1
    var nextCounter = 0
    const Discord = require('discord.js');
    const config = require("./config.json");
    const embed1 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}google`)
        .addField("**Usage:**", `${config.prefix}google <search quary>`)
        .addField("**Example:**", `${config.prefix}google testing`)
        .addField("**Expected Result From Example:**", "Should return some google search titles and desc")
    if (args.join(' ') == "") return message.channel.send({embed: embed1})
    google(args.join(' '), function (err, res) {
        if (err) console.error(err)

        for (var i = 0; i < res.links.length; ++i) {
            var link = res.links[i];
            message.channel.send("**Link Title: **" + link.title)
            message.channel.send("**Link Description: **" + link.description + "\n")


        }


        if (nextCounter < 4) {
            nextCounter += 1
            if (res.next) res.next()
        }
        // localStorage.setItem('Google-Results.json', res.links);
        // message.channel.send({ files: ['Google-Results.json'] });
    })
};