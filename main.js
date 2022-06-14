const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('4ccd60599dd0726cce53a609b1403af69096f115c1032d293a8b38b4456d11c9');
const myWalletAdd = myKey.getPublic('hex');

let rosCoin = new Blockchain();

const tx1 = new Transaction(myWalletAdd, 'public key goes here', 10);
tx1.signTransaction(myKey);
rosCoin.addTransaction(tx1);

console.log('\nStarting the miner...');
rosCoin.minePendingTransactions(myWalletAdd);

console.log('\nBalance of Ros is ', rosCoin.getAddBalance(myWalletAdd));

console.log(rosCoin.isChainValid());

