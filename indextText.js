

const web3 = require('web3');
const testContractABI = require('./testTokenABI').testtokenABI;
const walletTabs =  require('./testTokenABI').walletTabs;


const infura_testnet = "https://rinkeby.infura.io/v3/1ea2d585906a47dcbbfadfccf0daf659";
const web3js = new web3(new web3.providers.HttpProvider(infura_testnet));
const testDecimals = 18;

const testContractAddress ="0x197484d380fbed34187eb6503dd4d3eaa3eda66b";

const contract = new web3js.eth.Contract(testContractABI, testContractAddress);



let i = 0;
async function getNewBalances(){
    walletTabs.forEach( async wallet => {
        contract.methods.balanceOf(wallet)
            .call().then((balance) => {
            i++;
            balance = balance / (10**testDecimals);
            console.log(wallet," => ",balance," ",i);
        });
    });
}

getNewBalances();




const bip39 = require('bip39');
const hdkey = require('hdkey');
const ethereumjsUtil = require("ethereumjs-util");
const EthereumTx = require('ethereumjs-tx');
const web3 = require('web3');
const liberiContractABI = require('./tokenABI').tokenABI;
const walletTabs =  require('./tokenABI').walletTabs;

const infura_mainnet = "https://mainnet.infura.io/v3/1ea2d585906a47dcbbfadfccf0daf659";
const web3js = new web3(new web3.providers.HttpProvider(infura_mainnet));
const liberiDecimals = 8;

const walletAddress = '0x5BaC008C46eA0Db2C7D7E2e677e59E5F20796849';
const liberiContractAddress ="0x1B14D408AA03ef320F014828F63c3D47Ac740B6B";

const contract = new web3js.eth.Contract(liberiContractABI, liberiContractAddress);


// Get Ether balance
web3js.eth.getBalance(walletAddress, (err, wei) => {
    balance = web3.utils.fromWei(wei, 'ether');
    console.log('Address ',balance,' Ether')
});

let i = 0;
async function getNewBalances(){
    walletTabs.forEach( async wallet => {
        contract.methods.balanceOf(wallet)
            .call().then((balance) => {
            i++;
            balance = balance / (10**liberiDecimals);
            console.log(wallet," => ",balance," ",i);
        });
    });
}

getNewBalances();







/*const mnemonic = bip39.generateMnemonic(); //generates string
bip39.mnemonicToSeed(mnemonic).then( seed => {

  const root = hdkey.fromMasterSeed(seed);
  const masterPrivateKey = root.privateKey.toString('hex');

  console.log('masterPrivateKey ', masterPrivateKey);

});*/






