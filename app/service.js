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
        let input = await inputText.input(rl);
        if (input.length === 1 && inputText.codeInput.indexOf(input) >= 0) {
            switch (input) {
                case 1:
                    await lifeGuard.createShell();
                    break;
                case 2:
                    await lifeGuard.completeShell();
                    break;
            }
        } else {
            console.log('Opción invalida');
            this.exec();
        }
    }
}