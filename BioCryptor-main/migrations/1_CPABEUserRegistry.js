const CPABEUserRegistry = artifacts.require("CPABEUserRegistry");

module.exports = async function (deployer, network, accounts) {
  const abi = CPABEUserRegistry.abi; // Extract ABI from the compiled contract
  const bytecode = CPABEUserRegistry.bytecode; // Extract Bytecode

  for (let i = 0; i < 6; i++) {
    const account = accounts[i]; // Iterate over the first 10 accounts
    const web3Contract = new web3.eth.Contract(abi);

    const contractInstance = await web3Contract
      .deploy({
        data: bytecode,
        arguments: [`Account ${i}`], // Pass constructor argument
      })
      .send({
        from: account,
        gas: 1500000,
        gasPrice: "30000000000",
      });

    console.log(
      `Contract deployed from account: ${account}, at address: ${contractInstance.options.address}`
    );
  }
};
