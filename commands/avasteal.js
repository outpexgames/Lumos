exports.run = function (client, message, args, args2, cmd, config) {
message.channel.sendMessage(message.mentions.users.first().avatarURL);
};