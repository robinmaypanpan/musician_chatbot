var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/musicianbotdb";

function connectToDB() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function(err, db) {
            if (err) reject(err);
            console.log("Database created!");
            resolve(db);
        });

    });
}

function writeMediaMessage(message) {
    const {
        chatId,
        messageId,
        date,
        userId
    } = message;
    const messageObjectToWrite = {
        chatId,
        messageId,
        userId,
        date
    };
    return function(db) {
        return new Promise((resolve, reject) => {
            var messagesCollection = db.collection('messages');
            messagesCollection.insertOne(messageObjectToWrite, function(err, result) {
                if (err) reject(err);
                console.log('Message ' + messageObjectToWrite + ' written');
                console.log('Result was ' + json.stringify(result));
                resolve();
            });
        });
    }
}

function closeDB(db, data) {
    db.close();
    return Promise.resolve(data);
}

module.exports = {
    addMediaMessage(message) {
        return connectToDB()
            .then(writeMediaMessage(message))
            .then(closeDB);
    },

    getWeeklyChart() {
    },

    getDailyChart() {
    }
};