/**
 * Initializes the bot
 */
"use strict";

const Telegram = require('telegram-node-bot');
const {TelegramBaseController, RegexpCommand} = Telegram;

const {setConfigValue} = require('../api/database');

const commands = [
    new RegexpCommand(/^\/config/)
];

class ConfigController extends TelegramBaseController {
    handle($) {
        const message = $.message.text;
        const messageBlock = message.split(' ');

        if (messageBlock.length < 3) {
            $.sendMessage("Config needs to include both a key and a value.");
            return;
        }

        const chatId = $.message.chat.id;
        const key = messageBlock[1];
        const value = messageBlock[2];

        return setConfigValue(chatId, key, value)
            .then((result) => {
                console.log('setConfigValue has result ' + JSON.stringify(result));
                if (result) {
                    $.sendMessage(key + ' is now ' + value);
                } else {
                    $.sendMessage("I'm not seeing the result I expected.");
                }
            })
            .catch((error) => {
                $.sendMessage("Uh... Actually, something fucked up. Sorry.");
            });
    }
}

module.exports = {
    controller: ConfigController,
    commands,
    help: {
        heading: 'Config',
        lines: [
            '/config acknowledgement [on/off] - Turn track acknowledgements on or off',
        ]
    }
};
