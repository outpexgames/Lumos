 exports.run = function (client, message, args, args2, cmd, config) {
        let role = message.guild.roles.find("name", "AFK");
        let member = message.guild.member(message.author);
        message.reply(" is no longer AFK");
        member.removeRole(role).catch(console.error);
 };