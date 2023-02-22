const ethWallet = require('ethereumjs-wallet');
const Web3 = require("web3")
const fs = require('fs');
//Ethereum
// const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/10014af7158d412daa249659d2fa53db"))
//Binance
let web3 = new Web3(new Web3.providers.HttpProvider("https://eth-mainnet.g.alchemy.com/v2/vNsdNtib6FVZnIUS46i256mXSeKrh2iZ"))
let count = 0;
const start = new Date();
console.log(start);

function sleep(milliseconds) {  
    return new Promise(resolve => setTimeout(resolve, milliseconds));  
}

async function loops() {
    for(let index=0; index < 50; index++) {
        let addressData = ethWallet['default'].generate();
        let publicaddress = addressData.getAddressString();
        let privatekey = addressData.getPrivateKeyString();
        // await getBalance(privatekey, publicaddress);

        web3.eth.getBalance(publicaddress, function(err, result) {
            if (err) {
                // console.log(err)
                return;
            } else {
                count++;
                console.log(count, privatekey, publicaddress, web3.utils.fromWei(result, "ether") + " ETH");
                if (result!=0) {
                    // console.log(privatekey, publicaddress, web3.utils.fromWei(result, "ether") + " ETH");
                    const text = privatekey + ' ' + publicaddress + ' ' + web3.utils.fromWei(result, "ether") + " ETH";
                    fs.writeFile("privatekeys/"+privatekey, text, function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                    }); 
                }
            }
        })
    }
}

async function loopwhile() {
    while(1) {
        await loops();
        await sleep(10);
    }
}

loopwhile();