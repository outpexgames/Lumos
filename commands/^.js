exports.run = function (client, message, args, args2, cmd, config, res) {
    var res = args[0];
    var answer = Math.pow(res, args2.join(' '));
    message.channel.send(answer);
};