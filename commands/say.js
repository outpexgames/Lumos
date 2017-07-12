 exports.run = function (client, message, args, args2, cmd, config) {
    message.channel.sendMessage(args.join(' '));
 };