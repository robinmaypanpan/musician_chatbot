var MongoClient = require('mongodb').MongoClient;
const {MONGODB_URI, MONGODB_DB} = process.env;

const ONE_DAY = 24 * 60 * 60;
const ONE_WEEK = 7 * ONE_DAY;

const CONFIG_VALUES = [
    'acknowledgement'
];

function chooseDb(client) {
    return Promise.resolve({client, db: client.db(MONGODB_DB)});
}

function connectDb() {
    return MongoClient.connect(MONGODB_URI)
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
        rawMessage: JSON.stringify(message)
    };
    return function doTheThing({client, db}) {
        const messagesCollection = db.collection('messages');
        return messagesCollection.insertOne(messageObjectToWrite)
            .then((result) => {
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

function retrieveConfigValue(chatId, key) {
    const query = {
        chatId,
        key
    };
    return function doTheThing({client, db}) {
        const configCollection = db.collection('config');
        return configCollection
            .findOne(query)
            .then((entry) => {
                client.close();
                console.log('Got ' + JSON.stringify(entry) + ' for ' + key);
                return entry.value;
            });
    }
}

function retrieveAllConfigValues(chatId, key) {
    const query = {
        chatId
    };
    return function doTheThing({client, db}) {
        const configCollection = db.collection('config');
        return configCollection
            .find(query)
            .toArray()
            .then((entries) => {
                client.close();
                console.log('Got ' + JSON.stringify(entries) + ' for ' + key);
                return entries;
            });
    }
}

function writeConfigValue(chatId, key, value) {
    const query = {
        chatId,
        key
    };

    const replacement = {
        chatId,
        key,
        value
    };

    const options = {
        upsert: true
    };

    if (CONFIG_VALUES.indexOf(key) < 0) {
        return Promise.reject(new Error("Not a valid key"));
    } else {
        return function doTheThing({client, db}) {
            const configCollection = db.collection('config');
            return configCollection
                .replaceOne(query, replacement, options)
                .then((result) => {
                    client.close();
                    console.log('Set config ' + key + ' to ' + value + ' with result ' + JSON.stringify(result));
                    return result;
                });
        }
    }
}

module.exports = {
    getAllConfigValues(chatId) {
        return connectDb()
            .then(retrieveAllConfigValues(chatId));
    },

    getConfigValue(chatId, key) {
        return connectDb()
            .then(retrieveConfigValue(chatId, key));
    },

    setConfigValue(chatId, key, value) {
        return connectDb()
            .then(writeConfigValue(chatId, key, value));
    },

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