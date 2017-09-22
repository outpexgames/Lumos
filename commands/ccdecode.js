function decode(ch, shift) {
    var y = parseInt(ch.charCodeAt(0))
    var temp = 0
    if (y >= 65 && y <= 90 || y == 32) {
        if (y == 32) {
            return ' '
        }
        else if (shift < 65) {
            temp = shift - (y - 65)
            y = 91 - temp
        }
        else {
            y = y - shift
        }
        return String.fromCharCode(y)
    }
    else if (y >= 97 && y <= 122 || y == 32) {
        if (y == 32) {
            return ' '
        }
        else if (y - shift < 97) {
            temp = shift - (y - 97)
            y = 123 - temp
        }
        else {
            y = y - shift
        }
        return String.fromCharCode(y)
    }
    // else {
    // 	message.channel.send("Invalid Input");
    // }
}



exports.run = function (client, message, args, args2, cmd) {

    var string = args.join(' ') //problem with slice
    var shift = parseInt(args2.join(' '))
    var array = string
    const Discord = require('discord.js')
    const config = require("./config.json");
    const embed = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}ccdecode`)
        .addField("**Usage:**", `${config.prefix}ccdecode <decode text> <shift/password>`)
        .addField("**Example:**", `${config.prefix}ccdecode khoor 3`)
        .addField("**Expected Result From Example:**", "Your answer is hello")
    if (!string && !shift) return message.channel.send({ embed: embed })
    if (!string) return message.reply("You need to fill in a string")
    if (!shift) return message.reply("You need to fill in a shift")
    //var array = temparray[0].split()
    var res = ""
    if (shift > 25) {
        shift = shift % 26;
    }
    for (var i = 0; i < string.length; i++) {
        // console.log(array[i])
        res += decode(array[i], shift)
        res.replace("undefined", " ");
        //message.channel.send("Your answer is " + res)
        // console.log(array[i])
    }

    for (; ;) {
        if (res.indexOf("undefined") != -1) {
            res = res.replace("undefined", " ");
        }
        else {
            break;
        }
    }
    message.channel.send("Your answer is " + res.replace("undefined", " "))

}