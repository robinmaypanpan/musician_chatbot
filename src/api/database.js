var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/musicianbotdb";

function chooseDb(client) {
    return Promise.resolve({client, db: client.db('musicianbotdb')});
}

function writeMediaMessage(message) {
    const {
        chat: {id: chatId},
        from: {id: userId},
        messageId: messageId,
        date,
    } = message;
    const messageObjectToWrite = {
        id: chatId + '-' + messageId,
        chatId,
        messageId,
        userId,
        date
    };
    return function doTheThing({client, db}) {
        const messagesCollection = db.collection('messages');
        return messagesCollection.insertOne(messageObjectToWrite)
            .then((result) => {
                console.log('Result was ' + JSON.stringify(result));
                client.close();
            });
    }
}

module.exports = {
    addMediaMessage(message) {
        return MongoClient
            .connect(url)
            .then(chooseDb)
            .then(writeMediaMessage(message));
    },

    getWeeklyChart() {
    },

    getDailyChart() {
    }
};