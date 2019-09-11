const inputTextClass = require('./inputText');
const inputText = new inputTextClass();

module.exports = class LifeGuard {
    constructor(rl) {
        this.rl = rl;
    }
    async createShell(){
        let params = await inputText.inputParametros(this.rl);
        console.log(params);
    }

    async completeShell(){
        let params = await inputText.inputParametros(this.rl);
        console.log(params);
    }
}