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

    getConnection() {
        return this.connection;
    }

    getCluster(pais) {
        for (let i = 0; i < mongodb.clusters.length; i++) {
            let item = mongodb.clusters[i];
            let countries = Object.keys(item.countries);
            return countries.find(x => x === pais) ? {
                host: item.host,
                database: item.countries[pais]
            } : false;
        }
        return false;
    }

    createConnectionAsync(pais) {
        return new Promise((resolve, reject) => {
            try {
                if (this.connection) {
                    resolve(this.connection);
                } else {
                    let item = this.getCluster(pais);

                    MongoClient.connect(item.host, { useNewUrlParser: true }).then(client => {
                        this.connection = client.db(item.database);
                        resolve(this.connection);
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
                () => { console.log("✓ correctamente => conexión Mongo"); },
                () => { console.log('Ocurrió algo al tratar de conectar a Mongo'); })
            .catch((error) => {
                console.log(error);
            });
    }
}

const instance = new ConnectionMongo();
Object.freeze(instance);
module.exports = instance;