# Lumos
Lumos (formally PowerBot) is a multipurpose discord bot made using [discord.js](https://discord.js.org/). 
Lumos is in the middle of a "acquisition". I will keep everyone posted about the isssue. Currently, I am planning to transfer the project to someone else.

# Self Hosting Lumos
You can host Lumos on a raspberry pi, or web hosting services like AWS or Heroku. For this guide, I am only going to go over hosting on a raspberry pi/computer.

  * __**Prerequisites:**__
    * A computer that has command prompt, or terminal access.
    * A computer that has node installed on it, and the ability to install npm modules.
    * Know the basics of how to add a Discord Bot to servers, setup & get tokens, etc.
    
  * __**Instructions:**__ (This guide only works on windows. Read the 8th bullet point for more details.)
    * Download the Lumos code from Github in a zip, and unzip it.
    * Then delete the node modules folder & the .vscode folder.
    * Head over to Discord's Developer Page [here](https://discordapp.com/developers/applications/me) to register a bot. 
    * After registering a bot, grab the bot's token. This will be used in the next step when the config needs to be filled in. A Discord Bot token should look like this: `MzgxPDyNotARealTokenTk0.DhPVkg.ThisIsNotRealnDzjK_rgdOJe4`. (<------- This is not a real token.)
    * View config (example).json, then create a config.json with all the missing information filled in.
    * Make sure that the newly created config.json is in the folder where the config (example).json is.
    * Open up a command prompt or terminal, and go to the folder where all the files are (cd <file location>)
    * Open up a PowerShell in administrator mode, then run the command: `npm i -g --production windows-build-tools` NOTE: Make sure the installation is fully complete before you close the PowerShell window! <----- This will only work on windows computers... Someone fill me in via the issues tab on how to do this on mac or linux.
    * Please now close all open command prompts 
    * Then run the following commands:
    ``` 
    npm i discord.js enmap enmap-sqlite // Install enmap & enmap-sqlite (just incase the npm install does not install everything)
    npm install // To install all required npm modules
    node . // Start the bot
    ```
    * Next, use the Discord Permissions Calculator [here](https://discordapi.com/permissions.html#2146958591) to make your bot's invite link. The link provided already has the required permissions pre-checked. If you choose not to use the pre-checked link, the bot must have "ADMINISTRATOR" permissions to function. At the bottom of the page, place in your bot's client ID, which is found on your Discord Developers page.
    * Then, copy the link at the bottom of the page. That is your bot's invite link, anyone who has that link and have the "Manage Server" permission or is the server owner of a server can invite your bot to their server. 
    * To invite the bot to a server, paste the link into your browser, and select the server that you want to add the bot to. Make sure all the required permissions are checked and click "Authorize".
    * You are all set, head to your server and check the bot out!

# Adding Lumos To Your Discord Server
You can also just add Lumos to your existing server. Lumos has been already hosted for you in this option.

  * __**Prerequisites:**__
    * You need to have the "Manage Server" permission of the server __**OR**__ Be the owner of the server.
    * When adding Lumos, make sure that the bot has "ADMINISTRATOR" permissions on your server.
    * A link is provided [here](https://discordapp.com/oauth2/authorize?client_id=460610749283172353&scope=bot&permissions=2146958591) with all of the required permissions pre-selected.
   
  * __**Basic Operations Guide**__
    * The prefix of Lumos is `-`.
    * For general help, the support server & additional notes type `-help`.
    * For the full commands list, type `-commands`.
    * Each command is called using the prefix, in the following form: `-<command>` where <command> is the command. For example, to call the command ping, you would type `-ping`.
    * To check if Lumos has the correct permissions, just type `-checklist`. If `Lumos ADMINISTRATOR Permissions:` says `true` then Lumos has the required permissions to function.
    * Feel free to join [this support server](https://discord.gg/KSjW2wB) if additional help is needed!

# Lumos Features
This is not a command list. Some of the descriptions after the dash are not actually how you use that command. Use `-commands` in a server with Lumos or use this commands list link [here](https://hastebin.com/rahorilewo.xml) to find Lumos' full command list.
  * Announcements - User join & leave announcements
  * Moderation:
    * Admin/Mod Commands - kick, ban, warn, mute
    * Chat Management - purge & lockdown
  * Utility Commands - server info, user info 
  * Mathematical Commands - Full Wolfram Alpha integration, basic calculations, find the nth prime, randomize numbers, etc
  * General Chat Commands - Google search integration, YouTube search integration, avatar steal, send DMs using the bot, send embed messages in chat, show all & search server's custom emojis, etc
  * Data & Computer Related Commands - Getting information about your IP address & another IP address (Fully secured by a registered npm API, Lumos DOES NOT log your IP address), binary, morse, caesar cipher encode & decode integration
  * English Related Commands - Find random words, check if a word is an anagram
  * Fun Commands :) - rock paper scissors, party commands

# Authors
  * AirFusion45 - Owner

# Contributors 
  * Chroish#4151 (Discord Tag) - First one to start using the bot before beta & numerous bug reports
  * Peter da Best#2547 (Discord Tag) - Lumos Beta Tester & bug reporter
  * FlubberGhasted#0741 (Discord Tag) - Lumos Beta Tester & Reported major input bug
  * Alexander#4377 (Discord Tag) - Multiple bug reports (-rps, -say, anti spam [WIP]) & suggested -party command & Invited Lumos to multiple servers :) 
  * D A N#7517 (Discord Tag) - Lumos Beta Tester & requested -wolfram command
  * Peter da Best#2547 (Discord Tag) - Lumos "anti-crash" Tester (Great effort on trying to crash the bot!) :)
  * Eton#4446 (Discord Tag) [Github Profile [here](https://github.com/ethamitc)] - Added customizable welcome command w/ channel selectors. Improved on exsisting welcome msg command. Code further edited by AirFusion.

# License 
This Project is licensed under MIT License - see the LICENSE.md file for more details. The main points of the MIT License are:
  
  * This code can be used commercially
  * This code can be modified
  * This code can be distributed
  * This code can be used for private use
  * This code has no Liability
  * This code has no Warranty
  * When using this code, credit must be given to the author
  
# Credits
Here are credits for all the code I used that was from other repositories.
  * -wolfram command code from chalda's Discord Bot [here](https://github.com/chalda/DiscordBot/).
  * -botinfo command's uptime calculations code & general ideas/inspiration from Dank-Memer's Dank-Memer [here](https://github.com/Dank-Memer/Dank-Memer).
  * Majority of bot structure from AnIdiotsGuide's Tutorial-Bot [here](https://github.com/AnIdiotsGuide/Tutorial-Bot).

# Contact Me
Feel free to contact me if you find bugs, license issues, missing credits, etc. I am currently only giving out my Discord contact information, but feel free to contact me via Discord and my email.

  * Please contact me here:
    * Email: jfang.cv.ca.us@gmail.com OR jim@jimfang.me
    * Discord: AirFusion#1706

# Note/Notes 
  When self-hosting Lumos, we recommend downloading the latest release under the releases tab. As that is the most stable version.
