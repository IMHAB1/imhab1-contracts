# IMHAB1 Contracts

Smart contract implementation for "Edu For All DAO" project.

## Dependencies

- truffle
- @openzeppelin/contracts
- @superfluid-finance/ethereum-contracts
- @superfluid-finance/sdk-core

## Develop

```bash
# install npm packages
$ yarn install

# prepare .env file
$ cp .env.sample .env
$ open .env # then edit .env file
```

## Build

```bash
# generates truffle artifacts, typechain-ethers-v5, typechain-truffle-v5
$ yarn build
```

## Test

```bash
# (in another terminal) run ganache node by forking polygon mumbai testnet
$ yarn testrpc:polygon_mumbai

# run truffle test with testrpc
$ yarn test:polygon_mumbai
```

## Deploy

```bash
# deploy contracts to polygon mumbai testnet
$ yarn migrate:polygon_mumbai
```

#### Supported Networks

> See more [npm scripts](https://github.com/IMHAB1/imhab1-contracts/blob/main/package.json#L9-L20)

- polygon
- polygon-mumbai
- optimism
- optimism-goerli
