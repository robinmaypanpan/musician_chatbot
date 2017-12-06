/**
 *Handles links to the cloud service CloudApp
 */
"use strict";

const Telegram = require('telegram-node-bot');
const {TelegramBaseController, RegexpCommand} = Telegram;

const commands = [
    new RegexpCommand(/cl\.ly/, 'handle')
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
            'Post cl.ly link - Records Cloud App link',
        ]
    }
};
