 exports.run = function (client, message, args, args2, cmd, config) {
        message.reply(" is now AFK");
        let role = message.guild.roles.find("name", "AFK");
        let member = message.guild.member(message.author);
        member.addRole(role).catch(console.error);
 };