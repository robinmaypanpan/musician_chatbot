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
    new RegexpCommand(/clyp\.it/, 'handle'), // ClypIt
    new RegexpCommand(/cl\.ly/, 'handle'), // CloudApp
    new RegexpCommand(/soundcloud\.com/, 'handle') // Sound Clound
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
            'Post Audio - Records audio',
            'Post clyp.it link - Records Clypit link',
            'Post cl.ly link - Records CloudApp link',
            'Post Sound Cloud link - Records sound cloud link',

        ]
    }
};
