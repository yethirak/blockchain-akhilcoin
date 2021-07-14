const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2021", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

}

let akhilCoin = new Blockchain();
akhilCoin.addBlock(new Block(1, "10/01/2021", { amount: 2 }));
akhilCoin.addBlock(new Block(2, "05/02/2021", { amount: 11 }));

console.log(JSON.stringify(akhilCoin, null, 4));














//tamper with data
//akhilCoin.chain[1].data = { amount: 100 };

// console.log(JSON.stringify(akhilCoin, null, 4));

    // isChainValid(){
    //     for (let i = 1; i < this.chain.length; i++) {
    //         const currentBlock = this.chain[i];
    //         const previousBlock = this.chain[i - 1];
    //         if (currentBlock.hash !== currentBlock.calculateHash()){
    //             return false;
    //         }
    //         if (currentBlock.previousHash !== previousBlock.hash){
    //             return false;
    //         }
    //     }
    //     return true;
    // }

//console.log('Is blockchain valid? '+akhilCoin.isChainValid());


//calculate hash again
//akhilCoin.chain[1].hash = akhilCoin.chain[1].calculateHash();

//console.log('Is blockchain valid? '+akhilCoin.isChainValid());