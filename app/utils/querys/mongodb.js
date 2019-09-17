const queryMongo = {
    estrategiaCuv: (campania, palanca) => {
        return {
            CodigoCampania: campania.toString(),
            TipoPersonalizacion: palanca.toString(),
            FlagConfig: true,
            Activo: true
        }
    }
}

module.exports = queryMongo;