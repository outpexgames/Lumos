 exports.run = function (client, message, args, args2, cmd) { 
 var first = args.join(' ');
        var second = args2.join(' ');
        if (!first) {
            message.channel.sendMessage("You need to provide the first word!")
            stop();
        }
        else if (!second) {
            message.channel.sendMessage("You need to provide the second word!")
            stop();
        }
        if (first && !second) {
           message.channel.sendMessage("You need to provide the second word!") 
           stop();
        }
        first = first.replace(second, "")
        first = first.replace(" ", "")
        var reverse = first.split("").reverse().join("");

        if (reverse === second) {
            message.channel.sendMessage("Anagram");
        } else {
            message.channel.sendMessage("Not Anagram");
        }

 };