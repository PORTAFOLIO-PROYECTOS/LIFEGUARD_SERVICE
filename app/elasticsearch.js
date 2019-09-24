const connectionES = require('../app/utils/poolConnectionES');
const queryES = require('./utils/querys/elasticsearch');
const config = require('./../config');

module.exports = class Elasticsearch {

    async validacion(params, cuv) {
        let body = queryES.cuv(params.palanca, cuv);
        let elasticPais = config.elasticsearch[params.pais];
        let index = `${elasticPais.index}_${params.pais.toLowerCase()}_${params.campania}`;
        let type = elasticPais.type;
        let resultado = await connectionES.getClient(params.pais).search({
            index,
            type,
            body
        });

        return resultado.hits.total > 0 ? true : false;
    }

    async obtenerTask(params, task) {
        return await connectionES.getClient(params.pais).tasks.get({
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

        let elasticPais = config.elasticsearch[params.pais];
        let index = `${elasticPais.index}_${params.pais.toLowerCase()}_${params.campania}`;

        let request = {
            index,
            type: "_doc",
            body,
            waitForCompletion: false,
            conflicts: "proceed"
        };

        return new Promise((resolve, reject) => {
            connectionES.getClient(params.pais).updateByQuery(request, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }
}