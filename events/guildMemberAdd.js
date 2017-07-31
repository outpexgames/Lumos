module.exports = member => {
     let guild = member.guild;
    if (member.user.bot) {
        guild.defaultChannel.send(`A Wild Bot Has Appeared On The Server... \n The Bot's Name Is: ${member.user} OHHHHHHH... :/`)
    }
    else {
        guild.defaultChannel.send(`Welcome ${member.user} to CMS Chat!`)
    }
}