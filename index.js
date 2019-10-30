

const Tx = require('ethereumjs-tx').Transaction;
const web3 = require('web3');
const testContractABI = require('./testTokenABI').testtokenABI;
const walletTabs =  require('./testTokenABI').walletTabs;

const infura_testnet = "https://rinkeby.infura.io/v3/1ea2d585906a47dcbbfadfccf0daf659";
const web3js = new web3(new web3.providers.HttpProvider(infura_testnet));
const testDecimals = 18;
let amountToSend = 221;

const myAddress = '0x54B191C381060a6b26D9540D7EB389d2F30476bD';
const toAddress = "0x2389d6eedcc212d9b4bf82c62c36031ea904f265";
const testContractAddress ="0x197484d380fbed34187eb6503dd4d3eaa3eda66b";
const myPrivateKey = '401D12BFCEA7B6B694FDA3FF66B0446C646DD98F56798AC6D2D3D7F6C885D162';
const privateKey = new Buffer.from(myPrivateKey, 'hex');
const amount = web3.utils.toHex(amountToSend * (10 ** testDecimals));
const contractForTransfert = new web3js.eth.Contract(testContractABI, testContractAddress, {from: myAddress});


// get transaction count, later will used as nonce
web3js.eth.getTransactionCount(myAddress)
    .then( (count) => {

        const rawTransaction = {
            "from":myAddress,
            "gasPrice":web3.utils.toHex(2 * 1e9),
            "gasLimit":web3.utils.toHex(210000),
            "to":testContractAddress,
            "value":"0x0",
            "data":contractForTransfert.methods.transfer(toAddress, amount).encodeABI(),
            "nonce":web3.utils.toHex(count)
        };

        const transaction = new Tx(rawTransaction, {'chain':'rinkeby'});
        transaction.sign(privateKey);
        web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
            .on('transactionHash', transactionHash => {
                console.log('transactionHash ', transactionHash);
            })
            .on('receipt', result => { /*console.log('result ', result)*/ })
            .on('confirmation', result => {
                console.log('confirmation ', result);
                if (result === 6) {
                    console.log("Transaction valide ", result)
                }
            });

    })
    .catch( e => {
        console.log('Error ', e)
    });




async function getNewBalances(){
    walletTabs.forEach( async wallet => {
        contract.methods.balanceOf(wallet)
            .call().then((balance) => {
            balance = balance / (10**testDecimals);
            console.log(wallet," => ",balance," ",i);
        });
    });
}