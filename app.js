const serviceClass = require('./app/service');
const service = new serviceClass();
const connectionMongo = require('./app/utils/poolConnectionMongo');
const connectionES = require('./app/utils/poolConnectionES');

connectionMongo.fetchAllDbs().then(() => {
    console.log("✓ correctamente => conexiones Mongo");

    connectionES.createConnection().then(() => {
        console.log("✓ correctamente => conexiones Elasticsearch");

        console.log('\nL I F E G U A R D  S E R V I C E  I S  R U N N I N G !\n');

        service.exec();

    }, () => {
        console.log("Ocurrió algo al tratar de conectar a Mongo");
    }).catch((error) => {
        console.log(error);
    });
}, () => { console.log('Ocurrió algo al tratar de conectar a Mongo'); }).catch((error) => {
    console.log(error);
});
