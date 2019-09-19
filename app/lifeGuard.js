const connectionMongo = require('../app/utils/poolConnectionMongo');
const connectionES = require('../app/utils/poolConnectionES');
const queryMongo = require('./utils/querys/mongodb');
const queryES = require('./utils/querys/elasticsearch');
const config = require('./../config');

module.exports = class LifeGuard {
    async completeShell(params) {
        let contador = 0;
        let mongoClient = connectionMongo.getDb(params.pais);
        let estrategia = mongoClient.collection('Estrategia');
        let queryMongoEstrategia = queryMongo.estrategiaAll(params.campania, params.palanca);
        let documento = await estrategia.aggregate(queryMongoEstrategia).toArray();

        console.log(`> Existen ${documento.length} cuv(s) activos en mongo`);

        let array = this.chunkArray(documento, params.chunk);

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

        });

        await this.asyncForEach(documento, async (item) => {
            let queryValidaCuv = queryES.cuv(params.palanca, item.cuv);
            let resValidacionCuv = await this.ejecutaQueryElastic(params, queryValidaCuv);

            if (resValidacionCuv.hits.total > 0) {
                console.log('================= Iniciando =================');
                console.log('CUV =>', item.cuv);

                item.textoBusqueda = item.descripcion + " " + this.eliminarDuplicados(item.textoBusqueda);
                item.orden = this.obtenerOrden(item.tipoPersonalizacion);
                item.seccion = this.obtenerSeccion(item.tipoPersonalizacion, params.pais);

                let _getSource = this.getSource();
                let _getParams = this.getParams(item);

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

                console.log('Se envio a elastic');
                console.log('Tarea =>', taskId.task);

                let taskComplete = false;

                while (!taskComplete) {
                    let res = await this.task(params, taskId.task);
                    taskComplete = res.completed;
                }
                console.log('================= Terminado =================\n');
                contador++;
            }
        });

        console.log(`Se actualizaron ${contador} CUVS`);
        console.log('Proceso terminado...');

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

    eliminarDuplicados(texto) {
        return texto.split(" ").filter(function (allItems, i, a) {
            return i == a.indexOf(allItems);
        }).join(" ");
    }

    obtenerSeccion(tipoPersonalizacion, pais) {
        const productSections = config.ProductSections;
        let seccion = "";
        for (let i = 0; i < productSections.length; i++) {
            const item = productSections[i];
            if (item.Code === tipoPersonalizacion) {
                const countries = item.Countries;
                for (let j = 0; j < countries.length; j++) {
                    const country = countries[j];
                    if (country.Code === pais) {
                        seccion = country.Value;
                        break;
                    }
                    if (country.Code === "Default") seccion = country.Value;
                }
            }
        }
        return seccion;
    }

    obtenerOrden(tipoPersonalizacion) {
        const orderRules = config.OrderRules;
        let order = 500;
        for (let index = 0; index < orderRules.length; index++) {
            const item = orderRules[index];
            if (item.Code === tipoPersonalizacion) {
                order = item.Value;
                break;
            }
        }
        return order;
    }

    getSource() {
        return [
            "ctx._source.descripcion = params.descripcion",//string
            "ctx._source.codigoProducto = params.codigoProducto",//string
            "ctx._source.imagen = params.imagen",//string
            "ctx._source.imagenOrigen = params.imagenOrigen",//int
            "ctx._source.textoBusqueda = params.textoBusqueda",//string
            "ctx._source.valorizado = params.valorizado",//double
            "ctx._source.precio = params.precio",//double
            "ctx._source.ganancia = params.ganancia",//double
            "ctx._source.zonasAgotadas = params.zonasAgotadas",//array
            "ctx._source.codigoEstrategia = params.codigoEstrategia",//int
            "ctx._source.codigoTipoEstrategia = params.codigoTipoEstrategia",//string
            "ctx._source.marcaId = params.marcaId",//int
            "ctx._source.limiteVenta = params.limiteVenta",//int
            "ctx._source.activo = params.activo",//string
            "ctx._source.tipoEstrategiaId = params.tipoEstrategiaId",//string
            "ctx._source.estrategiaId = params.estrategiaId",//string
            "ctx._source.marcas = params.marcas",//array
            "ctx._source.categorias = params.categorias",//array
            "ctx._source.grupoArticulos = params.grupoArticulos",//array
            "ctx._source.lineas = params.lineas",//array
            "ctx._source.codigoProductos = params.codigoProductos",
            "ctx._source.esSubCampania = params.esSubCampania",
            "ctx._source.seccion1 = params.seccion1",
            "ctx._source.orden = params.orden",
            "ctx._source.productoResumenId = params.productoResumenId",
            "ctx._source.codigoTipoOferta = params.codigoTipoOferta",
            "ctx._source.flagFestival = params.flagFestival"
        ];
    }

    getParams(data) {
        return {
            "descripcion": data.descripcion,
            "codigoProducto": data.codigoProducto,
            "imagen": data.imagen,
            "imagenOrigen": data.imagenOrigen,
            "textoBusqueda": data.textoBusqueda,
            "valorizado": data.valorizado,
            "precio": data.precio,
            "ganancia": data.ganancia,
            "zonasAgotadas": data.zonasAgotadas,
            "codigoEstrategia": data.codigoEstrategia,
            "codigoTipoEstrategia": data.codigoTipoEstrategia,
            "marcaId": data.marcaId,
            "limiteVenta": data.limiteVenta,
            "activo": data.activo,
            "tipoEstrategiaId": data.tipoEstrategiaId,
            "estrategiaId": data.estrategiaId,
            "marcas": data.marcas,
            "categorias": data.categorias,
            "grupoArticulos": data.grupoArticulos,
            "lineas": data.lineas,
            "codigoProductos": data.codigoProductos,
            "esSubCampania": data.esSubCampania,
            "seccion1": data.seccion,
            "orden": data.orden,
            "productoResumenId": data._id,
            "codigoTipoOferta": data.codigoTipoOferta,
            "flagFestival": data.flagFestival
        }
    }
}