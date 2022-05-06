const { expect } = require("chai");
const { ethers } = require("hardhat");

let StableNodesNFT = {};
let stableNodesNFT = {};
const amount = "500000000000000000";
const balance = "1000000000000000000";

describe("StableNodes", function () {
  it("Connect get balances", async function () {
    StableNodesNFT = await ethers.getContractFactory("StableNodesNFT");
    stableNodesNFT = await StableNodesNFT.deploy();
    await stableNodesNFT.deployed();

    /*
     * Get Contract balance
     */
    let contractBalance = await hre.ethers.provider.getBalance(
      stableNodesNFT.address
    );
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    // /*
    //  * Get Address balance
    //  */
    // let addrBalance = await hre.ethers.provider.getBalance(addr1);
    // console.log("addr1 balance:", hre.ethers.utils.formatEther(addrBalance));
  });

  // it("Initialize contract", async function () {
  //   /*
  //    * Get signed accounds
  //    */
  //   const [owner, addr1] = await ethers.getSigners();

  //   /*
  //    * Let's approve contract
  //    */
  //   const txn = await stableNodesNFT.connect(addr1).initialize();
  //   await txn.wait();
  // });

  it("Approve contract", async function () {
    /*
     * Get signed accounds
     */
    const [owner, addr1] = await ethers.getSigners();

    /*
     * Check not approved
     */
    expect(await stableNodesNFT.connect(addr1).isContractApproved()).to.equal(
      false
    );

    /*
     * Let's approve contract
     */
    const txn = await stableNodesNFT.connect(addr1).approveContract();
    await txn.wait();

    /*
     * Let's try to buy a coffee
     */
    expect(await stableNodesNFT.connect(addr1).isContractApproved()).to.equal(
      true
    );
  });

  it("Buy node", async function () {
    /*
     * Get signed accounds
     */
    const [owner, addr1] = await ethers.getSigners();

    /*
     * Let's try to buy a node
     */
    let result = await stableNodesNFT
      .connect(addr1)
      .mintNode("My Node", { value: amount });

    expect(result?.nonce).to.equal(1);

    /*
     * Get Contract balance
     */
    let contractBalance = await hre.ethers.provider.getBalance(
      stableNodesNFT.address
    );
    console.log(
      "Buy node Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );
    expect(contractBalance).to.equal(amount);

    // /*
    //  * Let's try to buy a node with same name
    //  */
    // try {
    //   result = await stableNodesNFT
    //     .connect(addr1)
    //     .mintNode("My Node", { value: amount });
    //   expect("Did not error on same node name").to.equal(1);
    // } catch (err) {
    //   expect(JSON.stringify(err)).to.contain("Node name already taken!");
    // }

    /*
     * Let's try to buy a node with wrong price
     */
    // console.log("Let's try to buy a node with wrong price");
    try {
      result = await stableNodesNFT
        .connect(addr1)
        .mintNode("My Node 2", { value: ethers.utils.parseEther("0.1") });
      expect("Did not error on same node name").to.equal(1);
    } catch (err) {
      expect(JSON.stringify(err)).to.contain("Invalid amount to purchase node");
    }

    /*
     * Get Contract balance
     */
    contractBalance = await hre.ethers.provider.getBalance(
      stableNodesNFT.address
    );
    // console.log(
    //   "Contract balance:",
    //   hre.ethers.utils.formatEther(contractBalance)
    // );
    expect(contractBalance).to.equal(amount);

    /*
     * Let's try to buy a node with write price
     */
    // console.log("Let's try to buy a node with write price");
    result = await stableNodesNFT
      .connect(addr1)
      .mintNode("My Node 2", { value: amount });
    expect(result?.nonce).to.equal(4);

    /*
     * Get Contract balance
     */
    contractBalance = await hre.ethers.provider.getBalance(
      stableNodesNFT.address
    );
    // console.log(
    //   "Contract balance:",
    //   hre.ethers.utils.formatEther(contractBalance)
    // );
    expect(hre.ethers.utils.formatEther(contractBalance)).to.equal("1.0");
  });

  it("Check contract count total", async function () {
    const [owner, addr1] = await ethers.getSigners();

    /*
     * Check node total count
     */
    console.log("Check node total");
    result = await stableNodesNFT.connect(addr1).totalSupply();
    expect(result).to.equal(2);
  });

  it("Check nodesname array", async function () {
    const [owner, addr1] = await ethers.getSigners();

    console.log("Get node count");
    let result = await stableNodesNFT.connect(addr1).totalSupply();
    expect(result).to.equal(2);

    // console.log("Get node name");
    // result = await stableNodesNFT.connect(addr1).getNodesName(0);
    // expect(result).to.equal("My Node");

    console.log("Get node");
    result2 = await stableNodesNFT.connect(addr1).tokenOfOwnerByIndex(addr1, 0);
    expect(result2.name).to.equal(0);

    result2 = await stableNodesNFT.connect(addr1).nodeForToken(result2);
    expect(result2).to.equal("My Node");
  });

  // it("Claim", async function () {
  //   const [owner, addr1] = await ethers.getSigners();

  //   let contractBalance = await hre.ethers.provider.getBalance(
  //     stableNodesNFT.address
  //   );
  //   console.log(
  //     "Contract balance:",
  //     hre.ethers.utils.formatEther(contractBalance)
  //   );

  //   console.log("Sleeping for 2 seconds");
  //   await new Promise((r) => setTimeout(r, 5000));

  //   console.log("Claim rewards for node");
  //   let result = await stableNodesNFT.connect(addr1).claimNode("My Node");

  //   contractBalance = await hre.ethers.provider.getBalance(
  //     stableNodesNFT.address
  //   );
  //   console.log(
  //     "Contract balance:",
  //     hre.ethers.utils.formatEther(contractBalance)
  //   );

  //   expect(
  //     hre.ethers.utils.formatEther(contractBalance).substring(1, 6)
  //   ).to.equal(".9999");
  // });

  // it("ClaimAll", async function () {
  //   const [owner, addr1] = await ethers.getSigners();

  //   let contractBalance = await hre.ethers.provider.getBalance(
  //     stableNodesNFT.address
  //   );
  //   console.log(
  //     "Contract balance before claimall:",
  //     hre.ethers.utils.formatEther(contractBalance)
  //   );

  //   console.log("Sleeping for 2 seconds");
  //   await new Promise((r) => setTimeout(r, 5000));

  //   console.log("Claim rewards for node");
  //   let result = await stableNodesNFT.connect(addr1).claimAll();

  //   contractBalance = await hre.ethers.provider.getBalance(
  //     stableNodesNFT.address
  //   );
  //   console.log(
  //     "Contract balance after claimall:",
  //     hre.ethers.utils.formatEther(contractBalance)
  //   );

  //   expect(
  //     hre.ethers.utils.formatEther(contractBalance).substring(1, 6)
  //   ).to.equal(".9999");
  // });
});
