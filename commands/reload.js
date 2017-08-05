const main = require('../index.js')
const chalk = require('chalk');
const config = require("./config.json");
exports.run = function (client, message, args, args2, cmd, cmd2) {
    if (message.author.id === config.owner) {
        if (!args || args.size < 1) return message.reply("Must provide a command name to reload.");
        // the path is relative to the *current folder*, so just ./filename.js
        delete require.cache[require.resolve(`./${args[0]}.js`)];
        message.reply(`:white_check_mark: The command ${args[0]} has been reloaded`);
    }
    else {
        message.reply(":x: Insufficant Permissions!")
    }
};