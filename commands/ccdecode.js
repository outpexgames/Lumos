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
        // 	message.channel.sendMessage("Invalid Input");
        // }
    }



exports.run = function (client, message, args, args2, cmd, config) {

    var string = args.join(' ') //problem with slice
    var shift = parseInt(args2.join(' '))
    var array = string
    //var array = temparray[0].split()
    var res = ""
    if (shift > 25) {
        shift = shift % 26;
    }
    for (var i = 0; i < string.length; i++) {
        // console.log(array[i])
        res += decode(array[i], shift)
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