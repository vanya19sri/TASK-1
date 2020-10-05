const SHA256 = require('crypto-js/sha256');

class block{
    constructor(height,body,time,previoushash = ''){
        this.height = height;
        this.body = body;
        this.time = time;
        this.previoushash = previoushash;
        this.hash = this.calculatehash();
    }
    calculatehash(){
        return SHA256(this.height + this.previoushash + this.time + JSON.stringify(this.body)).toString();
    }
}

class blockchain{
    constructor(){
        this.chain = [this.creategenesisblock()];
    }
    creategenesisblock(){
        return new Block("1325438", "Genesis Block", "1430016722", "0");
    }
    getlatestblock(){
        return this.chain[this.chain.length - 1];
    }
    addblocl(newblock){
        newblock.previoushash = this.getlatestblock().hash;
        newblock.hash = newblock.calculatehash();
        this.chain.push(newblock);
    }
    ischainvalid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentblock = this.chain[i];
            const previousblock = this.chain[i - 1];

            if(currentblock.hash !== currentblock.calculatehash()){
                return false;
            }
            if(currentblock.previoushash !== previousblock.hash){
                return false;
            }
        }
        return true;
    }
}

var x = new Blockchain();
x.addBlock(new Block("1325438", {coins: 69}, "1529001822"));
x.addBlock(new Block("3325438", {coins: 420}, "1769003822"));

console.log('Is blockchain valid?' + x.ischainvalid());
//console.log(JSON.stringify(x, null, 4));