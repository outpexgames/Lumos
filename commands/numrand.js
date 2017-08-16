function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
exports.run = function (client, message, args, args2, cmd, config) {

    var low = args.shift();
    var ans = getRandomIntInclusive(low, args2.join(' '));
    message.channel.send(ans)
}
