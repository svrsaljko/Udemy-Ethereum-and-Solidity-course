const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach( async () => {
  // Get a list of all accounts
  //console.log("web3: ", web3);
  accounts = await web3.eth.getAccounts()


  // Use one of those accounts to deploy
  // the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' });

    console.log("beforeEach: ", inbox);
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    console.log("inboxx: ", inbox);
  })
})
