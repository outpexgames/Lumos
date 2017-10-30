exports.run = function (client, message, args, args2, cmd) {
let user = message.author;
    ipInfo((err, cLoc) => {
        user.send(JSON.stringify(err || cLoc));
    })

}