exports.run = function (client, message, args, args2, cmd) {
    var output = "";
    
    var input = args.join(' ') //converting all input in to one element of a array.
    // var array = input
    for (var i = 0; i < input.length; i++) {
        output += input[i].charCodeAt(0).toString(2) + " "; //tostring reverse enginerners hex to binary.
    }
    message.channel.send(output)
};