exports.run = function (client, message, args, args2, cmd) {
    const google = require('./googleUtil');
    google.image(args.join(' '), message.channel && message.channel.nsfw)
        .then((link) => {
            message.reply(link || 'No results found', { bold: !link });
        });
}