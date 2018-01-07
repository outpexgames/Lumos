# Power-Bot
Power Bot is a discord bot made using discord.js. 
Power Bot is now offically in its public test stage.

# Hosting PowerBot
You can host PowerBot on a raspberry pi, or web hosting services like AWS or heroku. For this guide, I am only going to go over hosting on a raspberry pi.

  # Requirements:
  * A computer that has command prompt, or terminal access.
  * The ability to install node and npm modules.
  * Know the basics of how to add a Discord Bot to servers, setup & get tokens, etc.
  # Instructions:
  * Download the PowerBot code from github in a zip, then delete the node modules folder.
  * Unzip the file so its a folder.
  * View config (example).json, then create a config.json with all the info filled in
  * Copy the now filled new config.json to all the folders (util folder, events folder & commands folder)
  * Open up a command prompt or terminal, and go to the folder (cd <file location>)
  * After install node (newest version, not LTS), run the command npm install.
  * Then, run the command node .
  * You are all set, everything is up and running!

# Things to keep in mind on the REPO: 
  The branch MASTER is the latest stable version.  
  The branch DEV is the lastest version (maybe unstable).
