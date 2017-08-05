exports.run = function (client, message, args, args2, cmd, config) {
    const search = client.emojis.find("name", args.join(' '));
    message.reply(`${search}`);
}