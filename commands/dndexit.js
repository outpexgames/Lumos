 exports.run = function (client, message, args, args2, cmd, config) {
  let role = message.guild.roles.find("name", "DND/Do Not Disturb");
        let member = message.guild.member(message.author);
        message.reply(` ${member} has exited Do Not Disturb mode!`);
        member.removeRole(role).catch(console.error);
 };