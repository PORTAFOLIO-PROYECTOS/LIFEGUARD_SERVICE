const serviceClass = require('./app/service');
const service = new serviceClass();

console.log('L I F E G U A R D  S E R V I C E  I S  R U N N I N G !');
/*console.log(`

         ──▒▒▒▒▒▒───▄████▄
         ─▒─▄▒─▄▒──███▄█▀
         ─▒▒▒▒▒▒▒─▐████──█─█  L I F E G U A R D  S E R V I C E  I S  R U N N I N G !
         ─▒▒▒▒▒▒▒──█████▄
         ─▒─▒─▒─▒───▀████▀

        `);*/
service.exec();