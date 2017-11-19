const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
 exports.run = function (client, message, args, args2, cmd, config) {
  message.channel.send("boo!");
  logger.log('info', `Pika command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()}`)    
  
 };