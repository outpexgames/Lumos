const chalk = require('chalk');
const config = require("../config.json");
const Discord = require('discord.js');
module.exports = message => {

    if (message.author.bot) return;
    const client = message.client;
    client.options.disableEveryone = true;
    let command;
    let args;
    let args2;

    const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : message.content.charAt(0);
    if (prefix === config.prefix) {
        command = message.content.split(" ")[0];
        command = command.slice(config.prefix.length);
        args = message.content.split(" ").slice(1);
        args2 = message.content.split(" ").slice(2);
    }
    else if (prefix === '<@305475826982453250> ') {
        command = message.content.split(" ")[1];
        args = message.content.split(" ").slice(2);
        args2 = message.content.split(" ").slice(3);
    }
    else {
        return;
    }

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

    } catch (error) {
        console.log(`Command ${command} failed\n${error.stack}`);
    }

};
