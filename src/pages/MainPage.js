const ApiWorker = require("../apiWorker");
const style = require("./mainPageStyles");
const { defaultFrom, defaultTo, defaultAmount } = require("../constants");
const { pairToObject } = require("../utils/validators");

const {
  pluginContainer,
  formContainer,
  mainPageHeader,
  mainHeader,
  subTitle,
  mainBlock,
  labelsBlock,
  formBlock,
  inputWrapper,
  exchangeButton,
  input,
  exchangeInputTitle,
  exchangeInputSearch,
  arrow,
  sequenceBlock,
  circle,
  line,
  exchangeSequence,
  toggleButton,
  coinIcon,
  selectContainer,
  searchInput,
  currencyListContainer,
  currencyList,
  currencyItem,
  coinName,
  coinTicker,
  inputLoader,
  sreachIcon,
  subName,
  footer,
  starsSubTitle,
  starsSubTitleText,
  bigStar,
  smallStar
} = style;

const {
  faArrowsAltV,
  faSpinner,
  faLongArrowAltDown,
  faLongArrowAltUp,
  faSearch,
  faExternalLinkAlt
} = walletApi.fontAwesomeIcons;

module.exports = {
  template: `
    <div class="rounded-lg px-0 py-2 flex flex-col" style="${pluginContainer}" @click="outSideClick">
      <div style="${mainPageHeader}">
        <img src="https://www.switchain.com/img/logo.svg" id="sw-logo">
        <div class="sm:block hidden" style="width: 1px; height: 40px; margin: 0 15px 0 10px;"></div>
        <div class="sm:block hidden" style="color: #FFF; font-size: 14px; margin-top:10px">best cryptocurrency exchange rates</div>
      </div>
      <div style="${formContainer}" class="px-3">
        <div v-if="initializing">
          <Loader />
        </div>
        <div v-else class="lg:w-4/5 w-full lg:p-2 p-1 flex flex-col lg:flex-row" style="${mainBlock}">
          <div style="${labelsBlock}">
            <h1 style="${mainHeader}">Best exchange rates</h1>
            <p style="${subTitle}">Fast coin swaps free of custody</p>
            <div style="${starsSubTitle}">
              <p style="${starsSubTitleText}">What You See Is What You Get</p>
              <img style="${bigStar}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGPSURBVHgBrVRLUsJAEO2ecaMrPIHhBMraKgk7YJPcADmBeALxBMAN9AasxF1Ey703MJ7ArLCkTNpOTCzzmWTG4q0y/Zvp168DYADy+hY9D49McoRJMEh04QvGJil7JsGAYgQQBUYpuoExPSDFa3KQYOHp3ZtOnj5FMT0ZDGgymYHz+4XU1U3SoihHT4Zwc4i9h8Z56HUghV227Z+DBpA8uwXyYMbvtNRh4oT9rYLRZ5tfU9rnLi8TihIKBE4BcQS7wZKLj2MKczOgx8GEb57Bf0EQMCfXeLaaZ6bSkNNuPO7GAhMQ0xVRD3v3/l+zUkW0Hs7ZewF6xRcQfUyrVFUrU1oPbhrnwsWxu5qo3PUyRWj+cyIc17sVIM9l+W7foRkBK6atWjp1B3Lrlm/lQVJJ+/EeuaoydRQ5hfOSB9mJlcKX3BZuVs6pkqIcPRXaTszJzoirdMOVNFV3ID/ttPgLRFGnWDx5WWwLw05KmZImBUXo/Gh7U1qcXBT7WKJtfsiCj9q/cKCnvg2GYMoqO/gGeuWYpiw2NTYAAAAASUVORK5CYII=" />
              <img  style="${smallStar}"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGPSURBVHgBrVRLUsJAEO2ecaMrPIHhBMraKgk7YJPcADmBeALxBMAN9AasxF1Ey703MJ7ArLCkTNpOTCzzmWTG4q0y/Zvp168DYADy+hY9D49McoRJMEh04QvGJil7JsGAYgQQBUYpuoExPSDFa3KQYOHp3ZtOnj5FMT0ZDGgymYHz+4XU1U3SoihHT4Zwc4i9h8Z56HUghV227Z+DBpA8uwXyYMbvtNRh4oT9rYLRZ5tfU9rnLi8TihIKBE4BcQS7wZKLj2MKczOgx8GEb57Bf0EQMCfXeLaaZ6bSkNNuPO7GAhMQ0xVRD3v3/l+zUkW0Hs7ZewF6xRcQfUyrVFUrU1oPbhrnwsWxu5qo3PUyRWj+cyIc17sVIM9l+W7foRkBK6atWjp1B3Lrlm/lQVJJ+/EeuaoydRQ5hfOSB9mJlcKX3BZuVs6pkqIcPRXaTszJzoirdMOVNFV3ID/ttPgLRFGnWDx5WWwLw05KmZImBUXo/Gh7U1qcXBT7WKJtfsiCj9q/cKCnvg2GYMoqO/gGeuWYpiw2NTYAAAAASUVORK5CYII=" />
            </div>
          </div>
          <div style="${formBlock}">
            <div style="${inputWrapper}">
              <div style="${exchangeInputTitle}">You send</div>
              <input type="text" v-model.number="amount" @keyup="startRecount" style="${input}" @input="isNumber($event)"/>
              <div class="cursor-pointer" style="${exchangeInputSearch}" ref="fromSearchBtn" @click="openSelectFrom">
                <span v-if="from">
                  {{fromTicker}}
                </span>
                <span v-else class='currency-coin-ticker coin-ticker-to'>
                  {{fromTicker}}
                </span>
                <div class="currencies-container currencies-to-container"></div>
                <div style="${arrow}"></div>
              </div>
              <div style="${selectContainer} display: none;" ref="currencySelectFrom">
                <div style="${sreachIcon}"><font-awesome-icon :icon="faSearch" size="lg"/></div>

                <input type="text" style="${searchInput}" ref="searchFrom" v-model="fromFilter">
                <div style="${currencyListContainer}">
                  <ul v-if="isListFromOpen" style="${currencyList}">
                    <li v-for="fromCurrency in filtredFrom" style="${currencyItem}" v-bind:key="fromCurrency"
                      class="hover:shadow-md" @click="() => selectCoinFrom(fromCurrency)"
                      >
                      <span style="${coinTicker}">{{fromCurrency}}</span>
                      <span style="${coinName}">{{fromCurrency}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div style="${sequenceBlock}">
              <div style="${circle}"></div>
              <div style="${line}"></div>
              <span style="${exchangeSequence}">{{sequence}}</span>
              <v-popoveroffset="1">
                <button class="pl-3" style="padding-bottom: 4px; color: #3bee81; font-size: 12px;">Expected rate</button>
                <template slot="popover" >
                  <div
                    style="background-color: white; max-width: 250px; padding: 20px; border-radius: 3px; box-shadow: 0 4px 20px rgba(0,0,0,.45);"
                  >
                    <h4 style="color: #5c5780; font-size: 16px; margin-bottom: 10px;">This is an expected rate</h4>
                    <p
                      style="color: #2b2b37; font-size: 14px; margin: 20px 0;"
                    >Switchain will pick the best rate for you during the moment of the exchange.</p>
                    <a
                      href="https://www.switchain.com/faq"
                      style="color: #3bee81; font-size: 12px;"
                      target="_blank"
                      rel="noopener"
                    >
                      <div class="flex items-center">
                        Learn More
                        <div style="font-size: 6px; margin-left: 3px; padding-bottom: 2px;">
                          <font-awesome-icon :icon="faExternalLinkAlt" size="lg" />
                        </div>
                      </div>
                    </a>
                  </div>
                </template>
              </v-popover>
              <div style="${toggleButton}" @click="toggleCurrancies">
                <font-awesome-icon :icon="upArrow" size="lg"/>
                <font-awesome-icon :icon="downArrow" size="lg"/>
              </div>
            </div>
            <div style="${inputWrapper}">
              <div style="${exchangeInputTitle}">You get</div>
              <input type="text" disabled style="${input}" :value="isCounting ? '' : amountTo"/>
              <span v-if="isCounting" style="${inputLoader}">
                <font-awesome-icon :icon="spinner" size="lg" rotation="180" spin/>
              </span>
              <div class="cursor-pointer" style="${exchangeInputSearch}" ref="toSearchBtn" @click="openSelectTo">
                <span v-if="to">
                {{toTicker}}
                </span>
                <span v-else>
                  {{toTicker}}
                </span>
                <div class="currencies-container currencies-to-container"></div>
                <div style="${arrow}"></div>
              </div>
              <div style="${selectContainer} display: none;" ref="currencySelectTo">
              <div style="${sreachIcon}"><font-awesome-icon :icon="faSearch" size="lg"/></div>
              <input type="text" style="${searchInput}" ref="searchTo" v-model="toFilter">
              <div style="${currencyListContainer}">
                <ul v-if="isListToOpen" style="${currencyList}">
                  <li v-for="toCurrency in filtredTo" style="${currencyItem}" v-bind:key="toCurrency"
                    class="hover:shadow-md" @click="() => selectCoinTo(toCurrency)">
                    <span style="${coinTicker}">{{toCurrency}}</span>
                  </li>
                </ul>
              </div>
            </div>
            </div>
            <router-link :to="{ name: 'stepper'}">
              <button class="hover:opacity-75" style="${exchangeButton}">Exchange</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  `,
  components: {},
  data() {
    return {
      spinner: faSpinner,
      arrow: faArrowsAltV,
      upArrow: faLongArrowAltUp,
      downArrow: faLongArrowAltDown,
      faSearch: faSearch,
      faExternalLinkAlt,

      amount: Number(defaultAmount),
      amountTo: 0,
      currencies: [],
      marketInfo: [],
      from: null,
      to: null,
      api: {},
      isCounting: false,
      recountTimer: null,
      recountTimeout: null,
      initializing: true,
      fromFilter: "",
      toFilter: "",
      sequence: "",
      isListFromOpen: false,
      isListToOpen: false
    };
  },

  computed: {
    fromTicker() {
      return this.from || defaultFrom;
    },
    toTicker() {
      return this.to || defaultTo;
    },
    filtredFrom() {
      let filter = this.currencies.filter(currency => currency !== this.from);
      if (this.fromFilter) filter = filter.filter(c => c === this.fromFilter);
      return filter;
    },
    filtredTo() {
      const filter = this.currencies.filter(currency => currency !== this.to);
      if (this.toFilter) filter = filter.filter(c => c === this.toFilter);
      return filter;
    }
  },

  methods: {
    outSideClick(event) {
      const domElements = event.path;
      const cfl = this.refs.currencySelectFrom;
      const ctl = this.refs.currencySelectTo;
      if (!cfl || !ctl) {
        return;
      }
      if (
        !domElements.includes(cfl) &&
        !domElements.includes(this.refs.fromSearchBtn)
      ) {
        cfl.style.display = "none";
        this.fromFilter = "";
        this.isListFromOpen = false;
      }
      if (
        !event.path.includes(ctl) &&
        !domElements.includes(this.refs.toSearchBtn)
      ) {
        ctl.style.display = "none";
        this.toFilter = "";
        this.isListToOpen = false;
      }
    },
    countSequence() {
      const price =
        this.amountTo && this.amountTo !== "-" && this.amount
          ? Number(this.amountTo / this.amount).toFixed(7)
          : 0;
      return `1 ${this.from ? this.from : defaultFrom} ≈ ${price || ""} ${
        this.to ? this.to : "ETH"
      }`;
    },

    async getAllCurrencies() {
      try {
        const marketInfo = await this.api.getAllCurrencies();
        walletApi.storage.set("marketInfo", marketInfo);
        const currencies = new Set();
        marketInfo.forEach(({ pair }) => {
          const { from, to } = pairToObject({ pair });
          currencies.add(from);
          currencies.add(to);
        });
        this.currencies = [...currencies];
        return [...currencies];
      } catch (error) {
        walletApi.alert.error(error);
      }
    },

    async recountTo() {
      const marketInfo = walletApi.storage.get("marketInfo");
      const { from, to } = this;
      if (marketInfo.length && from && to) {
        this.isCounting = true;
        const currentPair = `${from}-${to}`;
        const amount = this.amount;
        try {
          const { quote, minerFee } = marketInfo.find(
            ({ pair }) => pair === currentPair
          );
          const amountTo = amount * quote - minerFee;
          this.amountTo = amountTo.toFixed(8);
        } catch (error) {
          this.amountTo = "-";
        } finally {
          this.sequence = this.countSequence();
          this.isCounting = false;
        }
      }
    },
    startRecount() {
      walletApi.storage.set("amount", this.amount);
      if (this.recountTimeout) {
        walletApi.timers.clearTimeout(this.recountTimeout);
      }
      this.recountTimeout = walletApi.timers.setTimeout(() => {
        this.recountTo();
      }, 500);
    },
    toggleCurrancies() {
      const prevFrom = this.from;
      this.from = this.to;
      this.to = prevFrom;
      walletApi.storage.set("fromCurrency", this.from);
      walletApi.storage.set("toCurrency", this.to);
      this.recountTo();
    },
    openSelectFrom() {
      if (this.currencies.length) {
        this.refs.currencySelectFrom.style.display = "block";
        this.refs.searchFrom.focus();
        this.isListFromOpen = true;
      }
    },
    openSelectTo() {
      if (this.currencies.length) {
        this.refs.currencySelectTo.style.display = "block";
        this.refs.searchTo.focus();
        this.isListToOpen = true;
      }
    },
    selectCoinFrom(asset) {
      this.from = asset;
      walletApi.storage.set("fromCurrency", asset);
      this.recountTo();
      this.refs.currencySelectFrom.style.display = "none";
      this.isListFromOpen = false;
      this.fromFilter = "";
    },
    selectCoinTo(asset) {
      this.to = asset;
      walletApi.storage.set("toCurrency", asset);
      this.recountTo();
      this.refs.currencySelectTo.style.display = "none";
      this.isListToOpen = false;
      this.toFilter = "";
    },
    isNumber(event) {
      const value = event.target.value.trim();
      const amount = Number(event.target.value);
      if (Number.isNaN(amount)) {
        event.preventDefault();
        event.target.value = value.slice(0, -1);
        this.amount = value.slice(0, -1);
        return false;
      } else {
        return true;
      }
    },
    async initialize() {
      this.initializing = true;
      const storageFrom = walletApi.storage.get("fromCurrency");
      const storageTo = walletApi.storage.get("toCurrency");
      const lastId = walletApi.storage.get("orderId");
      walletApi.storage.set("amount", this.amount);
      if (lastId) {
        walletApi.route.goTo("stepper");
        return;
      }

      if (storageFrom) {
        this.from = storageFrom;
      }
      if (storageTo) {
        this.to = storageTo;
      }

      try {
        await this.getAllCurrencies();
        await this.recountTo();
        this.initializing = false;
      } finally {
        this.initializing = false;
      }
    }
  },
  created() {
    this.api = new ApiWorker(walletApi.http);
  },
  async mounted() {
    await this.initialize();
  }
};
