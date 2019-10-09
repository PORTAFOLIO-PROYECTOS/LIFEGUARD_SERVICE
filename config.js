const config = {
    enabledCountries: ["PE", "CL", "CR", "CO", "PA"],
    mongodb: {
        clusters: [{
                host: "mongodb://usrmongotdapp:Mongo2018@PersonalizacionPRD01-shard-00-00-7arob.mongodb.net:27017,PersonalizacionPRD01-shard-00-01-7arob.mongodb.net:27017,PersonalizacionPRD01-shard-00-02-7arob.mongodb.net:27017/admin?ssl=true&replicaSet=PersonalizacionPRD01-shard-0&authSource=admin",
                countries: {
                    CO: "BelcorpColombia",
                    BO: "BelcorpBolivia",
                    SV: "BelcorpSalvador",
                    PR: "BelcorpPuertoRico"
                }
            },
            {
                host: "mongodb://usrmongotdapp:Mongo2018@PersonalizacionPRD02-shard-00-00-7arob.mongodb.net:27017,PersonalizacionPRD02-shard-00-01-7arob.mongodb.net:27017,PersonalizacionPRD02-shard-00-02-7arob.mongodb.net:27017/admin?ssl=true&replicaSet=PersonalizacionPRD02-shard-0&authSource=admin",
                countries: {
                    PE: "BelcorpPeru",
                    CL: "BelcorpChile",
                    GT: "BelcorpGuatemala",
                    PA: "BelcorpPanama"
                }
            },
            {
                host: "mongodb://usrmongotdapp:Mongo2018@PersonalizacionPRD03-shard-00-00-7arob.mongodb.net:27017,PersonalizacionPRD03-shard-00-01-7arob.mongodb.net:27017,PersonalizacionPRD03-shard-00-02-7arob.mongodb.net:27017/admin?ssl=true&replicaSet=PersonalizacionPRD03-shard-0&authSource=admin",
                countries: {
                    MX: "BelcorpMexico",
                    EC: "BelcorpEcuador",
                    DO: "BelcorpDominicana",
                    CR: "BelcorpCostaRica"
                }
            }
        ]
    },
    elasticsearch: {
        indexName: "producto_",
        indexVersion: "v2",
        type: "_doc",
        clusters: [{
                host: "https://vpc-es-sbsearch-prd-a5xq7pyb6cvphjra33ojtejvwa.us-east-1.es.amazonaws.com/",
                countries: ["CL", "CR", "PE"]
            },
            {
                host: "https://vpc-es-sbsearch2-prd-zy7ytdwgfleiwpive3meis5lzy.us-east-1.es.amazonaws.com/",
                countries: ["CO", "PA"]
            }
        ]
    },
    OrderRules: [{
            Code: "SR",
            Value: 10
        },
        {
            Code: "LAN",
            Value: 10
        },
        {
            Code: "OPT",
            Value: 10
        },
        {
            Code: "OPM",
            Value: 10
        },
        {
            Code: "LMG",
            Value: 10
        },
        {
            Code: "PAD",
            Value: 10
        },
        {
            Code: "ODD",
            Value: 10
        },
        {
            Code: "GND",
            Value: 10
        },
        {
            Code: "CAT",
            Value: 20
        },
        {
            Code: "HV",
            Value: 30
        },
        {
            Code: "LIQ",
            Value: 40
        },
        {
            Code: "default",
            Value: 50
        }
    ],
    ProductSections: [{
            Code: "CAT",
            Countries: [{
                Code: "Default",
                Value: "Catálogo"
            }]
        },
        {
            Code: "LIQ",
            Countries: [{
                Code: "PE",
                Value: "Expofertas"
            }, {
                Code: "Default",
                Value: "Liquidaciones"
            }]
        },
        {
            Code: "GND",
            Countries: [{
                Code: "Default",
                Value: "Gana+ / Ofertas"
            }]
        },
        {
            Code: "OPT",
            Countries: [{
                Code: "Default",
                Value: "Gana+ / Ofertas"
            }]
        },
        {
            Code: "ODD",
            Countries: [{
                Code: "Default",
                Value: "Gana+ / Ofertas"
            }]
        },
        {
            Code: "OPM",
            Countries: [{
                Code: "Default",
                Value: "Gana+ / Ofertas"
            }]
        },
        {
            Code: "SR",
            Countries: [{
                Code: "Default",
                Value: "Gana+ / Ofertas"
            }]
        },
        {
            Code: "HV",
            Countries: [{
                Code: "Default",
                Value: "Gana+ / Ofertas"
            }]
        },
        {
            Code: "LAN",
            Countries: [{
                Code: "Default",
                Value: "Gana+ / Ofertas"
            }]
        },
        {
            Code: "LMG",
            Countries: [{
                Code: "Default",
                Value: "Gana+ / Ofertas"
            }]
        }
    ]
}

module.exports = config;