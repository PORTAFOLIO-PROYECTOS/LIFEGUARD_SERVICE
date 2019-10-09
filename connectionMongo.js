const MongoClient = require("mongodb").MongoClient;
const { mongodb } = require("./config");

class ConnectionMongo {
    constructor() {
        if (!ConnectionMongo.instance) {
            this.connection = {};
            ConnectionMongo.instance = this;
        }

        return ConnectionMongo.instance;
    }

    getConnection(pais) {
        return this.connection[pais];
    }

    getCluster(pais) {
        for (let i = 0; i < mongodb.clusters.length; i++) {
            let item = mongodb.clusters[i];
            let countries = Object.keys(item.countries);
            if (countries.find(x => x === pais)) {
                return {
                    host: item.host,
                    database: item.countries[pais]
                }
            }
        }
        return false;
    }

    createConnectionAsync(pais) {
        return new Promise((resolve, reject) => {
            try {
                if (this.connection[pais]) {
                    resolve(this.connection[pais]);
                } else {
                    let item = this.getCluster(pais);

                    MongoClient.connect(item.host, { useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
                        this.connection[pais] = client.db(item.database);
                        resolve(this.connection[pais]);
                    }, (response) => {
                        console.log(`No se pudo conectar al host del país`);
                        reject(response)
                    }).catch(err => {
                        console.error(err);
                        reject(err);
                    });
                }
            } catch (error) {
                console.error(error);
            }
        });
    }

    async createConnection(pais) {
        return await this.createConnectionAsync(pais)
            .then(
                () => {
                    console.log("✓ correctamente => conexión Mongo");
                },
                () => {
                    console.log("Ocurrió algo al tratar de conectar a Mongo");
                })
            .catch((error) => {
                console.log(error);
            });
    }
}

const instance = new ConnectionMongo();
Object.freeze(instance);
module.exports = instance;