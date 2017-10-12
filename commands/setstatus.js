exports.run = function (client, message, args, args2, cmd, config) {
    if (message.author.id === config.owner) {
        client.user.setStatus(args.join(' '));
    }
};