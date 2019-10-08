const lifeGuardClass = require('./lifeGuard');
const lifeGuard = new lifeGuardClass();

module.exports = class Service {
    async exec(params) {
        console.log(`> Iniciando`);
        console.log(`> Parametros ${JSON.stringify(params)}`);
        let res = await lifeGuard.completeShell(params);
        console.log(`> Terminado ${res}`);
        
        //this.exec();
    }
}