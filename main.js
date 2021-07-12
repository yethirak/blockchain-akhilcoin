const {Blockchain, Transaction} = require('./blockchain.js');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('53d1deb3dbeec3005103afa3d38c98e6dd71687f4f5b636b192faeff83cef957');
const myWalletAddress = myKey.getPublic('hex');

let akhilCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress,'public key of receiver goes here', 10);
tx1.signTransaction(myKey);
akhilCoin.addTransaction(tx1);


console.log('\nStarting miner...');
akhilCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of Akhil is', akhilCoin.getBalanceOfAddress(myWalletAddress));

console.log('Is chain valid?'+ akhilCoin.isChainValid());

/**tamper with block chain**/
// akhilCoin.chain[1].transactions[0].amount = 1;

// console.log('Is chain valid?'+ akhilCoin.isChainValid());