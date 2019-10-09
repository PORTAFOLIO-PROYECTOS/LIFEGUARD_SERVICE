const Service = require("./app/service");
const _service = new Service();

let params = {
    pais: "CO",
    campania: "201916",
    palanca: ["SR","OPM"],
    //ODD,OPM,SR,LMG,OPT,HV,LAN,GND
    chunk: 5
};

_service.exec(params);