// scripts/create-box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const StableNodesNFT = await ethers.getContractFactory("StableNodesNFT");
  const stableNodesNFT = await upgrades.deployProxy(StableNodesNFT, [42]);
  await stableNodesNFT.deployed();
  console.log("stableNodesNFT deployed to:", stableNodesNFT.address);
}

main();
