/**
 * Initializes the bot
 */
"use strict";

const Telegram = require('telegram-node-bot');
const {TelegramBaseController, RegexpCommand} = Telegram;
const CustomFilterCommand = require('telegram-node-bot/lib/routing/commands/CustomFilterCommand');

const {addMediaMessage} = require('../api/database');

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
        addMediaMessage($.message)
            .then(() => {
                const optionalArgs = {
                    reply_to_message_id: $.message.messageId,
                    disable_notification: true
                };
                $.sendMessage('Hey, cool track. I\'ll remember it for you.', optionalArgs);
            })
            .catch((error) => {
                console.error(error);
                $.sendMessage('Help! Help! Something broke!');
            });
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
