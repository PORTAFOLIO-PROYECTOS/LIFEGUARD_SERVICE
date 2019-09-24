const connectionMongo = require('./utils/poolConnectionMongo');
const queryMongo = require('./utils/querys/mongodb');

module.exports = class Mongo {
    async estrategia(params) {
        let mongoClient = new connectionMongo.getDb(params.pais);
        let estrategia = mongoClient.collection('Estrategia');
        let queryMongoEstrategia = queryMongo.estrategiaAll(params.campania, params.palanca);
        return await estrategia.aggregate(queryMongoEstrategia).toArray();
    }
}