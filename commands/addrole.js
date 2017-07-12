 exports.run = function (client, message, args, args2, cmd, config) {
if (message.guild.member(message.author).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) { //roles.has is false for addroel & removerole
            let member = message.guild.member(message.mentions.users.first());
            let role = message.guild.roles.find("name", args2.join(' '));
            message.channel.send(`Role ${role} has been added to ${member} `)
            member.addRole(role).catch(console.error);
        }
        else {
            message.channel.send("You do not have perms");
        }
 };