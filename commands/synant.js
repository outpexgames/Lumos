var tcom = require('thesaurus-com');

exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
    const config = require("./config.json");
    const embed1 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}synant`)
        .addField("**Usage:**", `${config.prefix}synant <word>`)
        .addField("**Example:**", `${config.prefix}synant test`)
        .addField("**Expected Result From Example:**", "Should return synonyms & antonyms of that word")

    const embed1010 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .addField("Synonyms: ", tcom.search(args.join(' ')).synonyms)
        .addField("antonyms: ", tcom.search(args.join(' ')).antonyms)
   // console.log(tcom.search(args.join(' ')));
    if (!args.join(' ')) return message.channel.send({embed: embed1});
    message.channel.send({embed: embed1010})
}