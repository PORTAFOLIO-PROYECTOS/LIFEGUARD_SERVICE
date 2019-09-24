const config = {
    mongodb: {
        PE: {
            connectionString: 'mongodb://usrmongotdapp:Mongo2018@PersonalizacionPRD02-shard-00-00-7arob.mongodb.net:27017,PersonalizacionPRD02-shard-00-01-7arob.mongodb.net:27017,PersonalizacionPRD02-shard-00-02-7arob.mongodb.net:27017/admin?ssl=true&replicaSet=PersonalizacionPRD02-shard-0&authSource=admin',
            database: 'BelcorpPeru',
        },
        CL: {
            connectionString: 'mongodb+srv://usrmongotdapp:Mongo2018@personalizacionqas-xfhrx.mongodb.net',
            database: 'BelcorpChile_GANAMAS',
        },
        GT: {
            connectionString: 'mongodb+srv://usrmongotdapp:Mongo2018@personalizacionqas-xfhrx.mongodb.net',
            database: 'BelcorpGuatemala',
        },
        PA: {
            connectionString: 'mongodb+srv://usrmongotdapp:Mongo2018@personalizacionqas-xfhrx.mongodb.net',
            database: 'BelcorpPanama',
        },
        CO: {
            connectionString: 'mongodb://usrmongotdapp:Mongo2018@PersonalizacionPRD01-shard-00-00-7arob.mongodb.net:27017,PersonalizacionPRD01-shard-00-01-7arob.mongodb.net:27017,PersonalizacionPRD01-shard-00-02-7arob.mongodb.net:27017/admin?ssl=true&replicaSet=PersonalizacionPRD01-shard-0&authSource=admin',
            database: 'BelcorpColombia',
        },
        BO: {
            connectionString: 'mongodb+srv://usrmongotdapp:Mongo2018@personalizacionqas-xfhrx.mongodb.net',
            database: 'BelcorpBolivia',
        },
        SV: {
            connectionString: 'mongodb+srv://usrmongotdapp:Mongo2018@personalizacionqas-xfhrx.mongodb.net',
            database: 'BelcorpSalvador',
        },
        PR: {
            connectionString: 'mongodb+srv://usrmongotdapp:Mongo2018@personalizacionqas-xfhrx.mongodb.net',
            database: 'BelcorpPuertoRico',
        },
        MX: {
            connectionString: 'mongodb+srv://usrmongotdapp:Mongo2018@personalizacionqas-xfhrx.mongodb.net',
            database: 'BelcorpMexico_GANAMAS',
        },
        EC: {
            connectionString: 'mongodb+srv://usrmongotdapp:Mongo2018@personalizacionqas-xfhrx.mongodb.net',
            database: 'BelcorpEcuador_GANAMAS',
        },
        DO: {
            connectionString: 'mongodb+srv://usrmongotdapp:Mongo2018@personalizacionqas-xfhrx.mongodb.net',
            database: 'BelcorpDominicana',
        },
        CR: {
            connectionString: 'mongodb+srv://usrmongotdapp:Mongo2018@personalizacionqas-xfhrx.mongodb.net',
            database: 'BelcorpCostaRica_GANAMAS',
        },
    },
    elasticsearch: {
        BO: {
            host: "https://vpc-es-sbsearch-qa-6lqloaf2kfljixcaekbyqxu2aa.us-east-1.es.amazonaws.com/",
            log: "",
            index: "producto_v2",
            type: "_doc"
        },
        CL: {
            host: "https://vpc-es-sbsearch-prd-a5xq7pyb6cvphjra33ojtejvwa.us-east-1.es.amazonaws.com/",
            log: "",
            index: "producto_v2",
            type: "_doc"
        },
        CO: {
            host: "https://vpc-es-sbsearch2-prd-zy7ytdwgfleiwpive3meis5lzy.us-east-1.es.amazonaws.com/",
            log: "",
            index: "producto_v2",
            type: "_doc"
        },
        CR: {
            host: "https://vpc-es-sbsearch-prd-a5xq7pyb6cvphjra33ojtejvwa.us-east-1.es.amazonaws.com/",
            log: "",
            index: "producto_v2",
            type: "_doc"
        },
        EC: {
            host: "https://vpc-es-sbsearch-qa-6lqloaf2kfljixcaekbyqxu2aa.us-east-1.es.amazonaws.com/",
            log: "",
            index: "producto_v2",
            type: "_doc"
        },
        SV: {
            host: "https://vpc-es-sbsearch-qa-6lqloaf2kfljixcaekbyqxu2aa.us-east-1.es.amazonaws.com/",
            log: "",
            index: "producto_v2",
            type: "_doc"
        },
        GT: {
            host: "https://vpc-es-sbsearch-qa-6lqloaf2kfljixcaekbyqxu2aa.us-east-1.es.amazonaws.com/",
            log: "",
            index: "producto_v2",
            type: "_doc"
        },
        MX: {
            host: "https://vpc-es-sbsearch-qa-6lqloaf2kfljixcaekbyqxu2aa.us-east-1.es.amazonaws.com/",
            log: "",
            index: "producto_v2",
            type: "_doc"
        },
        PA: {
            host: "https://vpc-es-sbsearch-qa-6lqloaf2kfljixcaekbyqxu2aa.us-east-1.es.amazonaws.com/",
            log: "",
            index: "producto_v2",
            type: "_doc"
        },
        PE: {
            host: "https://vpc-es-sbsearch-prd-a5xq7pyb6cvphjra33ojtejvwa.us-east-1.es.amazonaws.com/",
            log: "",
            index: "producto_v2",
            type: "_doc"
        },
        PR: {
            host: "https://vpc-es-sbsearch-qa-6lqloaf2kfljixcaekbyqxu2aa.us-east-1.es.amazonaws.com/",
            log: "",
            index: "producto_v2",
            type: "_doc"
        },
        DO: {
            host: "https://vpc-es-sbsearch-qa-6lqloaf2kfljixcaekbyqxu2aa.us-east-1.es.amazonaws.com/",
            log: "",
            index: "producto_v2",
            type: "_doc"
        }
    },
    OrderRules: [
        { Code: "SR", Value: 10 },
        { Code: "LAN", Value: 10 },
        { Code: "OPT", Value: 10 },
        { Code: "OPM", Value: 10 },
        { Code: "LMG", Value: 10 },
        { Code: "PAD", Value: 10 },
        { Code: "ODD", Value: 10 },
        { Code: "GND", Value: 10 },
        { Code: "CAT", Value: 20 },
        { Code: "HV", Value: 30 },
        { Code: "LIQ", Value: 40 },
        { Code: "default", Value: 50 }
    ],
    ProductSections: [
        {
            Code: "CAT",
            Countries: [{ Code: "Default", Value: "Catálogo" }]
        },
        {
            Code: "LIQ",
            Countries: [{ Code: "PE", Value: "Expofertas" }, { Code: "Default", Value: "Liquidaciones" }]
        },
        {
            Code: "GND",
            Countries: [{ Code: "Default", Value: "Gana+ / Ofertas" }]
        },
        {
            Code: "OPT",
            Countries: [{ Code: "Default", Value: "Gana+ / Ofertas" }]
        },
        {
            Code: "ODD",
            Countries: [{ Code: "Default", Value: "Gana+ / Ofertas" }]
        },
        {
            Code: "OPM",
            Countries: [{ Code: "Default", Value: "Gana+ / Ofertas" }]
        },
        {
            Code: "SR",
            Countries: [{ Code: "Default", Value: "Gana+ / Ofertas" }]
        },
        {
            Code: "HV",
            Countries: [{ Code: "Default", Value: "Gana+ / Ofertas" }]
        },
        {
            Code: "LAN",
            Countries: [{ Code: "Default", Value: "Gana+ / Ofertas" }]
        },
        {
            Code: "LMG",
            Countries: [{ Code: "Default", Value: "Gana+ / Ofertas" }]
        }
    ]
}

module.exports = config;