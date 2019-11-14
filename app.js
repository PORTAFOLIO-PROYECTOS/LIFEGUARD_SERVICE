const Service = require("./app/service");
const _service = new Service();

let params = {
    pais: "CL",
    campania: "201917",
    palanca: ["OPM"],
    //ODD,OPM,SR,LMG,OPT,HV,LAN,GND
    chunk: 5
};

_service.exec(params);