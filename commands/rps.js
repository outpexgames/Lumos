function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
    const config = require("./config.json");
    const embed19 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}rps`)
        .addField("**Usage:**", `${config.prefix}rps <your choice>`)
        .addField("**Example:**", `${config.prefix}rps rock`)
        .addField("**Expected Result From Example:**", "Should return if you won or lost, and the computer's choice.")
    if (args.join(' ') == "" && args2.join(" ") == "") return message.channel.send({ embed: embed19 })
    var computerchoose = getRandomIntInclusive(1, 3) //rock paper sissor
    var computerfinal = '';
    if (computerchoose === 1) {
        computerfinal = "rock";
    }
    else if (computerchoose === 2) {
        computerfinal = "paper";
    }
    else if (computerchoose === 3) {
        computerfinal = "scissor";
    }
    if (args.join(' ') === 'rock' && computerfinal === "rock") {
        message.channel.send("Tie! :>" + `You chose: ${args.join(' ')}. I chose: ${computerfinal}.`)
    }
    else if (args.join(' ') === 'rock' && computerfinal === "paper") {
        message.channel.send("I win! :)" + `You chose: ${args.join(' ')}. I chose: ${computerfinal}.`)
    }
    else if (args.join(' ') === 'rock' && computerfinal === "scissor") {
        message.channel.send("You win :(" + `You chose: ${args.join(' ')}. I chose: ${computerfinal}.`)
    }
    else if (args.join(' ') === 'paper' && computerfinal === "rock") {
        message.channel.send("You win :(" + `You chose: ${args.join(' ')}. I chose: ${computerfinal}.`)
    }
    else if (args.join(' ') === 'paper' && computerfinal === "paper") {
        message.channel.send("Tie! :>" + `You chose: ${args.join(' ')}. I chose: ${computerfinal}.`)
    }
    else if (args.join(' ') === 'paper' && computerfinal === "scissor") {
        message.channel.send("I win! :)" + `You chose: ${args.join(' ')}. I chose: ${computerfinal}.`)
    }
    else if (args.join(' ') === 'scissor' && computerfinal === 'rock') {
        message.channel.send("I win! :)" + `You chose: ${args.join(' ')}. I chose: ${computerfinal}.`)
    }
    else if (args.join(' ') === 'scissor' && computerfinal === 'paper') {
        message.channel.send("You win :(" + `You chose: ${args.join(' ')}. I chose: ${computerfinal}.`)
    }
    else if (args.join(' ') === 'scissor' && computerfinal === 'scissor') {
        message.channel.send("Tie! :>" + `You chose: ${args.join(' ')}. I chose: ${computerfinal}.`)
    }
    else {
        message.channel.send("Failed to exec the command.")
    }
    logger.log('info', `Rps command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()}`)    
    
}