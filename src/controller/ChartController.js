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

class ChartController extends TelegramBaseController {
    daily($) {

        return getDailyChart($.message.chat.id)
            .then((chart) => {
                $.sendMessage("Check out these phat tRaX y'all have posted in the last day!");
                $.sendMessage("Oh shit, this stuff is lit." + chart);
            })
            .catch((error) => {
                $.sendMessage("Uh... Actually, something fucked up. Sorry.");
            });
    }

    weekly($) {
        return getWeeklyChart($.message.chat.id)
            .then((chart) => {
                $.sendMessage("Check out these phat tRaX y'all have posted this week!");
                $.sendMessage("Oh shit, this stuff is lit." + chart);
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
