const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    message.guild.defaultChannel.createInvite({ maxAge: 300 }).then(inv => message.channel.send(inv.url ? inv.url : "discord.gg/" + inv.code))
    logger.log('info', `Serverinv command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()}`)    
    
}