yarn hardhat compile
cp artifacts/contracts/Greeter.sol/Greeter.json client/src/utils
yarn hardhat run --network localhost scripts/sample-script.js