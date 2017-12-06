/**
 * Initializes the bot
 */
"use strict";

const Telegram = require('telegram-node-bot');
const {TelegramBaseController, TextCommand} = Telegram;

const commands = [
    new TextCommand('/start')
];

class StartController extends TelegramBaseController {
    handle($) {
        $.sendMessage('Hello World');
    }
}

module.exports = {
    controller: StartController,
    commands,
    help: {
        heading: 'Config',
        lines: [
            '/start - Initializes this bot'
        ]
    }
};
