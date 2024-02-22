`Namada-explorer` is a disposable light explorer for Namada blockchains.

## Features

- The ability to connect to RPC
- A dashboard to easily monitor chain activity
- The ability to subscribe to the latest blocks and transactions
- A search function that allows you to quickly find blocks, transactions
- A list of active validators
- A list of proposals
- Blockchain parameters

## Guide

Create .env file contain keys :

```
REACT_APP_RPC=https://proxy.heliax.click/shielded-expedition.88f17d1d14/
REACT_APP_INDEXER=https://namada-indexer.thoalt.com
REACT_APP_EXTERNAL_RPC=https://api.nodejom.xyz
REACT_APP_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDcwODQzNjMsImV4cCI6MTcxNzQ1MjM2M30.4Fk2-GpkRKK7SiTN4AgpmLUWUGTidBDYcIe-U_tacaE
```

You can check to your rpc and indexer.

To run :

```
git clone https://github.com/suntzu93/namada-explorer.git
cd namada-explorer
yarn build
yarn dev
```
