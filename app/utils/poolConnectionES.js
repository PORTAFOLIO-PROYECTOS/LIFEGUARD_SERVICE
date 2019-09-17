const elastic = require("elasticsearch");
const config = require("../../config");

class PoolConnectionES {
    constructor() {
        if (!PoolConnectionES.instance) {
            this.connection = {};
            PoolConnectionES.instance = this;
        }

        return PoolConnectionES.instance;
    }

    getConnection() {
        return this.connection;
    }

    getClient(codigoPais) {
        return this.connection[codigoPais];
    }

    getConnectionAsync(codigoPais) {
        return new Promise((resolve, reject) => {
            try {
                if (this.connection[codigoPais]) {
                    resolve(this.connection[codigoPais]);
                } else {
                    let host = config.elasticsearch[codigoPais].host;
                    let log = config.elasticsearch[codigoPais].log;
                    this.connection[codigoPais] = elastic.Client({
                        host: `${host}`,
                        log: `${log}`
                    });
                    //console.log("successful connection to elasticsearch =>", codigoPais);
                    resolve(this.connection[codigoPais]);
                }
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    createConnection() {
        let promise = [];
        //let paisesHabilitados = config.constantes.paisesHabilitados;

        for (const key in config.elasticsearch) {
            if (config.elasticsearch.hasOwnProperty(key)) {
                //if (paisesHabilitados.indexOf(key) >= 0) 
                promise.push(this.getConnectionAsync(key));
            }
        }

        return Promise.all(promise);
    }
}

const instance = new PoolConnectionES();
Object.freeze(instance);

module.exports = instance;