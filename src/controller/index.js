/**
 * Starts up all of the response controllers to respond to static messaging.
 */
"use strict";
const consolidatedModules = [
    require('./StartController')
];

const HelpController = require('./HelpController')(consolidatedModules);

const {TextCommand} = require('telegram-node-bot');

function startResponseControllers(tg) {
    let router = tg.router;

    consolidatedModules.forEach((module) => {
        if (!module.commands || !module.controller) {
            throw new Error('Module ' + (module.help && module.help.heading) + ' incorrectly setup');
        }
        module.commands.forEach((moduleCommand) => {
            router.when(moduleCommand, new module.controller());
        });
    });

    router.when([
        new TextCommand('/help'),
        new TextCommand('/h'),
        new TextCommand('/?')
    ], new HelpController());
}

module.exports = startResponseControllers;