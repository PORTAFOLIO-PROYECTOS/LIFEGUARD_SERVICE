const queryMongo = require("./utils/querys/mongodb");
const ConnectionMongo = require("../connectionMongo");

module.exports = class Mongo {
    async estrategia(params) {
        let mongoClient = ConnectionMongo.getConnection(params.pais);
        let estrategia = mongoClient.collection("Estrategia");
        let queryMongoEstrategia = queryMongo.estrategiaAll(params.campania, params.palanca);
        return await estrategia.aggregate(queryMongoEstrategia).toArray();
    }
};