exports.run = function (client, message, args, args2, cmd) {
      const config = require("./config.json");
    if (message.author.id === config.owner) {
    client.user.setGame(args.join(' '));
}
else{
    message.channel.send("Insufficant Permissions!")
}
};