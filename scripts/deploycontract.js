const hre = require("hardhat");

async function main() {
  const StableNodesNFT = await hre.ethers.getContractFactory("StableNodesNFT");
  const stableNodesNFT = await StableNodesNFT.deploy();

  await stableNodesNFT.deployed();

  console.log("stableNodesNFT deployed to:", stableNodesNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
