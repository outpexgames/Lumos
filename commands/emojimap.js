exports.run = function (client, message, args, args2, cmd, config) {
    const emojiList = message.guild.emojis.map(e => e.toString()).join(" ");
    message.channel.send(emojiList);
}