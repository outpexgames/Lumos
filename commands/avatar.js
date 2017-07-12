 exports.run = function (client, message, args, args2, cmd, config) {
        message.channel.sendMessage("Here is your avatar: \n")
        message.channel.sendMessage(message.author.avatarURL);
 };