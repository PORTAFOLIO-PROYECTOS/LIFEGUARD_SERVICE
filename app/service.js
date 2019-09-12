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
        +-+ +-+ +-+ +-+ +-+ +-+ +-+ +-+ +-+   +-+ +-+ +-+ +-+ +-+ +-+ +-+   +-+ +-+   +-+ +-+ +-+ +-+ +-+ +-+ +-+
        |L| |i| |f| |e| |g| |u| |a| |r| |d|   |S| |e| |r| |v| |i| |c| |e|   |i| |s|   |r| |u| |n| |n| |i| |n| |g|
        +-+ +-+ +-+ +-+ +-+ +-+ +-+ +-+ +-+   +-+ +-+ +-+ +-+ +-+ +-+ +-+   +-+ +-+   +-+ +-+ +-+ +-+ +-+ +-+ +-+
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