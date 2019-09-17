const queryElasticsearch = {
    cuv: (palanca) => {
        return {
            query: {
                bool: {
                    must_not: [
                        {
                            exists: {
                                field: "ganancia"
                            }
                        }
                    ],
                    must: [
                        {
                            term: {
                                tipoPersonalizacion: palanca
                            }
                        }
                    ]
                }
            }
        }
    }
}

module.exports = queryElasticsearch;