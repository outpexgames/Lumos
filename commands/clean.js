exports.run = function (client, message, args, args2, cmd) {
 message.channel.fetchMessages({ limit: parseInt(args[0], 10) }).then(messagelog => {
            message.edit(`Clearing Reactions from this channel for ${args[0]} messages...`).then(setTimeout(message.delete.bind(message), 2000));
            messagelog.forEach(message => {
                message.clearReactions();

            });
        });
}