 exports.run = function (client, message, args, args2, cmd, config) {
if (message.guild.member(message.author).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
            let member = message.guild.member(message.mentions.users.first());
            let role = message.guild.roles.find("name", args2.join(' '));
            member.removeRole(role).catch(console.error);
            message.channel.send(`Role ${role} has been removed from ${member} `)
        }
        else {
            message.channel.send('You do not have perms');
        }
 };