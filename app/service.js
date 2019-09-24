const lifeGuardClass = require('./lifeGuard');
const lifeGuard = new lifeGuardClass();

module.exports = class Service {
    async exec() {
        
        //let input = await inputText.input();
        
        //input = input.split('|');
        let params = {
            pais: 'CL',
            campania: '201914',
            palanca: 'OPM',
            chunk: 2
        };

        console.log('> Iniciando');
        console.log('> Parametros', JSON.stringify(params));
        let res = await lifeGuard.completeShell(params);
        console.log('> Terminado', res);
        
        //this.exec();
    }
}