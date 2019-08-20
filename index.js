//dotenv
require("dotenv").config();
//imports
const axios = require("axios");
//bot setup
const Discord = require('discord.js');
const client = new Discord.Client();
//command prefix
const prefix = `!`;
//controller functions
const {help} = require("./controllers/commandController");
const {insultLuis} = require("./controllers/baseController");

let numLuisMessagesInLastMinute = 0;

setInterval(() => {
    numLuisMessagesInLastMinute = 0;
}, 60000)

//listeners
client.on('message', message => {   
    //luis
    if(message.author.username === "CinnamonJohnboi") {
        numLuisMessagesInLastMinute++;
    }
    if(numLuisMessagesInLastMinute >= 10) {
        insultLuis(message)
    }
    //commands
    if(message.content.startsWith("!")) {
        let command = message.content.substring(1);
        let args = command.split(" ");
        switch(args[0].toUpperCase().trim()) {
            case "LOGIN":
                message.reply("LOGIN");
                break;
            case "RPS":
                if(args[1] === undefined) {
                    message.reply("Please pick either Rock, Paper, or Scissors");
                    break;
                }
                const userDecision = args[1].toUpperCase();
                if(userDecision.includes("ROCK")) {
                    message.reply("I pick Paper and win!");
                }
                else if(userDecision.includes("PAPER")) {
                    message.reply("I pick Scissors and win!")
                } else if(userDecision.includes("SCISSORS")) {
                    message.reply("I pick Rock and win!")
                } else {
                    message.reply("Hey! That's not how this game works 😡")
                }
                break;
            default: help(message);
        }
    }
})





console.log("Initializing Baby Bot");
client.login(process.env.DISCORD_TOKEN).then(response => {
    console.log("Baby Bot Initialized");
});