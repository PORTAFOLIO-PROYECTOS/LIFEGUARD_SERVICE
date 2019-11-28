const config = {
    enabledCountries: ["PE", "CL", "CR", "CO", "PA"],
    mongodb: {
        clusters: [{
                host: "mongodb://xxx",
                countries: {
                    CO: "BelcorpColombia",
                    BO: "BelcorpBolivia",
                    SV: "BelcorpSalvador",
                    PR: "BelcorpPuertoRico"
                }
            },
            {
                host: "mongodb://xxx",
                countries: {
                    PE: "BelcorpPeru",
                    CL: "BelcorpChile",
                    GT: "BelcorpGuatemala",
                    PA: "BelcorpPanama"
                }
            },
            {
                host: "mongodb://xxx",
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
                host: "xxx",
                countries: ["CL", "CR", "PE"]
            },
            {
                host: "xxx",
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