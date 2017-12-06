/**
 * Handles links to the cloud service Clyp
 */
"use strict";

const Telegram = require('telegram-node-bot');
const {TelegramBaseController, RegexpCommand} = Telegram;

const commands = [
    new RegexpCommand(/clyp\.it/, 'handle')
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
            'Post clyp.it link - Records Clypit link',
        ]
    }
};
