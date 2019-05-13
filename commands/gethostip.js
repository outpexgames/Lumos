const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
const ipInfo = require("ipinfo");
exports.run = function (client, message, args, args2, cmd) {
    const config = require("../config.json");
    const Discord = require('discord.js');
    var guild = message.guild;
    if (message.author.id === config.owner) {

        let user = message.author;
        ipInfo((err, cLoc) => {
            const embed = new Discord.RichEmbed()
                .setTitle("PowerBot's Host's IP Information - PowerBot Does NOT Log IP Addresses")
                .setColor("36393E")
                .setTimestamp()
                .addField('IP', cLoc.ip)
                .addField('Host', cLoc.hostname)
                .addField('City', cLoc.city)
                .addField('Region', cLoc.region)
                .addField('Country', cLoc.country)
                .addField('Location Cords', cLoc.loc)
                .addField('Postal/Zip Code', cLoc.postal)
                .addField('ISP/Organization', cLoc.org)
            user.send({ embed: embed })

        })
        logger.log('info', `gethostip command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
    }

}