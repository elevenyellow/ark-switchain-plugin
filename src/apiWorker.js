const config = require("./config.json");
const API_BASE_URL = "https://api-testnet.switchain.com/rest/v1/";

const API_KEY = config.api_key;

const headers = {
  "Content-type": "application/json",
  Authorization: `Bearer ${API_KEY}`
};

class ApiWorker {
  constructor(client) {
    this.client = client;
  }

  async getAllCurrencies() {
    const options = {
      headers
    };
    const res = await this.client.get(`${API_BASE_URL}marketinfo`, options);
    const data = JSON.parse(res.body);
    console.log({ data, otro: "yes" });
    return data;
  }

  async exchangeAmount(fromTo, amount = 1) {
    const res = await this.client.get(
      `${API_BASE_URL}/exchange-amount/${amount}/${fromTo}?api_key=${API_KEY}`
    );
    const data = JSON.parse(res.body);
    return data;
  }

  async availableCurrencies(currency) {
    const res = await this.client.get(
      `${API_BASE_URL}/currencies-to/${currency}`
    );
    const data = JSON.parse(res.body);
    return data;
  }

  async minilalExchangeAmount(fromTo) {
    const res = await this.client.get(`${API_BASE_URL}/min-amount/${fromTo}`);
    const data = JSON.parse(res.body);
    return data;
  }

  async createExchange(params = {}) {
    const res = await this.client.post(
      `${API_BASE_URL}/min-amount/${API_KEY}`,
      params
    );
    const data = JSON.parse(res.body);
    return data;
  }

  async getCurrencyInfo(ticker) {
    const res = await this.client.get(`${API_BASE_URL}currencies/${ticker}`);
    const data = JSON.parse(res.body);
    return data;
  }

  async createTransaction(params) {
    const options = {
      headers,
      body: JSON.stringify(params)
    };
    const { body } = await this.client.post(`${API_BASE_URL}order`, options);
    return body;
  }

  async getTransactionStatus(id) {
    const options = {
      headers
    };
    const res = await this.client.get(`${API_BASE_URL}order/${id}`, options);
    const data = JSON.parse(res.body);
    return data;
  }
}

module.exports = ApiWorker;

// const config = require("./config.json");
// const API_BASE_URL = "https://changenow.io/api/v1";

// const API_KEY = config.apiKey;

// class ApiWorker {
//   constructor(client) {
//     this.client = client;
//   }

//   getAllCurrencies() {
//     // const res = await this.client.get(`${API_BASE_URL}/currencies?active=true`);
//     // const data = JSON.parse(res.body);
//     const data = ["BTC", "ETH", "ARK", "LTC", "USDT"];
//     console.log(data);
//     return data;
//   }

//   async exchangeAmount(fromTo, amount = 1) {
//     const res = await this.client.get(
//       `${API_BASE_URL}/exchange-amount/${amount}/${fromTo}?api_key=${API_KEY}`
//     );
//     const data = JSON.parse(res.body);
//     return data;
//   }

//   async availableCurrencies(currency) {
//     const res = await this.client.get(
//       `${API_BASE_URL}/currencies-to/${currency}`
//     );
//     const data = JSON.parse(res.body);
//     return data;
//   }

//   async minilalExchangeAmount(fromTo) {
//     const res = await this.client.get(`${API_BASE_URL}/min-amount/${fromTo}`);
//     const data = JSON.parse(res.body);
//     return data;
//   }

//   async createExchange(params = {}) {
//     const res = await this.client.post(
//       `${API_BASE_URL}/min-amount/${API_KEY}`,
//       params
//     );
//     const data = JSON.parse(res.body);
//     return data;
//   }

//   async getCurrencyInfo(ticker) {
//     const res = await this.client.get(`${API_BASE_URL}/currencies/${ticker}`);
//     const data = JSON.parse(res.body);
//     return data;
//   }

//   async createTransaction(params) {
//     const options = {
//       json: true,
//       headers: {
//         "Content-type": "application/json"
//       },
//       body: params
//     };
//     const { body } = await this.client.post(
//       `${API_BASE_URL}/transactions/${API_KEY}`,
//       options
//     );
//     return body;
//   }

//   async getTransactionStatus(id) {
//     const res = await this.client.get(
//       `${API_BASE_URL}/transactions/${id}/${API_KEY}`
//     );
//     const data = JSON.parse(res.body);
//     return data;
//   }
// }

// module.exports = ApiWorker;
