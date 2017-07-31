module.exports = member => {
     let guild = member.guild;
    if (member.user.bot) {
        guild.defaultChannel.send(`Goodbye to Bot ${member.user} :( `);

    }
    else {
        guild.defaultChannel.send(`Goodbye to user ${member.user} :(`);
    }

}

