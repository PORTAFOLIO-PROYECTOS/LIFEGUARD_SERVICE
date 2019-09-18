const connectionMongo = require('../app/utils/poolConnectionMongo');
const connectionES = require('../app/utils/poolConnectionES');
const queryMongo = require('./utils/querys/mongodb');
const queryES = require('./utils/querys/elasticsearch');
const config = require('./../config');

module.exports = class LifeGuard {
    async completeShell(params) {
        console.log('Procesando...');

        let mongoClient = connectionMongo.getDb(params.pais);
        let estrategia = mongoClient.collection('Estrategia');
        let queryMongoCuv = queryMongo.estrategiaCuv(params.campania, params.palanca);
        let cuvArrayMongoFind = await estrategia.find(queryMongoCuv).toArray();
        console.log(`Existen ${cuvArrayMongoFind.length} cuv(s) en mongo`);

        console.log('Empieza validación Cuv');

        await this.asyncForEach(cuvArrayMongoFind, async (item) => {
            let queryValidaCuv = queryES.cuv(params.palanca, item.CUV2);
            let resValidacionCuv = await this.ejecutaQueryElastic(params, queryValidaCuv);

            if (resValidacionCuv.hits.total > 0) {
                console.log('Cuv falta completar', item.CUV2);
            }
        });
        
        console.log('Proceso terminado...');

        return [];
    }

    async ejecutaQueryElastic(params, body) {
        let elasticPais = config.elasticsearch[params.pais];
        let index = `${elasticPais.index}_${params.pais.toLowerCase()}_${params.campania}`;
        let type = elasticPais.type;
        return await connectionES.getClient(params.pais).search({
            index,
            type,
            body
        });
    }

    async asyncForEach(array, callback) {
        for (let i = 0; i < array.length; i++) {
            await callback(array[i], i, array);
        }
    }
}