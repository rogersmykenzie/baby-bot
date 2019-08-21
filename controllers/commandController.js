const getCorrections = require("../index");
module.exports = {
    help: function (message) {
        message.reply("This is the help command");
    },
    addCorrection: async function (message, db, flag, correction, username) {
        return new Promise(async (resolve, reject) => {
            let numCorrections = await db.getNumCorrections();
            numCorrections = +numCorrections[0].count;
            if (numCorrections <= 50) {
                const doesFlagAlreadyExist = await db.checkIfFlagExists(flag);
                if (doesFlagAlreadyExist[0].count <= 0) {
                    try {
                        await db.addCorrection(flag, correction, username);
                        message.reply("I will wemembuh that cowection");
                        resolve();
                    } catch (e) {
                        message.reply("Oopsie Poopsie! Something went wong!");
                        reject();
                    }
                } else {
                    message.reply("That cowection alweady exists :)");
                }
            } else {
                message.reply("There awre too many cowections. Pwease wemove some and twie again.");
            }
        });
    },
    getCorrectionStatus: function(db) {
        return new Promise(async function(resolve, reject) {
            try {
                const response = await db.getCorrectionStatus();
                resolve(response);
            } catch(e) {
                reject({
                    error: e,
                    message: "SOMETHING WENT WRONG"
                });
            }
        })
    }
}