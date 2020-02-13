const Service = require("./app/service");
const _service = new Service();

let params = {
    pais: "CO",
    campania: "202004",
    palanca: ["SR"],
    //ODD,OPM,SR,LMG,OPT,HV,LAN,GND
    chunk: 5
};

_service.exec(params);