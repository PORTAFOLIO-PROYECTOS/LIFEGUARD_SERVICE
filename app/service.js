const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const lifeGuardClass = require('./lifeGuard');
const lifeGuard = new lifeGuardClass(rl);
const inputTextClass = require('./inputText');
const inputText = new inputTextClass();

module.exports = class Service {
    async exec() {
        console.log(`

         ──▒▒▒▒▒▒───▄████▄
         ─▒─▄▒─▄▒──███▄█▀
         ─▒▒▒▒▒▒▒─▐████──█─█  L I F E G U A R D  S E R V I C E  I S  R U N N I N G !
         ─▒▒▒▒▒▒▒──█████▄
         ─▒─▒─▒─▒───▀████▀
         
        `);
        let input = await inputText.input(rl);
        if (input.length === 1 && inputText.codeInput.indexOf(input) >= 0) {
            await lifeGuard.completeShell();
        } else {
            console.log('Opción invalida');
            this.exec();
        }
    }
}