const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,timestamp,data, prevHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
        this.nonce= 0;
    }
    calculateHash(){
        return SHA256(this.index + this.prevHash + this.timestamp  + JSON.stringify(this.data)+ this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty)!== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: "+this.hash);
    }
}



class Blockchain{
    constructor(){
        this.chain = [this.createGenBlock()];
        this.difficulty= 6;
    }
    createGenBlock(){
        return new Block(0, "01/01/2022", "Gen block", "0");
    }
    getLastestBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.prevHash = this.getLastestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    
    isValid(){
        for(let  i =  1;  i  < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];
            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if (currentBlock.prevHash !==  prevBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let rosCoin = new Blockchain();
console.log('Mining 1... ');
rosCoin.addBlock(new Block(1,"10/01/2022",{ ammount: 4}));
console.log('Mining 2... ');
rosCoin.addBlock(new Block(2,"10/01/2022",{ ammount: 104}));
console.log('Mining 3... ');
rosCoin.addBlock(new Block(3,"10/01/2022",{ ammount: 10}));