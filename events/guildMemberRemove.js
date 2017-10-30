module.exports = member => {
     let guild = member.guild;
     
     function getDefaultChannel(guild) {
        // if(guild.channel.has(guild.id))
        // return guild.channels.get(guild.id)

        if (guild.channels.exists("name", "general"))
        return guild.channels.find("name", "general");

    // Now we get into the heavy stuff: first channel in order where the bot can speak
    // hold on to your hats!
    return guild.channels
        .filter(c => c.type === "text" &&
            c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
        .sort((a, b) => a.position - b.position ||
            Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
        .first();
    }

    if (member.user.bot) {
       // guild.defaultChannel.send(`Goodbye to Bot ${member.user} :( `);
        getDefaultChannel(member.guild).send(`Goodbye to Bot ${member.user} :( `)

    }
    else {
        getDefaultChannel(member.guild).send(`Goodbye to user ${member.user} :(`);
    }

}

