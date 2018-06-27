const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    var guild = message.guild;
 message.channel.fetchMessages({ limit: parseInt(parseInt(args.join(' '))+1, 10) }).then(messagelog => {
            setTimeout(message.delete.bind(message), 2000);
            messagelog.forEach(message => {
                message.clearReactions();

            });
        });
        logger.log('info', `Clean command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
}