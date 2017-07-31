const { morse } = require('../util.js')

exports.run = function (client, message, args, args2, cmd) {
let morsed = morse(args.join(' ')) //if in exports.run, need to put morse const from line front
        if (morsed.length > 0) {
            message.channel.send("🍆 Means -")
            message.channel.send("😄 Means ·\n\n")
            message.channel.send(morsed)
        } else if (morsed.length > 1500){  //can be caped @ 2000
            message.reply("Your message has been flaged for spam, therefore it won't send")
        } else {
            message.reply("Input cannot be empty :frowning:"); 
           
        }
};