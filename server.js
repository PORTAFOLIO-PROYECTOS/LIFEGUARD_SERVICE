const args = require('minimist')(process.argv.slice(2))
const Service = require("./src/service");
const _service = new Service();

let params = {
    pais: "CO",
    campania: "202004",
    palanca: ["SR"],
    //ODD,OPM,SR,LMG,OPT,HV,LAN,GND
    chunk: 5
};

console.log(args.t);
//_service.exec(params);