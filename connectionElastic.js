const Elasticsearch = require("elasticsearch");
const config = require("./config");

class ConnectionElastic {
    constructor() {
        if (!ConnectionElastic.instance) {
            this.connection = {};
            ConnectionElastic.instance = this;
        }
        return ConnectionElastic.instance;
    }

    getConnection() {
        return this.connection;
    }

    getCluster(pais) {
        for (let i = 0; i < config.elasticsearch.clusters.length; i++) {
            const item = config.elasticsearch.clusters[i];
            return item.countries.find(x => x === pais) ? {
                host: item.host
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
                    this.connection = Elasticsearch.Client({
                        host: `${item.host}`,
                        log: ``
                    });
                    resolve(this.connection);
                }
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }

    async createConnection(pais) {
        return await this.createConnectionAsync(pais)
            .then(
                () => { console.log("✓ correctamente => conexión Elasticsearch"); },
                () => { console.log("Ocurrió algo al tratar de conectar a Elasticsearch"); }
            ).catch((error) => {
                {
                    console.error(error);
                }
            });
    }
}

const instance = new ConnectionElastic();
Object.freeze(instance);
module.exports = ConnectionElastic;