module.exports = member => {
     let guild = member.guild;
    if (member.user.bot) {
        guild.defaultChannel.sendMessage(`Goodbye to Bot ${member.user} :( `);

    }
    else {
        guild.defaultChannel.sendMessage(`Goodbye to user ${member.user} :(`);
    }
}

