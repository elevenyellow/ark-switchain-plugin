const config = require("./config.json");
const API_BASE_URL = "https://api.switchain.com/rest/v1/";
// const API_BASE_URL = "http://localhost:3020/rest/v1/";
// const API_BASE_URL = "https://api-testnet.switchain.com/rest/v1/";

const API_KEY = config.apiKey;

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
    return data;
  }

  async createOrder(params) {
    const options = {
      headers,
      body: JSON.stringify(params)
    };
    const res = await this.client.post(`${API_BASE_URL}order`, options);
    const data = JSON.parse(res.body);
    return data;
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
