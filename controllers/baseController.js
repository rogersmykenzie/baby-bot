const axios = require("axios");
module.exports = {
    insultLuis: async function(message) {
        const response = await axios.get("https://evilinsult.com/generate_insult.php?lang=en&type=json")
        message.reply(response.data.insult);
    }
}