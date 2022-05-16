# Basic Sample Hardhat Project

## Hardhat  

```bash
mdkir stablenodes
cd stablenodes
yarn global add hardhat
yarn
yarn hardhat compile
yarn hardhat run scripts/sample-script.js
yarn hardhat node
```

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

```shell
yarn hardhat node --verbose
yarn hardhat run scripts/sample-script.js
```

### Upgradable

we are writing upgradeble contracts, install hardhat extension

```
https://www.npmjs.com/package/@openzeppelin/hardhat-upgrades
```

- Install dependencies  
- Update hardhat.config  
- Create a deployproxy.js

## NFT images

These are stored in https://nft.storage/
They are originally created using the scripts in /createsvg which

1. Creates the different SVG's with randomised colors
2. Uploads to nft.storage which in turn sends to IPFS
3. Returns the CID to the folder which is then used in the contract


## React

### Setup

```bash
create-react-app client
cd client
yarn
```

# TODO

1. On purchase, send funds to rewards/dev/team/dividend wallet
2. 