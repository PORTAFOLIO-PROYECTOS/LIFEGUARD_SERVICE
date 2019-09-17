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
        
        input = input.split('|');
        let params = {
            pais: input[0],
            campania: input[1],
            palanca: input[2]
        };

        await lifeGuard.completeShell(params);

        this.exec();
    }
}