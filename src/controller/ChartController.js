/**
 * Initializes the bot
 */
"use strict";

const Telegram = require('telegram-node-bot');
const {TelegramBaseController, TextCommand} = Telegram;

const {getDailyChart, getWeeklyChart} = require('../api/database');

const commands = [
    new TextCommand('/daily', 'dailyHandler'),
    new TextCommand('/weekly', 'weeklyHandler')
];

function postTracks($, tracks, timePhrase) {
    $.sendMessage("Check out these phat tRaX y'all have posted "+timePhrase+"!");
    tracks.forEach((trackMessage) => {
        $.forwardMessage(trackMessage.chatId, trackMessage.messageId);
    });
}

class ChartController extends TelegramBaseController {
    daily($) {

        return getDailyChart($.message.chat.id)
            .then((tracks) => {
                postTracks($, tracks, 'in the last day')
            })
            .catch((error) => {
                $.sendMessage("Uh... Actually, something fucked up. Sorry.");
            });
    }

    weekly($) {
        return getWeeklyChart($.message.chat.id)
            .then((tracks) => {
                postTracks($, tracks, 'this past week');
            })
            .catch((error) => {
                $.sendMessage("Uh... Actually, something fucked up. Sorry.");
            });
    }

    get routes() {
        return {
            'dailyHandler': 'daily',
            'weeklyHandler': 'weekly'
        }
    }
}

module.exports = {
    controller: ChartController,
    commands,
    help: {
        heading: 'Music',
        lines: [
            '/daily - Show Daily charts',
            '/weekly - Show weekly charts'
        ]
    }
};
