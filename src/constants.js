const longName = {
  bnbmainnet: {
    ticker: "bnb",
    sub: "mainnet"
  },
  usdterc20: {
    ticker: "usdt",
    sub: "erc20"
  }
};

const errorType = {
  INACTIVE: "pair_is_inactive",
  SMALL_DEPOSIT: "deposit_too_small"
};

const statuses = {
  waiting: "waiting",
  confirming: "confirming",
  exchanging: "exchanging",
  sending: "sending",
  confirmed: "confirmed",
  failed: "failed",
  refunded: "refunded",
  expired: "expired"
};

const finishedStatuses = ["confirmed", "failed", "refunded", "expired"];

module.exports = {
  longName,
  errorType,
  statuses,
  finishedStatuses
};
