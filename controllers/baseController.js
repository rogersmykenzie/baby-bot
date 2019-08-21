const axios = require("axios");
module.exports = {
    insultLuis: async function(message) {
        const response = await axios.get("https://evilinsult.com/generate_insult.php?lang=en&type=json")
        if(response.data.insult.includes("Ugly ass, motherfucker")) {
            message.reply("\"Ugly ass, motherfucker\" \n--That's not what your mother said last night");
        } else {
            message.reply(response.data.insult);
        }
    }
}