module.exports = member => {
     let guild = member.guild;
    if (member.user.bot) {
        guild.channels.find("name", "general").send(`A Wild Bot Has Appeared On The Server... \n The Bot's Name Is: ${member.user} OHHHHHHH... :/`)
    }
    else {
        guild.channels.find("name", "general").send(`Welcome ${member.user} to ${guild.name}`)
    }
}