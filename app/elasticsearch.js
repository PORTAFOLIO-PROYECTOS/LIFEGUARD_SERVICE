const ConnectionElastic = require("../connectionElastic");
const queryES = require("./utils/querys/elasticsearch");
const { elasticsearch } = require("./../config");

module.exports = class Elasticsearch {

    async validacion(params, cuv) {
        let body = queryES.cuv(params.palanca, cuv);
        let index = `${elasticsearch.indexName}${elasticsearch.indexVersion}_${params.pais.toLowerCase()}_${params.campania}`;

        let resultado = await ConnectionElastic.getConnection().search({
            index,
            type: elasticsearch.type,
            body
        });

        return resultado.hits.total > 0 ? true : false;
    }

    async obtenerTask(task) {
        
        return await ConnectionElastic.getConnection().tasks.get({
            taskId: task
        });
    }

    async update(params, id, updateParams) {
        let body = {
            query: {
                bool: {
                    must_not: [{ exists: { field: "ganancia" } }],
                    must: [{ term: { "productoResumenId": id } }]
                }
            },
            script: {
                source: updateParams.getSource.join(";"),
                lang: "painless",
                params: updateParams.getParams
            }
        };

        let index = `${elasticsearch.indexName}${elasticsearch.indexVersion}_${params.pais.toLowerCase()}_${params.campania}`;

        let request = {
            index,
            type: elasticsearch.type,
            body,
            waitForCompletion: false,
            conflicts: "proceed"
        };

        return new Promise((resolve, reject) => {
            ConnectionElastic.getConnection().updateByQuery(request, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
};