const SHA256 = require('crypto-js/sha256');
<<<<<<< HEAD
=======

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
>>>>>>> 74ad1682403d6513bd25fa6dd5df0c0db1a02175

class Block{
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256( this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
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
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2021", "Genesis block", "0");

    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewadAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewadAddress, this.miningReward)
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
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
akhilCoin.createTransaction(new Transaction('Alice', 'Bob', 100));
akhilCoin.createTransaction(new Transaction('Bob', 'Alice', 50));
console.log('\nStarting miner...');
akhilCoin.minePendingTransactions('akhil-address');

console.log('\nBalance of Akhil is', akhilCoin.getBalanceOfAddress('akhil-address'));



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

console.log('\nStarting miner again...');
akhilCoin.minePendingTransactions('akhil-address');

console.log('\nBalance of Akhil is', akhilCoin.getBalanceOfAddress('akhil-address'));
