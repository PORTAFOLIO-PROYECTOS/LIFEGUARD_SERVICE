const queryElasticsearch = {
    cuv: (palanca, cuv) => {
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
                        },
                        {
                            term:{
                                cuv: cuv
                            }
                        }
                    ]
                }
            }
        }
    }
}

module.exports = queryElasticsearch;