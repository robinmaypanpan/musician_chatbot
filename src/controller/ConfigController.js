/**
 * Initializes the bot
 */
"use strict";

const Telegram = require('telegram-node-bot');
const {TelegramBaseController, RegexpCommand} = Telegram;

const {setConfigValue, getConfigValue, getAllConfigValues} = require('../api/database');

const commands = [
    new RegexpCommand(/^\/config/)
];

function updateConfig($, chatId, key, value) {
    setConfigValue(chatId, key, value)
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

function showConfig($, chatId, key) {
    getConfigValue(chatId, key)
        .then((value) => {
            $.sendMessage(key + ' is ' + value);
        })
        .catch((error) => {
            $.sendMessage('Something is wrong with this. Sorry');
        });
}

function showAllConfigs($, chatId) {
    getAllConfigValues(chatId)
        .then((configValues) => {
            const message = configValues.map(({key, value}) => key + ' is ' + value + '\n');
            $.sendMessage(message);
        });
}

class ConfigController extends TelegramBaseController {
    handle($) {
        const message = $.message.text;
        const messageBlock = message.split(' ');
        const chatId = $.message.chat.id;

        if (messageBlock.length === 3) {
            updateConfig($, chatId, messageBlock[1], messageBlock[2]);
        } else if (messageBlock.length === 2) {
            showConfig($, chatId, messageBlock[1]);
        } else {
            showAllConfigs($, chatId);
        }
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
