exports.run = function (client, message, args, args2, cmd1) {

      message.channel.send(':ping_pong: Pinging...').then((msg) => {
        msg.edit(`:ping_pong: Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
      });

    // message.channel.send(`Pong! :ping_pong: `)
    // message.channel.send("`" + (client.ping).toFixed(0) + "ms" + "`")
}