const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Box", function () {
  // let stableNodesNFT:Contract;
  let stableNodesNFT;
  let addr;
  const amount = "500000000000000000";
  const balance = "1000000000000000000";

  before(async function () {
    const StableNodesNFT = await ethers.getContractFactory("StableNodesNFT");
    stableNodesNFT = await upgrades.deployProxy(StableNodesNFT, [], {
      initializer: "initialize",
    });

    await stableNodesNFT.deployed();
    const [owner, addr1] = await ethers.getSigners();
    addr = addr1;
    console.log(stableNodesNFT.address, " stableNodesNFT(proxy) address");
  });

  it("Connect get balances and check nodeCost", async function () {
    let contractBalance = await ethers.provider.getBalance(
      stableNodesNFT.address
    );
    console.log("Contract balance:", ethers.utils.formatEther(contractBalance));

    // check nodeCost
    expect(await stableNodesNFT.connect(addr).nodeCost()).to.equal(
      ethers.BigNumber.from(amount)
    );
  });

  it("Approve contract NFT", async function () {
    expect(await stableNodesNFT.isContractApproved()).to.equal(false);

    const txn = await stableNodesNFT.approveContract();
    await txn.wait();

    expect(await stableNodesNFT.isContractApproved()).to.equal(true);
  });

  it("Buy node NFT", async function () {
    let result = await stableNodesNFT
      .connect(addr)
      .mintNode("My Node", { value: amount });
    expect(result?.nonce).to.equal(0);

    // Get Contract balance
    let contractBalance = await hre.ethers.provider.getBalance(
      stableNodesNFT.address
    );
    console.log(
      "Contract balance after purchase:",
      hre.ethers.utils.formatEther(contractBalance)
    );
    expect(contractBalance).to.equal(amount);
  });

  it("Buy node NFT wrong price", async function () {
    try {
      result = await stableNodesNFT.connect(addr).mintNode("My Node 2", {
        value: ethers.utils.parseEther("0.1"),
      });
      expect("Did not error on same node name").to.equal(1);
    } catch (err) {
      expect(JSON.stringify(err)).to.contain("Invalid amount to purchase node");
    }
  });

  it("Buy 2nd node NFT", async function () {
    result = await stableNodesNFT
      .connect(addr)
      .mintNode("My Node 2", { value: amount });
    expect(result?.nonce).to.equal(2);

    contractBalance = await hre.ethers.provider.getBalance(
      stableNodesNFT.address
    );
    expect(hre.ethers.utils.formatEther(contractBalance)).to.equal("1.0");
  });

  it("Check NFT count total", async function () {
    result = await stableNodesNFT.connect(addr).totalSupply();
    expect(result).to.equal(2);
  });

  it("Check tokenOfOwnerByIndex", async function () {
    // console.log(addr.address);
    result = await stableNodesNFT
      .connect(addr)
      .tokenOfOwnerByIndex(addr.address, 0);
    expect(result).to.equal(0);

    result2 = await stableNodesNFT.nodeForToken(result);
    expect(result2.name).to.equal("My Node");
  });

  it("Claim", async function () {
    let contractBalance = await hre.ethers.provider.getBalance(
      stableNodesNFT.address
    );
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );
    console.log("Sleeping for 2 seconds");
    await new Promise((r) => setTimeout(r, 5000));
    console.log("Claim rewards for node");
    let result = await stableNodesNFT.connect(addr).claimNode(0);
    contractBalance = await hre.ethers.provider.getBalance(
      stableNodesNFT.address
    );
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );
    expect(
      hre.ethers.utils.formatEther(contractBalance).substring(1, 6)
    ).to.equal(".9999");
  });
});
