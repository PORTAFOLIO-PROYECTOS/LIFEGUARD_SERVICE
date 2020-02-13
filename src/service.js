const LifeGuardClass = require("./lifeGuard");
const _lifeGuard = new LifeGuardClass();

const ConnectionMongo = require("../connectionMongo");
const ConnectionElastic = require("../connectionElastic");

module.exports = class Service {
    async exec(params) {
        console.log(`> Iniciando`);
        // se crea conexiones una sola vez para mongo y elastic
        await ConnectionMongo.createConnection(params.pais);
        await ConnectionElastic.createConnection(params.pais);
        
        console.log(`> Parametros ${JSON.stringify(params)}`);
        let res = await _lifeGuard.completeShell(params);
        console.log(`Se actualizaron ${res} CUVS en elasticsearch`);
    }

    async tackUpdate(){
        
    }
    
}