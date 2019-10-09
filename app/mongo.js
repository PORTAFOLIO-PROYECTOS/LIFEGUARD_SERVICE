const queryMongo = require("./utils/querys/mongodb");
const ConnectionMongo = require("../connectionMongo");

module.exports = class Mongo {
    async estrategia(params) {
        let mongoClient = ConnectionMongo.getConnection();
        let estrategia = mongoClient.collection("Estrategia");
        let queryMongoEstrategia = queryMongo.estrategiaAll(params.campania, params.palanca);
        return await estrategia.aggregate(queryMongoEstrategia).toArray();
    }
};