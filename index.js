//dotenv
require("dotenv").config();
//bot setup
const Discord = require('discord.js');
const client = new Discord.Client();
//command prefix
const prefix = `!`;
//omar message count
let omarMessages = 0; 
//reset message count every minute
setInterval(() => { 
    console.log('test');
}, 60 * 1000);

client.on('message', message => {   
    if(message.author.username === "señorwolfy69") {
        omarMessages++;
    }
})


client.login(process.env.DISCORD_TOKEN);