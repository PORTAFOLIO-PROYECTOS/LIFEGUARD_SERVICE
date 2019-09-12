const readline = require('readline');

module.exports = class InputText {

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.input1 = "\n    1.- Crear cascarones faltantes";
        this.input2 = "\n    2.- Completar cascarones";
        this.question = `¿Qué proceso deseas ejecutar?${this.input1}${this.input2}\n\nIngrese opcion => `;
        this.codeInput = ["1", "2"];
    }

    async input() {
        return new Promise((resolve, reject) => {
            this.rl.question(`Ingresa la `, (input) => { resolve(input); });
        });
    }
}