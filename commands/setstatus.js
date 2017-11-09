var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd, config) {
    if (message.author.id === config.owner) {
        client.user.setStatus(args.join(' '));
    }
    logger.log('info', `Setstatus command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()}`)    
    
};