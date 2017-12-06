/**
 * Initializes the bot
 */
"use strict";

const Telegram = require('telegram-node-bot');
const {TelegramBaseController, RegexpCommand} = Telegram;
const CustomFilterCommand = require('telegram-node-bot/lib/routing/commands/CustomFilterCommand');

const commands = [
    new CustomFilterCommand($ => {
        const {voice, audio} = $.message;
        return !!(voice || audio);
    }),

];

class MediaController extends TelegramBaseController {
    handle($) {
        $.sendMessage('I can see your audio!');
    }
}

module.exports = {
    controller: MediaController,
    commands,
    help: {
        heading: 'Music',
        lines: [
            'Post Voice - Records voice message',
            'Post Audio - Records audio'
        ]
    }
};
