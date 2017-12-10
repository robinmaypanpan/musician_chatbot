/**
 *
 */
const Telegram = require('telegram-node-bot');
const {TelegramBaseController} = Telegram;

class OtherwiseController extends TelegramBaseController {
    handle($) {
        // Do nothing
    }
}

module.exports = OtherwiseController;