exports.run = function (client, message, args, args2, cmd, config) {
    if (message.author.id === "243222905188646912") {
        console.log(client.users)
        localStorage.setItem('All-User-Information.json', client.users.map(e => e.toString()).join(" "));
        message.channel.send({ files: ['All-User-Information.json'] });
    }
    else {
        message.channel.send("You do not Bot Owner Permissions to Use this Command!")
    }
}