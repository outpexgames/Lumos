const randomWord = require('random-word');
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2) {
message.channel.send(randomWord())
logger.log('info', `Randword command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()}`)    

}