const config = require('./../../config');

module.exports = class Utils {

    async asyncForEach(array, callback) {
        for (let i = 0; i < array.length; i++) {
            await callback(array[i], i, array);
        }
    }
    
    chunkArray(array, chunk_size) {
        let result = [];
        while (array.length) {
            result.push(array.splice(0, chunk_size));
        }
        return result;
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