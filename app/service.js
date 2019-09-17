const lifeGuardClass = require('./lifeGuard');
const lifeGuard = new lifeGuardClass();
const inputTextClass = require('./utils/inputText');
const inputText = new inputTextClass();

module.exports = class Service {
    async exec() {
        
        let input = await inputText.input();
        
        input = input.split('|');
        let params = {
            pais: input[0].toUpperCase(),
            campania: input[1].toString(),
            palanca: input[2].toUpperCase(),
            cola: input[3]
        };

        let res = await lifeGuard.completeShell(params);
        console.log(res);

        //this.exec();
    }
}