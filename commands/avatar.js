 exports.run = function (client, message, args, args2, cmd, config) {
        message.channel.send("Here is your avatar: \n")
        message.channel.send(message.author.avatarURL);
 };