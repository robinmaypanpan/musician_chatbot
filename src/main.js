"use strict";
/**
 * Start up our BOT!
 */

// Pull in my personal polyfills.
require('jsPolyfills');

const {BOT_KEY, NODE_ENV, PORT, WEBHOOK_URL} = process.env;
const Telegram = require('telegram-node-bot');

let tg;
if (NODE_ENV === 'production') {
    tg = new Telegram.Telegram(BOT_KEY, {
        webhook: {
            url: WEBHOOK_URL,
            port: PORT,
            host: "0.0.0.0"
        }
    });
} else {
    tg = new Telegram.Telegram(BOT_KEY);
}

// Add in the controllers to the telegram bot
require('./controller')(tg);

console.log('Bot is up and running.');

