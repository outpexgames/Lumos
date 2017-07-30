function encode(ch, shift) { //hi returns QR first if has a problem 
    var x = parseInt(ch.charCodeAt(0));
    //console.log(x)
    var temp = 0;
    if (x >= 65 && x <= 90 || x == 32) {
        if (x == 32) {
            return ' '
        }
        else if (x + shift > 90) {
            temp = shift - (90 - x)
            x = 64 + temp
        }
        else {
            x = x + shift
        }
        return String.fromCharCode(x)
    }
    else if (x >= 97 && x <= 122 || x == 32) {
        if (x == 32) {
            return ' '
        }
        else if (x + shift > 122) { //parseint!
            //console.log(x + shift)
            temp = shift - (122 - x)
            x = 96 + temp
        }
        else {
            x = x + shift
        }
        // console.log(x)
        // console.log(String.fromCharCode(x))
        return String.fromCharCode(x) //107(k)
    }
}

exports.run = function (client, message, args, args2, cmd, config) {

    var string = args.join(' ') //problem with slice
    var shift = parseInt(args2.join(' '))
    var array = string
    if (!string) return message.reply("You need to fill in a string")
    if (!shift) return message.reply("You need to fill in a shift")

    //var array = temparray[0].split()
    var res = ""
    if (shift > 25) {
        shift = shift % 26;
    }
    for (var i = 0; i < string.length; i++) {
        // console.log(array[i])
        res += encode(array[i], shift)
        res.replace("undefined", " ");
        //message.channel.sendMessage("Your answer is " + res)
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
    message.channel.sendMessage("Your answer is " + res.replace("undefined", " "))
}



