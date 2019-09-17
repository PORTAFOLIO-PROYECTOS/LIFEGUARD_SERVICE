const readline = require('readline');

module.exports = class InputText {

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async input() {
        return new Promise((resolve, reject) => {
            this.rl.question(`Ingresa el país, campaña y palanca (ejem. PE|201919|ODD) => \n`, (input) => { resolve(input); });
        });
    }
}