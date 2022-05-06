// scripts/upgrade-box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const StableNodesNFTV2 = await ethers.getContractFactory("StableNodesNFTV2");
  const stableNodesNFT = await upgrades.upgradeProxy(
    BOX_ADDRESS,
    StableNodesNFTV2s
  );
  console.log("stableNodesNFT upgraded");
}
