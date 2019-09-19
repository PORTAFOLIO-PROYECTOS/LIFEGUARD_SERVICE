const serviceClass = require('./app/service');
const service = new serviceClass();
const connectionMongo = require('./app/utils/poolConnectionMongo');
const connectionES = require('./app/utils/poolConnectionES');

connectionMongo.fetchAllDbs().then(() => {
    console.log("✓ correctamente => conexiones Mongo");

    connectionES.createConnection().then(() => {
        console.log("✓ correctamente => conexiones Elasticsearch");
        service.exec();

    }, () => {
        console.log("Ocurrió algo al tratar de conectar a Mongo");
    }).catch((error) => {
        console.log(error);
    });
}, () => { console.log('Ocurrió algo al tratar de conectar a Mongo'); }).catch((error) => {
    console.log(error);
});
