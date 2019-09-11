const readline = require('readline');

module.exports = class InputText {

    constructor() {
        this.input1 = "\n    1.- Crear cascarones faltantes";
        this.input2 = "\n    2.- Completar cascarones";
        this.question = `¿Qué proceso deseas ejecutar?${this.input1}${this.input2}\n\nIngrese opcion => `;
        this.codeInput = ["1", "2"];
    }

    async input(rl) {
        return new Promise((resolve, reject) => {
            rl.question(this.question, (input) => { resolve(input); });
        });
    }

    async inputParametros(rl) {
        return new Promise((resolve, reject) => {
            rl.question("Ingresa campaña, palanca y país de la siguiente manera campaña|palanca|pais => ", (input) => { resolve(input); });
        });
    }
}