const main = require('../index.js')
const chalk = require('chalk');
const config = require("./config.json");
exports.run = function(client, message, args, args2, cmd, cmd2) {
    cmd = args2.join(' ');
    main.reload(message, cmd)
};