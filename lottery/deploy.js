const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
const mnemonicPhrase = require("./secret");
const providerUrl =
  "https://rinkeby.infura.io/v3/7647c0e70f9247af964ca0c97a7c5430";

const provider = new HDWalletProvider(mnemonicPhrase, providerUrl);
const web3 = new Web3(provider);

const INITIAL_STRING = "Hi there!";

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account: ", accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to ", result.options.address);
};
deploy();
