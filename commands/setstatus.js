 exports.run = function (client, message, args, args2, cmd, config) {
client.user.setStatus(args.join(' '));
 };