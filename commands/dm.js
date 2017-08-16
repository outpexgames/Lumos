exports.run = function (client, message, args, args2, cmd, config) {
    let user = message.mentions.users.first()
    user.send(`You have a message from user: ${message.author.username} | ID: ${message.author.id}\nMessage: ${args2.join(' ')}`)
    message.delete(1)
}