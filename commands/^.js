 exports.run = function (client, message, args, args2, cmd, config, res) {
        var test = args.join(' ');
        var res = test.slice(0, 1);
        var answer = Math.pow(res, args2.join(' '));
        message.channel.sendMessage(answer);
 };