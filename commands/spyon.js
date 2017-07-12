 exports.run = function (client, message, args, args2, cmd, config) {
 if (message.author.id === "243222905188646912" ) {
    try {
    client.guilds.find("name", args.join(' ')).defaultChannel.createInvite({ maxAge: 30  }).then(inv => message.channel.sendMessage(inv.url ? inv.url : "discord.gg/" + inv.code))
    } catch(error){
        console.log(error)
        message.reply(' they don\'t allow me to generate invites :(')
    }
  } else{
      message.reply(" only AirFusion gets to spy on servers, sorry")
  }
}


/*
if client.guilds.find("name", args.join(' ')) finds no server that the bot is in under the name of <input/args.join> then it will return null!
!!!bot needs to be in server...
!put it on a selfbot
NOTE: Try eval following command:
-eval client.guilds.find("name", "<servername>").defaultChannel.createInvite({ maxAge: 30  }).then(inv => message.channel.sendMessage(inv.url ? inv.url : "discord.gg/" + inv.code))
*/