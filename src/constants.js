const defaults = {
  bnbmainnet: {
    ticker: "bnb",
    sub: "mainnet"
  },
  usdterc20: {
    ticker: "usdt",
    sub: "erc20"
  }
};

const defaultFrom = "BTC";
const defaultTo = "ARK";
const defaultAmount = "0.1";

const errorType = {
  INACTIVE: "pair_is_inactive",
  SMALL_DEPOSIT: "deposit_too_small"
};

const statuses = {
  waiting: "waiting",
  received: "received",
  confirming: "confirming",
  exchanging: "exchanging",
  confirmed: "confirmed",
  failed: "failed",
  refunded: "refunded",
  expired: "expired"
};

const finishedStatuses = ["confirmed", "failed", "refunded", "expired"];

const exchangingStatuses = ["received", "exchanging"];

const symbolsWithTag = ["ATOM", "BNB", "EOS", "XLM", "XRP"];

module.exports = {
  defaultFrom,
  defaultTo,
  defaultAmount,
  errorType,
  statuses,
  finishedStatuses,
  exchangingStatuses,
  symbolsWithTag
};
