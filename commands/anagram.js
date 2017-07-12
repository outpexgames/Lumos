 exports.run = function (client, message, args, args2, cmd) { 
 var first = args.join(' ');
        var second = args2.join(' ');
        first = first.replace(second, "")
        first = first.replace(" ", "")
        var reverse = first.split("").reverse().join("");

        if (reverse === second) {
            message.channel.sendMessage("Anagram");
        } else {
            message.channel.sendMessage("Not Anagram");
        }

 };