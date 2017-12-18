/**
 * Starts up all of the response controllers to respond to static messaging.
 */
"use strict";
const consolidatedModules = [
    require('./StartController'),
    require('./MediaMessageController'),
    require('./ChartController')
];

const HelpController = require('./HelpController')(consolidatedModules);

const {RegexpCommand} = require('telegram-node-bot');

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
        new RegexpCommand(/^\/help/, 'handle'),
    ], new HelpController());

    const OtherwiseController = require('./OtherwiseController');
    router.otherwise(new OtherwiseController())
}

module.exports = startResponseControllers;