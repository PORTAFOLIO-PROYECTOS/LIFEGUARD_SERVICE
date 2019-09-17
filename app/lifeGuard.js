const connectionMongo = require('../app/utils/poolConnectionMongo');
const connectionES = require('../app/utils/poolConnectionES');
const queryMongo = require('./utils/querys/mongodb');
const config = require('./../config');

module.exports = class LifeGuard {
    async completeShell(params){
        console.log('Procesando...');

        let mongoClient = connectionMongo.getDb(params.pais);
        let estrategia = mongoClient.collection('Estrategia');
        let query = queryMongo.estrategiaCuv(params.campania, params.palanca);
        //let cuvArrayMongoFind = await estrategia.find(query).toArray();
        let cuvArrayESFind = await this.ejecutaQueryElastic(params);
        let cuvArray = [];
        

        //console.log(`Existen ${cuvArrayMongoFind.length} cuv(s) en mongo`);
        console.log(`Existen ${cuvArrayESFind.length} cuv(s) en elasticsearch`);

        /*for (let i = 0; i < cuvArrayMongoFind.length; i++) {
            const element = cuvArrayMongoFind[i];
            cuvArray.push(element.CUV2);
        }*/

        return cuvArray;
    }

    async ejecutaQueryElastic(params, body){
        let elasticPais = config.elasticsearch[params.pais];
        let index = `${elasticPais.index}_${params.pais.toLowerCase()}_${params.campania}`;
        let type = elasticPais.type;
        return connectionES.getClient(params.pais).search({
            index,
            type,
            body
        });
    }
}