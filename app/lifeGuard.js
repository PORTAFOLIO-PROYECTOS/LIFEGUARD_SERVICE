const connectionMongo = require('../app/utils/poolConnectionMongo');
const connectionES = require('../app/utils/poolConnectionES');
const queryMongo = require('./utils/querys/mongodb');
const queryES = require('./utils/querys/elasticsearch');
const utilsClass = require('./utils/utils');
const config = require('./../config');

module.exports = class LifeGuard {
    async completeShell(params) {
        let utils = new utilsClass();
        let contador = 0;
        let mongoClient = connectionMongo.getDb(params.pais);
        let estrategia = mongoClient.collection('Estrategia');
        let queryMongoEstrategia = queryMongo.estrategiaAll(params.campania, params.palanca);
        let documento = await estrategia.aggregate(queryMongoEstrategia).toArray();

        console.log(`> Existen ${documento.length} cuv(s) activos en mongo`);

        /*let array = this.chunkArray(documento, params.chunk);

        await this.asyncForEach(array, async (item) => {
            let tareas = [];
            let terminado = false;

            for (let i = 0; i < array.length; i++) {
                //const element = array[i];
                tareas.push({ taskId: '', complete: false });
            }

            if (terminado) {
                while (!tareas.every(x => x.complete === true)) {
                    for (let j = 0; j < tareas.length; j++) {
                        const element = tareas[j];
                        
                        let taskIndex = tareas.indexOf(x => x.task === element.taskId);
                        if (task>=0) tareas[taskIndex].complete = res.completed;
                    }
                }
            }

        });*/

        await this.asyncForEach(documento, async (item) => {
            let queryValidaCuv = queryES.cuv(params.palanca, item.cuv);
            let resValidacionCuv = await this.ejecutaQueryElastic(params, queryValidaCuv);

            if (resValidacionCuv.hits.total > 0) {
                
                console.log('CUV =>', item.cuv);
                item.textoBusqueda = item.descripcion + " " + utils.eliminarDuplicados(item.textoBusqueda);
                item.orden = utils.obtenerOrden(item.tipoPersonalizacion);
                item.seccion = utils.obtenerSeccion(item.tipoPersonalizacion, params.pais);

                let _getSource = utils.getSource();
                let _getParams = utils.getParams(item);

                let body = {
                    query: {
                        bool: {
                            must_not: [{ exists: { field: "ganancia" } }],
                            must: [{ term: { "productoResumenId": item._id } }]
                        }
                    },
                    script: {
                        source: _getSource.join(";"),
                        lang: "painless",
                        params: _getParams
                    }
                };

                let taskId = await this.update(params, body);

                console.log('Se envio a elastic task =>', taskId.task);

                let taskComplete = false;

                while (!taskComplete) {
                    let res = await this.task(params, taskId.task);
                    taskComplete = res.completed;
                }
                contador++;
            }
        });

        console.log(`Se actualizaron ${contador} CUVS en elasticsearch`);

        return [];
    }

    chunkArray(array, chunk_size) {
        let result = [];
        while (array.length) {
            result.push(array.splice(0, chunk_size));
        }
        return result;
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

    async task(params, task) {
        return await connectionES.getClient(params.pais).tasks.get({
            taskId: task
        });
    }

    async update(params, body) {
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