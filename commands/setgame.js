const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
      const config = require("./config.json");
      var guild = message.guild;
    if (message.author.id === config.owner) {
    client.user.setGame(args.join(' '));
}
else{
    message.channel.send("Insufficant Permissions!")
}
logger.log('info', `Setgame command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    

};