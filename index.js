//dotenv
require("dotenv").config();
//imports
const axios = require("axios");
const moment = require("moment");
//bot setup
const Discord = require('discord.js');
const client = new Discord.Client();
//command prefix
const prefix = `!`;
//controller functions
const {help} = require("./controllers/commandController");
const {insultLuis} = require("./controllers/baseController");
//constants
const { GENERAL_CHAT_ID } = process.env;
const GOOD_USERS = ["lol5p00n", "señorwolfy69", "Faenor", "BabyBot"];

let numLuisMessagesInLastMinute = 0;
let timesPlayedRPS = 0;
setInterval(() => {
    numLuisMessagesInLastMinute = 0;
    if(Math.random() < .02) {
        let hours = +moment().format("HH");
        for(let i = 0; i < hours; i++) {
            if(i % 2 === 0) {
                client.channels.get(GENERAL_CHAT_ID).send("Goo");
            } else {
                client.channels.get(GENERAL_CHAT_ID).send("Ga");
            }
        }
        client.channels.get(GENERAL_CHAT_ID).send(`It is ${+moment().format("LT").split(" ")[0]} o-cwock`);
    }
}, 1000 * 60)

setInterval(() => {
    botIsTiredOfRPS = 0;
}, 1000 * 60 * 3);

// setInterval(() => {
//     client.channels.get(GENERAL_CHAT_ID).send(`Goo Goo Ga Ga! Iz ${moment().format("LT").split(" ")[0]} o-cwock`);
// }, 1000 * 60 * 30);
//listeners
client.on('message', message => {   
    //initalize baby-speak
    message.weply = message.reply;
    //luis


    if(numLuisMessagesInLastMinute >= 10 && GOOD_USERS.includes(message.author.username) === false) {
        insultLuis(message)
        return;
    }
    if(GOOD_USERS.includes(message.author.username) === false) {
        numLuisMessagesInLastMinute++;
    }
    if(message.content.toLowerCase().includes("shut") && message.content.toLowerCase().includes("up")) {
        message.weply("No you you fucking gremlin.");
    }
    if(message.content.toLowerCase().includes("baby") && message.content.toLowerCase().includes("bot")) {
        message.weply("Mind your own bwisness.");
    }
    //commands
    if(message.content.startsWith("!")) {
        let command = message.content.substring(1);
        let args = command.split(" ");
        console.log(args);
        switch(args[0].toUpperCase().trim()) {
            case "SETCORRECTION":
                
                break;
            case "LOGIN":
                message.weply("LOGIN");
                break;
            case "RPS":
                if(timesPlayedRPS >= 8) {
                    message.weply("baby tired, milky nap time");
                    break;
                }
                let chance = Math.random();
                let wins = {
                    "paper": "scissors",
                    "rock": "paper",
                    "scissors": "rock"
                }
                if(args[1] === undefined) {
                    message.weply("Please pick either Rock, Paper, or Scissors");
                    break;
                }
                timesPlayedRPS++;
                const userDecision = args[1].toLowerCase();
                if (chance < .005) {
                    if(wins["paper"] === userDecision) {
                        message.weply("I pwick pwaper and wose :(");
                    } else if(wins["rock"] === userDecision) {
                        message.weply("I pwick wock and wose");
                    } else if(wins["scissors"] === userDecision) {
                        message.weply("I pwick scissuhs and wose")
                    }
                    break;
                } else {
                    if(userDecision === "paper") {
                        message.weply("I pwicked sissuhs and won!");
                    } else if(userDecision === "rock") {
                        message.weply("I pwicked papuh and won!");
                    } else if(userDecision === "scissors") {
                        message.weply("I pwicked wock and won!");
                    } else {
                        message.weply("Pwease pway the game wight");
                    }
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