// // scripts/create-box.js
// const { ethers, upgrades } = require("hardhat");

// async function main() {
//   const StableNodesNFT = await ethers.getContractFactory("StableNodesNFT");
//   const stableNodesNFT = await upgrades.deployProxy(StableNodesNFT, []);
//   await stableNodesNFT.deployed();
//   console.log("stableNodesNFT deployed to:", stableNodesNFT.address);
// }

// main();

// scripts/1.deploy_box.ts
// import { ethers } from "hardhat";
// import { upgrades } from "hardhat";
const { ethers, upgrades } = require("hardhat");
async function main() {
  const Box = await ethers.getContractFactory("StableNodesNFT");
  console.log("Deploying StableNodesNFT...");
  const box = await upgrades.deployProxy(Box, [], {
    initializer: "initialize",
  });

  console.log(box.address, " StableNodesNFT(proxy) address");
  console.log(
    await upgrades.erc1967.getImplementationAddress(box.address),
    " getImplementationAddress"
  );
  console.log(
    await upgrades.erc1967.getAdminAddress(box.address),
    " getAdminAddress"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
