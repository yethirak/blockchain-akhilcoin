const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2021", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let akhilCoin = new Blockchain();


console.log('Mining block 1...');
akhilCoin.addBlock(new Block(1, "10/01/2021", { amount: 10 }));
console.log('Block mined: ' + JSON.stringify(akhilCoin.chain[1], null, 4));
console.log('Mining block 2...');
akhilCoin.addBlock(new Block(1, "10/01/2021", { amount: 50 }));
console.log('Block mined: ' + JSON.stringify(akhilCoin.chain[2], null, 4));


















// console.log('Mining block 2...');
// akhilCoin.addBlock(new Block(2, "05/02/2021", { amount: 11 }));
// console.log('Block mined: ' + JSON.stringify(akhilCoin.chain[2], null, 4));

// console.log(JSON.stringify(akhilCoin, null, 4));