const mongoClass = require('./mongo');
const mongo = new mongoClass();
const elasticsearchClass = require('./elasticsearch');
const elasticsearch = new elasticsearchClass();
const queryES = require('./utils/querys/elasticsearch');
const utilsClass = require('./utils/utils');

module.exports = class LifeGuard {
    async completeShell(params) {
        let utils = new utilsClass();
        let contador = 0;
        let documento = await mongo.estrategia(params);

        console.log(`> Existen ${documento.length} cuv(s) activos en mongo`);

        let array = utils.chunkArray(documento, params.chunk);

        await utils.asyncForEach(array, async (item) => {
            let tareas = [];

            for (let i = 0; i < item.length; i++) {
                const element = item[i];
                let validacion = await elasticsearch.validacion(params, element.cuv);

                if (!validacion) tareas.push({ taskId: '', complete: true });
                else {
                    console.log('> CUV =>', element.cuv);
                    element.textoBusqueda = element.descripcion + " " + utils.eliminarDuplicados(element.textoBusqueda);
                    element.orden = utils.obtenerOrden(element.tipoPersonalizacion);
                    element.seccion = utils.obtenerSeccion(element.tipoPersonalizacion, params.pais);

                    let updateParams = {
                        getSource: utils.getSource(),
                        getParams: utils.getParams(element)
                    }

                    let taskId = await this.update(params, element._id, updateParams);

                    tareas.push({ taskId: taskId.task, complete: false });

                    console.log('> Se envio a elastic task =>', taskId.task);

                    contador++;
                }
            }

            while (!tareas.every(x => x.complete === true)) {
                for (let j = 0; j < tareas.length; j++) {
                    const element = tareas[j];
                    if (!element.complete) {
                        let resTask = elasticsearch.obtenerTask(params, element.taskId);
                        element.complete = resTask.complete;
                    }
                }
            }
        });

        /*await utils.asyncForEach(documento, async (item) => {
            let queryValidaCuv = queryES.cuv(params.palanca, item.cuv);
            let resValidacionCuv = await this.ejecutaQueryElastic(params, queryValidaCuv);

            if (resValidacionCuv.hits.total > 0) {

                console.log('CUV =>', item.cuv);
                item.textoBusqueda = item.descripcion + " " + utils.eliminarDuplicados(item.textoBusqueda);
                item.orden = utils.obtenerOrden(item.tipoPersonalizacion);
                item.seccion = utils.obtenerSeccion(item.tipoPersonalizacion, params.pais);

                let updateParams = {
                    getSource: utils.getSource(),
                    getParams: utils.getParams(item)
                }

                let taskId = await this.update(params, item._id, updateParams);

                console.log('Se envio a elastic task =>', taskId.task);

                let taskComplete = false;

                while (!taskComplete) {
                    let res = await this.task(params, taskId.task);
                    taskComplete = res.completed;
                }
                contador++;
            }
        });*/

        console.log(`Se actualizaron ${contador} CUVS en elasticsearch`);

        return [];
    }
}