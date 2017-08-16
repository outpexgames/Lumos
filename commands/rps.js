function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
exports.run = function (client, message, args, args2, cmd, config) {
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
}