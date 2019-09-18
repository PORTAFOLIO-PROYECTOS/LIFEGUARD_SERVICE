const lifeGuardClass = require('./lifeGuard');
const lifeGuard = new lifeGuardClass();

module.exports = class Service {
    async exec() {
        
        //let input = await inputText.input();
        
        //input = input.split('|');
        let params = {
            pais: 'PE',
            campania: '201914',
            palanca: 'ODD',
            cola: 5
        };

        let res = await lifeGuard.completeShell(params);
        console.log(res);

        //this.exec();
    }
}