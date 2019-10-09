const Mongo = require("./mongo");
const _mongo = new Mongo;

const Elasticsearch = require("./elasticsearch");
const _elasticsearch = new Elasticsearch();

const Utils = require("./utils/utils");
const _utils = new Utils();

module.exports = class LifeGuard {
    async completeShell(params) {
        let contador = 0;
        let documento = await _mongo.estrategia(params);

        console.log(`> Existen ${documento.length} cuv(s) activos en mongo`);

        let array = _utils.chunkArray(documento, params.chunk);

        await _utils.asyncForEach(array, async (item) => {
            let tareas = [];

            for (let i = 0; i < item.length; i++) {
                const element = item[i];
                let validacion = await _elasticsearch.validacion(params, element.cuv);

                if (!validacion) tareas.push({ taskId: "", completed: true });
                else {
                    console.log("> CUV =>", element.cuv);
                    element.textoBusqueda = element.descripcion + " " + _utils.eliminarDuplicados(element.textoBusqueda);
                    element.orden = _utils.obtenerOrden(element.tipoPersonalizacion);
                    element.seccion = _utils.obtenerSeccion(element.tipoPersonalizacion, params.pais);

                    let updateParams = {
                        getSource: _utils.getSource(),
                        getParams: _utils.getParams(element)
                    }

                    let taskId = await _elasticsearch.update(params, element._id, updateParams);

                    tareas.push({ taskId: taskId.task, completed: false });

                    console.log("> Se envio a elastic task =>", taskId.task);

                    contador++;
                }
            }

            while (!tareas.every(x => x.completed === true)) {
                for (let j = 0; j < tareas.length; j++) {
                    const element = tareas[j];
                    if (!element.completed) {
                        let resTask = await _elasticsearch.obtenerTask(element.taskId);
                        element.completed = resTask.completed;
                    }
                }
            }
        });

        console.log(`Se actualizaron ${contador} CUVS en elasticsearch`);

        return contador;
    }
};