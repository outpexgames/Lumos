 exports.run = function (client, message, args, args2, cmd, config) {
 let inpuit = args;
        let answer = Math.sqrt(inpuit)
        message.channel.sendMessage(answer);
 };