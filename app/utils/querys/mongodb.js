const queryMongo = {
    estrategiaCuv: (campania, palanca) => {
        return {
            CodigoCampania: campania,
            TipoPersonalizacion: palanca,
            FlagConfig: true,
            Activo: true
        }
    }
}

module.exports = queryMongo;