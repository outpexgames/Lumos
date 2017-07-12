exports.run = function (client, message, args, args2, cmd1) {
    
    if (message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')){
        let messagecount = parseInt(args2.join(' '));
         message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
    }
    else {
        message.reply('Insufficant Permissions').catch(console.error)
    }
};