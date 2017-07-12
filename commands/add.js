 exports.run = function (client, message, args, args2, cmd, config) {
let numArray = args.map(n => parseInt(n));
        let total = numArray.reduce((p, c) => p + c);

        message.channel.sendMessage(total);
 };