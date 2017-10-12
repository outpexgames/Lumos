const chalk = require('chalk');
const config = require("./config.json");
module.exports = client => {
    console.log(chalk.green(`PowerBot is now online and ready to go! Here is some information:`));
    console.log(chalk.green(`PowerBot loaded successfully @ ${Date()}`));
    console.log(chalk.green(`Owner: AirFusion#1243`));
    console.log(chalk.green(`Logged in as: PowerBot#0636 `));
    console.log(chalk.green(`Prefix: ${config.prefix}`));
    //console.log(`In ${bot.guilds.size} servers | Serving ${bot.users.size} users | A total of ${bot.channels.size} channels.`);
    console.log(chalk.green("|--------------------(Loading commands)------------------------|"));
    console.log(chalk.green("DONE!"));
}