const randomWord = require('random-word');

exports.run = function (client, message, args, args2) {
message.channel.send(randomWord())
}