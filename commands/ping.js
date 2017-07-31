exports.run = function (client, message, args, args2, cmd1) {
    message.channel.send(`Pong! :ping_pong: `)
    message.channel.send("`" + (client.ping).toFixed(0) + "ms" + "`")
}