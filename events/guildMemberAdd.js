module.exports = member => {
     let guild = member.guild;
    if (member.user.bot) {
        guild.defaultChannel.sendMessage(`A Wild Bot Has Appeared On The Server... \n The Bot's Name Is: ${member.user} OHHHHHHH... :/`)
    }
    else {
        guild.defaultChannel.sendMessage(`Welcome ${member.user} to CMS Chat!`)
    }
}