 exports.run = function (client, message, args, args2, cmd, config) {
let role = message.guild.roles.find("name", "DND/Do Not Disturb");
        let member = message.guild.member(message.author);
        message.reply(` is in Do Not Disturb mode! Please do not disturb ${member}`);
        member.addRole(role).catch(console.error);
 };