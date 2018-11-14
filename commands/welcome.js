exports.run = (client, message, args) => {
  if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply("You don't have the permissions required to access this command!");
  if(!message.mentions.channels.first) return message.reply('Please mention a channel! (Usage: [Prefix]welcome [#channel])');
  client.guildMemberEnmap.set(message.guild.id, message.mentions.channels.first.id);
  message.reply('Successfully set the welcome channel!');
}
