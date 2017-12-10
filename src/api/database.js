var MongoClient = require('mongodb').MongoClient;
const url = process.env.DATABASE_URL;

const ONE_DAY = 24 * 60 * 60;
const ONE_WEEK = 7 * ONE_DAY;

function chooseDb(client) {
    return Promise.resolve({client, db: client.db('musicianbotdb')});
}

function connectDb() {
    return MongoClient.connect(url)
        .then(chooseDb)
}

function writeMediaMessage(message) {
    const {
        chat: {id: chatId},
        from: {id: userId, username},
        messageId: messageId,
        date
    } = message;
    const messageObjectToWrite = {
        id: chatId + '-' + messageId,
        username,
        chatId,
        messageId,
        userId,
        date,
        rawMessage: message
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

function queryForMessagesWithin(chatId, time) {
    const now = new Date().getTime() / 1000;
    const then = now - time;
    const query = {
        chatId,
        date: {"$gt": then}
    };
    return function doTheThing({client, db}) {
        const messagesCollection = db.collection('messages');
        return messagesCollection
            .find(query)
            .toArray()
            .then((charts) => {
                client.close();
                console.log('Got deez chartz ' + JSON.stringify(charts));
                return charts;
            });
    }
}



module.exports = {
    addMediaMessage(message) {
        return connectDb()
            .then(writeMediaMessage(message));
    },

    getWeeklyChart(chatId) {
        return connectDb()
            .then(queryForMessagesWithin(chatId, ONE_WEEK));
    },

    getDailyChart(chatId) {
        return connectDb()
            .then(queryForMessagesWithin(chatId, ONE_DAY));
    }
};