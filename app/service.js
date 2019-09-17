const lifeGuardClass = require('./lifeGuard');
const lifeGuard = new lifeGuardClass();
const inputTextClass = require('./utils/inputText');
const inputText = new inputTextClass();

module.exports = class Service {
    async exec() {
        
        let input = await inputText.input();
        
        input = input.split('|');
        let params = {
            pais: input[0],
            campania: input[1],
            palanca: input[2]
        };

        let res = await lifeGuard.completeShell(params);
        console.log(res);

        this.exec();
    }
}