const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    var guild = message.guild;
    var a = parseInt(args[0]);
    var b = parseInt(args[1]);
    var c = parseInt(args[2]);
    if (a + b > c && a + c > b && b + c > a) {
        message.channel.send("Makes a triangle")
    }
    else {
        message.channel.send("Does not make a triangle")
    }
    logger.log('info', `triangle command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
}