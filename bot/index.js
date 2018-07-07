const Discord = require('discord.js');

// Auth token
const token = process.env.AUTH_TOKEN;
if (!token) {
    console.log('No auth token found, please set the AUTH_TOKEN environment variable.\n');
    process.exit();
}

// Init bot
const bot = new Discord.Client();
bot.on('ready', () => {
    console.log('Bot connected');
});

// Handle messages
bot.on('message', message => {

    // Do not respond to messages from bots
    if (message.author.bot) {
        return;
    }

    // Do not response to system messages
    if (message.system) {
        return;
    }

    // Reply to user with generic message
    try {
        message.reply("It Works!");
    } catch (e) {
        console.error(e.stack);
    }
});

console.log('Bot started');

bot.login(token);