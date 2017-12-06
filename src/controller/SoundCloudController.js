/**
 * Handles links to SoundCloud
 */
"use strict";

const Telegram = require('telegram-node-bot');
const {TelegramBaseController, RegexpCommand} = Telegram;
const CustomFilterCommand = require('telegram-node-bot/lib/routing/commands/CustomFilterCommand');

const commands = [
    new RegexpCommand(/soundcloud\.com/, 'handle')
];

class SoundCloudController extends TelegramBaseController {
    handle($) {
        $.sendMessage('I can see your audio!');
    }
}

module.exports = {
    controller: SoundCloudController,
    commands,
    help: {
        heading: 'Music',
        lines: [
            'Post Sound Cloud link - Records sound cloud link',
        ]
    }
};
