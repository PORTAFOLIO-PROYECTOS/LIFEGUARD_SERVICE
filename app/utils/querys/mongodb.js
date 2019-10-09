const queryMongo = {
    estrategiaCuv: (campania, palanca) => {
        return {
            CodigoCampania: campania,
            TipoPersonalizacion: palanca,
            FlagConfig: true,
            Activo: true
        };
    },
    estrategiaAll: (campania, palanca) => {
        return [
            {
                $match: {
                    "$and": [
                        { "CodigoCampania": campania },
                        { "TipoPersonalizacion": { "$in": palanca } },
                        { "FlagConfig": true },
                        { "Activo": true }
                    ]
                }
            },
            {
                $lookup: {
                    "from": "ProductoComercial",
                    "let": {
                        "codigoCampaniaEstrategia": "$CodigoCampania",
                        "cuvEstrategia": "$CUV2",
                    },
                    "pipeline": [
                        {
                            "$match": {
                                "$expr": {
                                    "$and": [
                                        { "$eq": ["$CodigoCampania", "$$codigoCampaniaEstrategia"] },
                                        { "$eq": ["$CUV", "$$cuvEstrategia"] },
                                        { "$eq": ["$IndicadorDigitable", true] }
                                    ]
                                }
                            }
                        },
                        {
                            "$project": {

                                "DescripcionCUV": 1,
                                "CodigoProducto": 1,
                                "PrecioTachado": 1,
                                "PrecioPublico": 1,
                                "Ganancia": 1,
                                "EstrategiaIdSicc": 1,
                                "MarcaId": 1,
                                "CodigoCatalogo": 1,
                                "MarcaDescripcion": 1,
                                "Categoria": 1,
                                "GrupoArticulo": 1,
                                "Linea": 1,
                                "CodigoTipoOferta": 1,
                                "FlagFestival": 1
                            }
                        }
                    ],
                    "as": "productos"
                }
            },
            {
                $unwind: {
                    "path": "$productos",
                    "preserveNullAndEmptyArrays": true
                }
            },
            {
                $project: {
                    "_id": {
                        "$concat": [
                            "$CodigoCampania",
                            ".",
                            "$CUV2",
                            ".",
                            { "$ifNull": ["$TipoPersonalizacion", ""] }
                        ]
                    },
                    "codigoCampania": "$CodigoCampania",
                    "cuv": "$CUV2",
                    "descripcion": { "$ifNull": ["$DescripcionCUV2", "$productos.DescripcionCUV"] },
                    "codigoProducto": "$productos.CodigoProducto",
                    "imagen": "$ImagenURL",
                    "imagenOrigen": { "$literal": "1" },
                    "textoBusqueda": {
                        "$concat": [
                            // {
                            //     "$ifNull": ["$DescripcionCUV2", "$productos.DescripcionCUV"]
                            // },                           
                            {
                                "$ifNull": [
                                    {
                                        "$reduce": {
                                            "input": "$Componentes.Descripcion",
                                            "initialValue": "",
                                            "in": { "$concat": ["$$value", " ", { "$ifNull": ["$$this", ""] }] }
                                        }
                                    }, ""
                                ]
                            },
                            {
                                "$ifNull": [
                                    {
                                        "$reduce": {
                                            "input": "$Componentes.NombreComercial",
                                            "initialValue": "",
                                            "in": { "$concat": ["$$value", " ", { "$ifNull": ["$$this", ""] }] }
                                        }
                                    }, ""
                                ]
                            },
                            {
                                "$ifNull": [
                                    {
                                        "$reduce": {
                                            "input": "$Componentes.NombreBulk",
                                            "initialValue": "",
                                            "in": { "$concat": ["$$value", " ", { "$ifNull": ["$$this", ""] }] }
                                        }
                                    }, ""
                                ]
                            }
                        ]
                    },
                    "tipoPersonalizacion": { "$ifNull": ["$TipoPersonalizacion", ""] },
                    "valorizado": { "$ifNull": [{ "$add": ["$Precio2", "$Ganancia"] }, "$productos.PrecioTachado"] },
                    "precio": { "$ifNull": ["$Precio2", "$productos.PrecioPublico"] },
                    "ganancia": { "$ifNull": ["$Ganancia", "$productos.Ganancia"] },
                    "zonasAgotadas": [],
                    "codigoEstrategia": "$productos.EstrategiaIdSicc",
                    "codigoTipoEstrategia": "$CodigoTipoEstrategia",
                    "marcaId": "$productos.MarcaId",
                    "limiteVenta": "$LimiteVenta",
                    "activo": { "$ifNull": ["$Activo", false] },
                    "tipoEstrategiaId": "$TipoEstrategiaId",
                    "estrategiaId": { "$ifNull": ["$EstrategiaId", { "$literal": "0" }] },
                    //"fechaModificacion": { "$ifNull": ["$FechaModificacion", { "$literal": new Date() }] },
                    //"codigoCatalogo": "$productos.CodigoCatalogo",
                    "marcas": {
                        "$ifNull": [
                            {
                                $filter: {
                                    input: { "$setIntersection": "$Componentes.NombreMarca" },
                                    as: "a",
                                    cond: { $ne: ["$$a", null] }
                                }
                            }
                            , ["$productos.MarcaDescripcion"]
                        ]
                    },
                    "categorias": {
                        "$switch": {
                            branches: [
                                {
                                    "case": { "$eq": ["$productos.FlagFestival", 1] },
                                    "then": { "$setUnion": ["$Componentes.Categoria", ["Festival"]] }
                                },
                                {
                                    "case": { "$eq": ["$productos.FlagFestival", 2] },
                                    "then": { "$setUnion": ["$Componentes.Categoria", ["Festival"]] }
                                }
                            ],
                            "default": {
                                "$ifNull": [
                                    {
                                        $filter: {
                                            input: { "$setIntersection": "$Componentes.Categoria" },
                                            as: "a",
                                            cond: { $ne: ["$$a", null] }
                                        }
                                    }
                                    , ["$productos.Categoria"]
                                ]
                            }
                        }
                    },
                    "grupoArticulos": {
                        "$ifNull": [
                            {
                                $filter: {
                                    input: { "$setIntersection": "$Componentes.GrupoArticulo" },
                                    as: "a",
                                    cond: { $ne: ["$$a", null] }
                                }
                            }
                            , ["$productos.GrupoArticulo"]
                        ]
                    },
                    "lineas": {
                        "$ifNull": [
                            {
                                $filter: {
                                    input: { "$setIntersection": "$Componentes.Linea" },
                                    as: "a",
                                    cond: { $ne: ["$$a", null] }
                                }
                            }
                            , ["$productos.Linea"]
                        ]
                    },
                    "codigoProductos": { "$ifNull": [{ "$setIntersection": "$Componentes.CodigoSap" }, ["$productos.CodigoProducto"]] },
                    "esSubCampania": { "$ifNull": ["$EsSubCampania", false] },
                    "seccion": 1,
                    "codigoTipoOferta": { "$ifNull": ["$productos.CodigoTipoOferta", ""] },
                    "flagFestival": { "$ifNull": ["$productos.FlagFestival", ""] }
                }
            }
        ];
    }
};

module.exports = queryMongo;