exports.run = function (client, message, args, args2, cmd1) {
    message.channel.sendMessage(`Pong! :ping_pong: `)
    message.channel.sendMessage("`" + (client.ping).toFixed(0) + "ms" + "`")
}