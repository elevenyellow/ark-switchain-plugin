const explorers = {
  BTC: {
    mainnet: "blockchain.com/btc",
    testnet: "live.blockcypher.com/btc-testnet",
    paths: { address: "address", tx: "tx" }
  },
  LTC: {
    mainnet: "insight.litecore.io",
    testnet: "testnet.litecore.io",
    paths: { address: "address", tx: "tx" }
  },
  ETH: {
    mainnet: "etherscan.io",
    testnet: "kovan.etherscan.io",
    paths: { address: "address", tx: "tx" }
  },
  ETC: {
    mainnet: "blockscout.com/etc/mainnet",
    testnet: "kottiexplorer.ethernode.io",
    paths: { address: "address", tx: "tx" }
  },
  XRP: {
    mainnet: "xrpscan.com",
    testnet: "xrpscan.com",
    paths: { address: "account", tx: "tx" }
  },
  BCHABC: {
    mainnet: "explorer.bitcoin.com",
    testnet: "blockexplorer.one/bitcoin-cash/testnet",
    paths: { address: "address", tx: "tx" }
  },
  BSV: {
    mainnet: "whatsonchain.com",
    testnet: "whatsonchain.com",
    paths: { address: "address", tx: "tx" }
  },
  BTG: {
    mainnet: "explorer.bitcoingold.org/insight/",
    testnet: "explorer.bitcoingold.org/insight/",
    paths: { address: "address", tx: "tx" }
  },
  EOS: {
    mainnet: "eosq.app",
    testnet: "eosq.app",
    paths: { address: "account", tx: "tx" }
  },
  BNB: {
    mainnet: "explorer.binance.org",
    testnet: "explorer.binance.org",
    paths: { address: "address", tx: "tx" }
  },
  DASH: {
    mainnet: "insight.dash.org/insight",
    testnet: "insight.dash.org/insight",
    paths: { address: "address", tx: "tx" }
  },
  DGB: {
    mainnet: "digiexplorer.info",
    testnet: "digiexplorer.info",
    paths: { address: "address", tx: "tx" }
  },
  ZEC: {
    mainnet: "explorer.zcha.in",
    testnet: "explorer.zcha.in",
    paths: { address: "accounts", tx: "transactions" }
  },
  ADA: {
    mainnet: "cardanoexplorer.com",
    testnet: "cardano-explorer.cardano-testnet.iohkdev.io",
    paths: { address: "address", tx: "tx" }
  },
  NANO: {
    mainnet: "www.nanode.co",
    testnet: "www.nanode.co",
    paths: { address: "account", tx: "block" }
  },
  NEO: {
    mainnet: "neoscan.io",
    testnet: "neoscan.io",
    paths: { address: "address", tx: "transaction" }
  },
  TRX: {
    mainnet: "tronscan.org/#",
    testnet: "tronscan.org/#",
    paths: { address: "address", tx: "transaction" }
  },
  XLM: {
    mainnet: "stellarchain.io",
    testnet: "stellarchain.io",
    paths: { address: "address", tx: "tx" }
  },
  ATOM: {
    mainnet: "www.mintscan.io",
    testnet: "www.mintscan.io",
    paths: { address: "account", tx: "txs" }
  },
  DCR: {
    mainnet: "mainnet.decred.org",
    testnet: "mainnet.decred.org",
    paths: { address: "address", tx: "tx" }
  },
  XZC: {
    mainnet: "explorer.zcoin.io",
    testnet: "testexplorer.zcoin.io",
    paths: { address: "address", tx: "tx" }
  },
  XTZ: {
    mainnet: "mvp.tezblock.io",
    testnet: "mvp.tezblock.io",
    paths: { address: "account", tx: "transaction" }
  },
  ARK: {
    mainnet: "explorer.ark.io",
    testnet: "explorer.ark.io",
    paths: { address: "wallets", tx: "transaction" }
  }
};

const getLink = ({ asset, path, network = "mainnet", hash }) => {
  const explorer = explorers[asset]
    ? explorers[asset][network]
    : explorers["ETH"][network]; // erc20 tokens
  const obj = explorers[asset]
    ? explorers[asset].paths[path]
    : explorers["ETH"].paths[path];
  const url = `https://${explorer}/${obj}/${hash}`;
  return url;
};

module.exports = {
  getLink,
  explorers
};
