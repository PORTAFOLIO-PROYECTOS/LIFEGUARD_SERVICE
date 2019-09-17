const connectionMongo = require('../app/utils/poolConnectionMongo');
const connectionES = require('../app/utils/poolConnectionES');
const queryMongo = require('./utils/querys/mongodb');

module.exports = class LifeGuard {
    async completeShell(params){
        let mongoClient = connectionMongo.getDb(params.pais.toUpperCase());
        let estrategia = mongoClient.collection('Estrategia');
        let query = queryMongo.estrategiaCuv(params.campania, params.palanca);
        let cuvArrayFind = await estrategia.find(query).toArray();
        let cuvArray = [];

        for (let i = 0; i < cuvArrayFind.length; i++) {
            const element = cuvArrayFind[i];
            cuvArray.push(element.CUV2);
        }

        return cuvArray;
    }


}