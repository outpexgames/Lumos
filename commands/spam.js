const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    var guild = message.guild;
    for (var i = 0; i < 10; i++) {
        message.channel.send(args.join(' '))
    }
    logger.log('info', `Spam command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
}