const Service = require("./app/service");
const _service = new Service();

let params = {
    pais: "PE",
    campania: "201915",
    palanca: "SR",
    chunk: 5
};

_service.exec(params);