/**
 * Starts up the periodic checking system.
 */

const periodicControllers = [
    require('./charts')
];

const ONE_SECOND = 1000;
const ONE_MINUTE = 60;
const LOOP_TIME = ONE_SECOND * ONE_MINUTE * 5;

function startPeriodicChecks(tg) {
    function checkStatus() {
        periodicControllers.forEach((periodicCheck) => {
            periodicCheck(tg);
        });
    }

    checkStatus();
    setInterval(checkStatus, LOOP_TIME);
}

module.exports = startPeriodicChecks;