const chalk = require('chalk');
const config = require("./config.json");
 const Discord = require('discord.js');
module.exports = message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    
    const client = message.client;
    
    //let embed = new Discord.RichEmbed() 
//   let command = message.content.split(" ")[0];
//     command = command.slice(config.prefix.length);

//     let args = message.content.split(" ").slice(1);

//     let args2 = message.content.split(" ").slice(2);

    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);
    
    let args = message.content.split(" ").slice(1);

    let args2 = message.content.split(" ").slice(2);

    let cmd = args.join(' ');
    
    let cmd2 = args2.join(' ');
    var res = cmd.slice(0, 1);
    
    function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/` /g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;

}
    const Discord = require('discord.js');
    try {
        let cmdFile = require(`../commands/${command}`);
        cmdFile.run(client, message, args, args2, config, Discord);

    } catch(error) {
        console.log(`Command ${command} faliled\n${error.stack}`);
    }

};