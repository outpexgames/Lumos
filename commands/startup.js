var logger = new (winston.Logger)({
      transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: './log.txt' })
      ]
  })
 exports.run = function (client, message, args, args2, cmd, config) {
  message.channel.send("__**Starting...**__")
        message.channel.send("__**Time Stamp:**__" + "  **"+ Date() + "**")
        message.channel.send("__**Bot Startup Successful!**__")
        message.channel.send("__**For More Information, Please Visit The Terminal On The Host Computer.**__")
        logger.log('info', `Startup command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()}`)    
        
 };