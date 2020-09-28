const ApiWorker = require("../apiWorker");
const style = require("./mainPageStyles");
const stepperStyle = require("./stepperStyles");
const { defaultFrom, defaultTo } = require("../constants");

const {
  errorType,
  longName,
  statuses,
  finishedStatuses,
  exchangingStatuses,
  symbolsWithTag
} = require("../constants");
const {
  valiateAddress,
  valiateExternalId,
  pairToObject
} = require("../utils/validators");
const { getLink } = require("../utils/links");

const exchangeInterval = 5000;

const {
  pluginContainer,
  mainPageHeader,
  exchangeInputTitle,
  sequenceBlock,
  formContainer,
  toggleButton,
  coinIcon,
  selectFromWrapper,
  searchInput,
  currencyListContainer,
  currencyList,
  currencyItem,
  coinName,
  coinTicker,
  inputLoader,
  sreachIcon,
  subName
} = style;

const {
  arrow,
  Stepper,
  stepContainer,
  stepHeader,
  stepNumber,
  stepName,
  stepBody,
  formBlock,
  input,
  inputWrapper,
  exchangeInputSearch,
  circle,
  line,
  exchangeSequence,
  selectContainer,
  addressInput,
  addressInputBody,
  inputSuccesValid,
  addressInputLabel,
  addressInputWrapper,
  stepButton,
  buttonGreen,
  buttonWhite,
  disabledButton,
  confirmInfoLabel,
  confirmInfoSub,
  confirmInfoData,
  confirmInfoAmount,
  confirmArrow,
  confirmCheckboxWrapper,
  checkboxBody,
  checkbox,
  checkboxChecked,
  buttonsBlock,
  refundButton,
  inputError,
  exchangeInputError,
  stepThreeBlock,
  infoHeader,
  infoContent,
  bigLoader,
  smallStep,
  smallStepHeader,
  smallStepNumber,
  smallStepName,
  stepHeaderText,
  smallStepInfoIcon,
  smallStepInfoItem,
  stepInfoHead,
  transactionSuccessIcon
} = stepperStyle;

const {
  faArrowsAltV,
  faSpinner,
  faLongArrowAltDown,
  faLongArrowAltUp,
  faSearch,
  faArrowRight,
  faCheck,
  faCheckCircle,
  faTimesCircle,
  faCircleNotch,
  faCircle,
  faExternalLinkAlt
} = walletApi.fontAwesomeIcons;

module.exports = {
  template: `
    <div class="rounded-lg px-0 py-2 flex flex-col" style="${pluginContainer}" @click="outSideClick">
      <div style="${mainPageHeader}">
        <img src="https://www.switchain.com/svg/sw-logo.svg" id="sw-logo">
        <div class="sm:block hidden" style="width: 1px; height: 40px; margin: 0 15px 0 10px;"></div>
        <div class="sm:block hidden" style="color: #FFF; font-size: 14px; margin-top:10px">best cryptocurrency exchange rates</div>
      </div>
      <div style="${formContainer}" class="px-3">
        <div v-if="initializing">
          <Loader />
        </div>
        <div v-else style="${Stepper}">
          <div v-if="currentStep === 1" style="${stepContainer}">
            <div style="${stepHeader}">
              <div style="${stepNumber}">1</div>
              <span style="${stepName}">Send To</span>
            </div>
            <div style="${stepBody}">
              <div style="${formBlock}">
                <div style="${inputWrapper}">
                  <div v-if="amountError" style="${exchangeInputError}">{{renderFromLabel}}</div>
                  <div v-else style="${exchangeInputTitle}">You send</div>
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
                          class="hover:shadow-md" @click="() => selectCoinFrom(fromCurrency)">
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
                  <v-popover
                    offset="1"
                  >
                    <button class="pl-3" style="padding-bottom: 4px; color: #3bee81; font-size: 12px;">Expected rate</button>

                    <template slot="popover" >
                      <div style="background-color: white; max-width: 250px; padding: 20px; border-radius: 3px; box-shadow: 0 4px 20px rgba(0,0,0,.45);">
                        <h4 style="color: #5c5780; font-size: 16px; margin-bottom: 10px;">This is an expected rate</h4>
                        <p style="color: #2b2b37; font-size: 14px; margin: 20px 0;">
                          Switchain will pick the best rate for you during the moment of the exchange.
                        </p>
                        <a href="https://www.switchain.com/faq"
                          style="color: #3bee81; font-size: 12px;" target="_blank">
                          <div class="flex items-center">
                            Learn More
                            <div style="font-size: 6px; margin-left: 3px; padding-bottom: 2px;">
                              <font-awesome-icon :icon="faExternalLinkAlt" size="lg"/>
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
                          <span style="${coinName}">{{toCurrency}}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="to === 'ark' && arkWallets.length" class="relative" style="${addressInputBody}">
                <span>Recipient Wallet</span>
                <InputSelect :items="arkWallets" label="" name="ArkWallets" v-model="selectValue"  v-on:input="setArkAddress"/>
                <p v-if="recipientWallet && !isValidRecipient && !recipientFocus"
                  class="text-xs"
                  style="${inputError}">
                  This address is not valid
                </p>
              </div>
              <div v-else class="relative" style="${addressInputBody}">
                <span style="${addressInputLabel}">Recipient Wallet</span>
                <div style="${addressInputWrapper}">
                  <input
                    type="text"
                    v-model="recipientWallet"
                    @blur="() => recipientFocus = false"
                    @focus="() => recipientFocus = true"
                    class="border border-solid focus:border-green border-gray-400"
                    style="${addressInput}"
                    :placeholder="recipientPlace"/>
                    <div v-if="recipientWallet && isValidRecipient" style="${inputSuccesValid}"><font-awesome-icon  :icon="faCheck" size="lg"/></div>
                </div>
                <p v-if="recipientWallet && !isValidRecipient && !recipientFocus"
                  class="text-xs"
                  style="${inputError}">
                  This address is not valid
                </p>
              </div>
              <div v-if="to && toHasExternalId" class="relative"  style="${addressInputBody}">
                <div style="${addressInputWrapper}">
                  <input
                    type="text"
                    v-model="toExternalId"
                    @blur="() => externalIdFocus = false"
                    @focus="() => externalIdFocus = true"
                    class="border border-solid focus:border-green border-gray-400"
                    style="${addressInput}"
                    placeholder="(Memo, tag...)"/>
                    <div v-if="to && isValidToExternalId" style="${inputSuccesValid}"><font-awesome-icon  :icon="faCheck" size="lg"/></div>
                </div>
                <p v-if="toExternalId && !isValidToExternalId && !externalIdFocus"
                  class="text-xs" style="${inputError}">{{externalIdValidError}}</p>
              </div>
               <div v-if="from === 'ark' && arkWallets.length" class="relative" style="${addressInputBody}">
                <span>Refund Wallet</span>
                <InputSelect :items="arkWallets" label="" name="ArkWallets" v-model="selectRefundValue"  v-on:input="setRefundArkAddress"/>
                <p v-if="refundWallet && !isValidRefund && !refundFocus"
                  class="text-xs"
                  style="${inputError}">
                  This address is not valid
                </p>
              </div>
              <div v-if="from" class="relative" style="${addressInputBody}">
                <span style="${addressInputLabel}">Refund Wallet</span>
                <div style="${addressInputWrapper}">
                  <input
                    type="text"
                    v-model="refundWallet"
                    @blur="() => refundFocus = false"
                    @focus="() => refundFocus = true"
                    style="${addressInput}"
                    class="border border-solid focus:border-green border-gray-400"
                    :placeholder="refundPlace"/>
                    <div v-if="refundWallet && isValidRefund" style="${inputSuccesValid}"><font-awesome-icon  :icon="faCheck" size="lg"/></div>
                </div>
                <p v-if="refundWallet && !isValidRefund && !refundFocus"
                  class="text-xs" style="${inputError}">This address is not valid</p>
              </div>
              <div v-if="from && fromHasExternalId" class="relative"  style="${addressInputBody}">
                <div style="${addressInputWrapper}">
                  <input
                    type="text"
                    v-model="fromExternalId"
                    @blur="() => externalIdFocus = false"
                    @focus="() => externalIdFocus = true"
                    class="border border-solid focus:border-green border-gray-400"
                    style="${addressInput}"
                    placeholder="(Memo, tag...)"/>
                    <div v-if="from && isValidFromExternalId" style="${inputSuccesValid}"><font-awesome-icon  :icon="faCheck" size="lg"/></div>
                </div>
                <p v-if="fromExternalId && !isValidFromExternalId && !externalIdFocus"
                  class="text-xs" style="${inputError}">{{externalIdValidError}}</p>
              </div>
            </div>
            <div style="${buttonsBlock}">
              <button v-if="!validParams" style="${stepButton} ${disabledButton}"
              class="hover:opacity-75 disabled:bg-gray" :disabled="!validParams"
              >Next</button>
              <button v-else style="${stepButton} ${buttonGreen}"
              class="hover:opacity-75 disabled:bg-gray" :disabled="!validParams"
              @click.prevent="switchToTwoStep">Next</button>
              <button @click="goTo('switchain')" class="hover:opacity-75" style="${stepButton} ${buttonWhite}">Back</button>
            </div>
          </div>
          <div v-if="currentStep === 2" style="${stepContainer}">
            <div style="${stepHeader}">
              <div style="${stepNumber}">2</div>
              <span style="${stepName}">Confirmation</span>
            </div>
            <div style="${stepBody}">
              <div class="flex flex-col md:flex-row md:items-center">
                <div style="${confirmInfoData}" class="pr-6">
                  <span style="${confirmInfoLabel}">You Send</span>
                  <span style="${confirmInfoAmount}">{{amount}} {{fromTicker}}</span>
                  <span style="${confirmInfoSub}">{{sequence}}</span>
                </div>
                <div style="${confirmArrow}" class="md:block hidden">
                  <font-awesome-icon :icon="faArrowRight" size="lg"/>
                </div>
                <div style="${confirmInfoData}" class="md:pl-6">
                  <span style="${confirmInfoLabel}">You Get</span>
                  <span style="${confirmInfoAmount}">≈ {{amountTo}} {{toTicker}}</span>
                  <span style="${confirmInfoSub}">{{recipientWallet}}</span>
                </div>
              </div>
              <div style="margin: 10px 0;" class="flex">
                <div style="margin-right: 30px;">
                  <p style="${confirmInfoLabel} margin-bottom: 3px;">Estimated Arrival</p>
                  <p style="${confirmInfoSub}">≈ {{transactionTime}} minutes</p>
                </div>
              </div>
            </div>
            <div style="${confirmCheckboxWrapper}">
              <label style="${checkboxBody}" class="cursor-pointer">
                <input type="checkbox" v-model="confirm" style="${checkbox}">
                <span v-if="confirm" style="${checkboxChecked}"><font-awesome-icon  :icon="faCheck" size="lg"/></span>
              </label>
              <div style="confirmText">
                <span>I've read and agree to the Switchain
                  <a class="no-underline"  style="color: #3bee81;" href="https://www.switchain.com/tos" target="blank">Terms of Use</a> and
                  <a class="no-underline" style="color: #3bee81;"  href="https://www.switchain.com/policy" target="blank">KYC/AML Policy</a>
                </span>
              </div>
            </div>
            <div style="${buttonsBlock}">
              <button v-if="!confirm || creating" style="${stepButton} ${disabledButton}" :disabled="!confirm">Confirm</button>
              <button v-else style="${stepButton} ${buttonGreen}" @click.prevent="createExchange">Confirm</button>
              <button style="${stepButton} ${buttonWhite}" @click.prevent="switchToOneStep" :disabled="creating">Back</button>
            </div>
            <div  v-if="creating" style="${bigLoader}">
              <font-awesome-icon :icon="faCircleNotch" size="lg" rotation="180" spin style="color: #3bee81;"/>
            </div>
          </div>
          <div v-if="currentStep === 3 && transaction" style="${stepContainer}">
            <div style="${stepHeader} font-size: 16px;" class="relative">
              <div style="${stepNumber}">3</div>
              <span style="${stepName} color: #a4a3aa">Sending</span>
              <span class="m-4" style="color: #a4a3aa; font-size: 16px;">Transaction Id: {{transaction.orderId}}</span>
              <button style="margin-left: auto; color: #3bee81;" @click="startNewTransaction">Start new transaction</button>
            </div>
            <div style="padding: 5px 0;">
              <div style="border: 2px solid #3bee81; padding: 5px 65px 5px 10px; max-width: 650px;" class="mb-1">
                <div style="${stepThreeBlock}">
                  <p style="${infoHeader}">You send</p>
                  <p style="${infoContent} text-transform:uppercase;">{{transaction.fromAmount}} {{fromTicker}}</p>
                </div>
                <div style="${stepThreeBlock}">
                  <p style="${infoHeader}">To address</p>
                  <p style="${infoContent}">{{transaction.exchangeAddress}} <ButtonClipboard :value="transaction.exchangeAddress" class="text-theme-page-text-light mx-2"/></p>
                </div>
                <div style="${stepThreeBlock}" v-if="transaction.exchangeAddressTag">
                  <p style="${infoContent}"><small>Tag/memo:</small> {{transaction.exchangeAddressTag}} <ButtonClipboard :value="transaction.exchangeAddressTag" class="text-theme-page-text-light mx-2"/></p>
                </div>
              </div>
              <div style="padding: 5px 65px 5px 10px;">
                <div style="${stepThreeBlock}">
                  <p style="${infoHeader}">You get</p>
                  <p style="${infoHeader} font-size: 18px; text-transform:uppercase;"> ≈ {{transaction.rate}} {{toTicker}}</p>
                </div>
                <div style="${stepThreeBlock}">
                  <p style="${infoHeader}">To address</p>
                  <p style="${infoHeader} font-size: 18px; word-break: break-all;">{{transaction.toAddress}}</p>
                </div>
                <div v-if="transaction.toAddressTag" style="${stepThreeBlock}">
                  <p style="${infoHeader} font-size: 18px; word-break: break-all;"><small>Tag/memo:</small> {{transaction.toAddressTag}}</p>
                </div>
              </div>
              <div v-if="!isExchangeFinished" style="exchangeStatuses" class="flex items-center justify-center flex-col md:flex-row">
                <div style="height: 35px; border: 2px solid rgba(61,61,112,.04);" class="md:w-1/3 w-full mb-1 md:mx-1  flex items-center justify-center">
                  <font-awesome-icon v-if="receivedStatus" :icon="faCheckCircle" size="lg" style="color: #3bee81;"/>
                  <font-awesome-icon v-else :icon="spinner" size="lg" rotation="180" spin style="color: #3bee81;"/>
                  <span class="ml-2">{{receivedStatus ? 'Deposit received' : 'Awaiting deposit'}}</span>
                </div>
                <div style="height: 35px; border: 2px solid rgba(61,61,112,.04);" class="md:w-1/3 w-full mb-1 md:mx-1  flex items-center justify-center">
                  <font-awesome-icon v-if="confirmingStatus" :icon="faCheckCircle" size="lg" style="color: #3bee81;"/>
                  <font-awesome-icon v-else-if="exchangingStatus" :icon="spinner" size="lg" rotation="180" spin style="color: #3bee81;"/>
                  <font-awesome-icon v-else :icon="faCircleNotch" size="lg" style="color: #E9E7EF;"/>
                  <span class="ml-2">{{confirmingStatus ? 'Exchanged' : 'Exchanging'}}</span>
                </div>
                <div style="height: 35px; border: 2px solid rgba(61,61,112,.04);" class="md:w-1/3 w-full mb-1 md:mx-1 flex items-center justify-center">
                  <font-awesome-icon v-if="isExchangeFinishedSuccess" :icon="faCheckCircle" size="lg" style="color: #3bee81;"/>
                  <font-awesome-icon v-else-if="sendingStatus"  :icon="spinner" size="lg" rotation="180" spin style="color: #3bee81;"/>
                  <font-awesome-icon v-else :icon="faCircleNotch" size="lg" style="color: #E9E7EF;"/>
                  <span class="ml-2">{{isExchangeFinishedSuccess ? 'Sent to your wallet' : 'Sending to your wallet'}}</span>
                </div>
              </div>
              <div v-if="transaction.status === statuses.failed" class="px-4 py-3 rounded my-1" style="background-color: #fff5f5;	">
                <span class="block sm:inline" style="color: #e53e3e;">Error during exchange. Please contact support.</span>
              </div>
              <div v-if="transaction.status === statuses.expired" class="px-4 py-3 rounded my-1" style="background-color: #fff5f5;	">
                <span class="block sm:inline" style="color: #e53e3e;">This exchange has expired. Please start a new exchange.</span>
              </div>
              <div class="px-2 py-1 rounded my-1" style="background-color: rgba(61,61,112,.04);">
                <p class="mb-1" style="color: #333;">If you have any questions about your exchange, please contact our support team via email.</p>
                <a style="color: #3bee81;" href="mailto: help@switchain.com">help@switchain.com</a>
             </div>
            </div>
          </div>
          <div v-if="currentStep === 4 && transaction" class="lg:w-11/12">
            <div class="relative px-2 py-2 rounded my-1 flex flex-col justify-center items-center" style="background-color: rgba(61,61,112,.04);">
              <div style="${transactionSuccessIcon}">
                <img src="https://changenow.io/images/exchange/check.svg"/>
              </div>
              <p style="font-size: 26px; font-weight: 700; margin-botom: 10px; color:white">Exchange is completed!</p>
              <button class="absolute" style="margin-left: auto; color: #3bee81; right: 10px; top: 10px;" @click="startNewTransaction">Start new exchange</button>
            </div>
            <div style="${smallStep}">
              <div style="${smallStepHeader}">
                <div style="${smallStepNumber}">1</div>
                <p style="${smallStepName}">Your {{transaction.from}} Wallet</p>
                <span style="${stepHeaderText}">{{ parseDate(transaction.createdAt) }}</span>
              </div>
              <div class="flex">
                <div style="${smallStepInfoIcon}">
                  <img style="width: 52px" src="https://changenow.io/images/exchange/wallet-icon.svg"/>
                </div>
                <div style="padding-left: 33px;">
                  <div style="${smallStepInfoItem}">
                    <p style="${stepInfoHead} width: 240px;">Input Transaction Hash</p>
                    <p style="font-size: 15px; letter-spacing: .3px;  word-break: break-all;">
                      <a style="color: #3bee81; word-break: break-all; user-select: all;" :href="payinHashLink" target="_blank">
                        {{transaction.depositTxId}}
                      </a>
                      <ButtonClipboard :value="transaction.depositTxId" class="text-theme-page-text-light mx-2"/>
                    </p>
                  </div>
                  <div style="${smallStepInfoItem}">
                    <p style="${stepInfoHead} width: 240px;">Switchain Address</p>
                    <p style="font-size: 15px; letter-spacing: .3px;  word-break: break-all;">
                      <a style="color: #3bee81; word-break: break-all; user-select: all;" :href="payinAddressLink" target="_blank">
                        {{transaction.exchangeAddress}}
                      </a>
                      <ButtonClipboard :value="transaction.exchangeAddress" class="text-theme-page-text-light mx-2"/>
                    </p>
                  </div>
                <div style="${smallStepInfoItem}">
                  <p style="${stepInfoHead} font-weight: 700; width: 240px;">Amount Sent</p>
                  <p style="font-size: 15px; letter-spacing: .3px;  word-break: break-all; font-weight: 700;  word-break: break-all;">
                    {{transaction.fromAmount}} {{transaction.from}}
                  </p>
                </div>
                </div>
              </div>
            </div>
            <div style="${smallStep}">
              <div style="${smallStepHeader}">
                <div style="${smallStepNumber}">2</div>
                <p style="${smallStepName}">Your {{toTicker}} Wallet</p>
                <span style="${stepHeaderText}">{{ parseDate(transaction.updatedAt) }}</span>
              </div>
              <div class="flex">
                <div style="${smallStepInfoIcon}">
                  <img style="width: 52px" src="https://changenow.io/images/exchange/exchange-icon.svg"/>
                </div>
                <div style="padding-left: 33px;">
                  <div style="${smallStepInfoItem}">
                    <p style="${stepInfoHead} width: 240px;">Output Transaction Hash</p>
                    <p style="font-size: 15px; letter-spacing: .3px;  word-break: break-all;">
                      <a style="color: #3bee81; word-break: break-all; user-select: all;" :href="payoutHashLink" target="_blank">
                        {{transaction.toTx}}
                      </a>
                      <ButtonClipboard :value="transaction.toTx" class="text-theme-page-text-light mx-2"/>
                    </p>
                  </div>
                  <div style="${smallStepInfoItem}">
                    <p style="${stepInfoHead} width: 240px;">Your {{toTicker}} Address</p>
                    <p style="font-size: 15px; letter-spacing: .3px;  word-break: break-all;">
                      <a style="color: #3bee81; word-break: break-all; user-select: all;" target="_blank"
                        :href="payoutAddressLink">
                        {{transaction.toAddress}}
                      </a>
                      <ButtonClipboard :value="transaction.toAddress" class="text-theme-page-text-light mx-2"/>
                    </p>
                  </div>
                <div style="${smallStepInfoItem}">
                  <p style="${stepInfoHead} font-weight: 700; width: 240px;">Amount Received</p>
                  <p style="font-size: 15px; letter-spacing: .3px;  word-break: break-all; font-weight: 700;  word-break: break-all;">
                  {{transaction.rate}} {{toTicker}}
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  `,
  components: {},
  data() {
    return {
      faCheck: faCheck,
      spinner: faSpinner,
      arrow: faArrowsAltV,
      upArrow: faLongArrowAltUp,
      downArrow: faLongArrowAltDown,
      faSearch,
      faArrowRight,
      faCheckCircle,
      faTimesCircle,
      faCircleNotch,
      faCircle,
      faExternalLinkAlt,

      amount: 0.1,
      amountTo: 0,
      currentStep: 1,
      currencies: [],
      from: null,
      to: null,
      fullTo: null,
      fullFrom: null,
      api: {},
      isCounting: false,
      recountTimer: null,
      counter: 1,
      recountTimeout: null,
      arkWallets: [],
      recipientWallet: "",
      recipientWalletTag: "",
      refundWallet: "",
      refundWalletTag: "",
      fromHasExternalId: false,
      toHasExternalId: false,
      fromExternalId: "",
      toExternalId: "",
      externalId: "",
      initializing: true,
      confirm: false,
      fromFilter: "",
      toFilter: "",
      recipientFocus: false,
      refundFocus: false,
      externalIdFocus: false,
      isListFromOpen: false,
      isListToOpen: false,
      fromAddressTag: "",
      toAddressTag: "",
      hasError: false,
      amountError: false,
      amountMinError: false,
      amountMaxError: false,
      minAmount: 0,
      transactionTime: "15",
      longName: {},
      isEnabled: false,
      selectValue: "",
      selectRefundValue: "",
      // Step 3
      transaction: null,
      creating: false,
      statusTimer: null,
      finishedStatuses,
      statuses,
      counter: 0,
      sequence: ""
    };
  },

  computed: {
    isValidRecipient() {
      return this.to ? valiateAddress(this.to, this.recipientWallet) : false;
    },
    isValidRefund() {
      return this.from ? valiateAddress(this.from, this.refundWallet) : false;
    },
    isValidFromExternalId() {
      return this.from
        ? valiateExternalId(this.from, this.fromExternalId)
        : false;
    },
    isValidToExternalId() {
      return this.to ? valiateExternalId(this.to, this.toExternalId) : false;
    },
    renderFromLabel() {
      const hasError = this.amountMaxError || this.amountMinError;
      const error = this.amountMaxError
        ? `Maximum amount ${this.maxAmount} ${this.from}`
        : `Minimum amount ${this.minAmount} ${this.from}`;

      return this.from && hasError ? error : "";
    },

    externalIdValidError() {
      return `This is not a valid memo, tag...`;
    },
    recipientPlace() {
      return this.to ? `Enter the recipient's ${this.to} address` : "";
    },
    externalIdName() {
      return this.addressTag || "Extra Id";
    },
    refundPlace() {
      return this.from
        ? `Enter ${this.from} refund address (${
            this.from ? "required" : "optional"
          })`
        : "";
    },
    fromTicker() {
      return this.from || defaultFrom;
    },
    toTicker() {
      return this.to || defaultTo;
    },
    filtredFrom() {
      const filter = this.currencies.filter(currency => currency !== this.from);
      return filter;
    },
    filtredTo() {
      const filter = this.currencies.filter(currency => currency !== this.to);
      return filter;
    },
    validParams() {
      if (this.from && this.to && this.amount) {
        const isValidRecipient =
          this.recipientWallet && valiateAddress(this.to, this.recipientWallet);
        const isValidRefund =
          this.from || this.refundWallet
            ? valiateAddress(this.from, this.refundWallet)
            : true;
        const isValidExternalId =
          (this.to && !this.toHasExternalId) || this.toExternalId
            ? valiateExternalId(this.to, this.toExternalId)
            : true;
        return Boolean(
          isValidRecipient &&
            isValidRefund &&
            isValidExternalId &&
            !this.hasError &&
            !this.amountError
        );
      }
      return false;
    },
    receivedStatus() {
      if (this.transaction) {
        const { status } = this.transaction;
        return status !== statuses.waiting;
      }
      return false;
    },
    exchangingStatus() {
      if (this.transaction) {
        const { status } = this.transaction;
        return exchangingStatuses.includes(status);
      }
      return false;
    },
    confirmingStatus() {
      if (this.transaction) {
        const { status } = this.transaction;
        return status === statuses.confirming || status === statuses.confirmed;
      }
      return false;
    },
    sendingStatus() {
      if (this.transaction) {
        const { status } = this.transaction;
        return status === statuses.confirming;
      }
      return false;
    },
    isExchangeFinished() {
      if (this.transaction) {
        const { status } = this.transaction;
        return this.finishedStatuses.includes(status);
      }
      return false;
    },
    isExchangeFinishedSuccess() {
      if (this.transaction) {
        const { status } = this.transaction;
        return status === statuses.confirmed;
      }
      return false;
    },
    payinHashLink() {
      if (this.transaction && this.transaction.status === statuses.confirmed) {
        const { depositTxId, pair } = this.transaction;
        const { from } = pairToObject({ pair });
        const link = getLink({ asset: from, path: "tx", hash: depositTxId });
        return link;
      }
      return "";
    },
    payinAddressLink() {
      if (this.transaction && this.transaction.status === statuses.confirmed) {
        const { exchangeAddress, pair } = this.transaction;
        const { from } = pairToObject({ pair });
        const link = getLink({
          asset: from,
          path: "address",
          hash: exchangeAddress
        });
        return link;
      }
      return "";
    },
    payoutAddressLink() {
      if (this.transaction && this.transaction.status === statuses.confirmed) {
        const { toAddress, pair } = this.transaction;
        const { to } = pairToObject({ pair });
        const link = getLink({
          asset: to,
          path: "address",
          hash: toAddress
        });
        return link;
      }
      return "";
    },
    payoutHashLink() {
      if (this.transaction && this.transaction.status === statuses.confirmed) {
        const { toTx, pair } = this.transaction;
        const { to } = pairToObject({ pair });
        const link = getLink({
          asset: to,
          path: "tx",
          hash: toTx
        });
        return link;
      }
      return "";
    },
    exchangeRate() {
      if (this.transaction && this.transaction.status === statuses.confirmed) {
        const { rate, fromAmount, pair } = this.transaction;
        const { from, to } = pairToObject({ pair });
        const quote = Number(rate) / Number(fromAmount);
        return `1 ${from} ≈ ${quote.toFixed(7)} ${to}`;
      }
      return "";
    }
  },
  methods: {
    goTo (route) {
      walletApi.route.goTo(route);
    },
    parseDate(date) {
      const time = new Date(date);
      return time.toLocaleString();
    },
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

    toggleRefund() {
      this.needRefund = !this.needRefund;
      this.refundWallet = "";
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
        if (this.arkWallets.length && this.to === "ARK") {
          this.setArkAddress();
        }
        if (this.arkWallets.length && this.from === "ARK") {
          this.setRefundArkAddress();
        }
        try {
          const { quote, minerFee, maxLimit, minLimit } = marketInfo.find(
            ({ pair }) => pair === currentPair
          );
          this.minAmount = minLimit;
          this.maxAmount = maxLimit;
          if (minLimit > amount) {
            this.amountMinError = true;
            this.amountError = true;
            return;
          }
          if (maxLimit < amount) {
            this.amountError = true;
            this.amountMaxError = true;
            return;
          }
          this.amountMinError = false;
          this.amountMaxError = false;
          this.amountError = false;
          const amountTo = amount * quote - minerFee;
          this.amountTo = amountTo.toFixed(8);
          this.hasError = false;
        } catch (error) {
          this.amountTo = 0;
          this.hasError = true;
          if (error.body) {
            const errorData = JSON.parse(error.body);
            if (errorData.error === errorType.SMALL_DEPOSIT) {
              this.amountMinError = true;
              this.amountError = true;
              return;
            }
            if (errorData.error === errorType.BIG_DEPOSIT) {
              this.amountMaxError = true;
              this.amountError = true;
              return;
            }
            if (errorData.error === errorType.INACTIVE) {
              const errorMessage = `The ${this.from}/${this.to}
                pair is temporarily unavailable for exchanges.`;
              walletApi.alert.error(errorMessage);
              return;
            }
          }
          if (error.message) {
            walletApi.alert.error(
              `Fail to fetch available currencies. Reason: ${error.message}.`
            );
            return;
          }
          walletApi.alert.error("Unknown error.");
        } finally {
          this.sequence = this.countSequence();
          this.isCounting = false;
        }
      }
    },
    startRecount() {
      if (this.recountTimeout) {
        walletApi.timers.clearTimeout(this.recountTimeout);
      }
      this.recountTimeout = walletApi.timers.setTimeout(() => {
        this.recountTo();
      }, 500);
    },
    toggleCurrancies() {
      const prevFrom = this.from;
      const prevFromEx = this.fromHasExternalId;
      const prevRecipient = this.recipientWallet;
      this.from = this.to;
      this.to = prevFrom;
      this.fromHasExternalId = this.toHasExternalId;
      this.toHasExternalId = prevFromEx;
      this.recipientWallet = this.refundWallet;
      this.refundWallet = prevRecipient;
      this.fromExternalId = "";
      this.toExternalId = "";
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
      this.fromHasExternalId = symbolsWithTag.includes(asset);
    },
    selectCoinTo(asset) {
      this.to = asset;
      walletApi.storage.set("toCurrency", asset);
      this.recountTo();
      this.refs.currencySelectTo.style.display = "none";
      this.isListToOpen = false;
      this.toFilter = "";
      this.toHasExternalId = symbolsWithTag.includes(asset);
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
    async createExchange() {
      if (this.validParams) {
        const { from, to } = this;
        const pair = `${from}-${to}`;
        const params = {
          pair,
          toAddress: this.recipientWallet,
          refundAddress: this.refundWallet,
          fromAmount: String(this.amount)
        };

        if (this.toExternalId) {
          params.toAddressTag = this.toExternalId;
        }
        if (this.fromExternalId) {
          params.refundAddressTag = this.fromExternalId;
        }
        this.creating = true;
        try {
          this.statusTimer = walletApi.timers.setInterval(() => {
            this.checkTransactionStatus();
          }, exchangeInterval);
          const transaction = await this.api.createOrder(params);
          walletApi.storage.set("transactionId", transaction.orderId);
          this.transaction = transaction;
          await this.checkTransactionStatus();
          this.currentStep = 3;
        } catch (error) {
          walletApi.alert.error(`Fail to create transaction.`);
        } finally {
          this.creating = false;
        }
      }
    },
    async checkTransactionStatus() {
      if (!this.transaction) {
        return;
      }
      const { orderId, pair } = this.transaction;
      try {
        const transactionData = await this.api.getTransactionStatus(orderId);

        this.transaction = transactionData;
        if (pair) {
          const { from, to } = pairToObject({ pair });
          this.transaction.from = from;
          this.transaction.to = to;
        }
        this.transaction.updatedAt = new Date();
        if (finishedStatuses.includes(transactionData.status)) {
          if (transactionData.status === statuses.confirmed) {
            this.currentStep = 4;
          }
          walletApi.storage.set("transactionId", null);
          walletApi.timers.clearInterval(this.statusTimer);
        }
      } catch (error) {
        walletApi.alert.error(`Fail to fetch transaction data.`);
      }
    },
    async initialize() {
      this.initializing = true;
      const storageFrom = walletApi.storage.get("fromCurrency");
      const storageAmount = walletApi.storage.get("amount");
      const storageTo = walletApi.storage.get("toCurrency");
      const lastId = walletApi.storage.get("transactionId");

      const profile = walletApi.profiles.getCurrent();
      this.arkWallets = profile.wallets.map(wallet => {
        return wallet.name ? wallet.name : wallet.address;
      });
      if (storageFrom) {
        this.from = storageFrom;
        this.fromHasExternalId = symbolsWithTag.includes(storageFrom);
      }
      if (storageTo) {
        this.to = storageTo;
        this.toHasExternalId = symbolsWithTag.includes(storageTo);
      }
      if (storageAmount) {
        this.amount = storageAmount;
      }
      if (this.arkWallets.length && this.to && this.to === defaultTo) {
        this.setArkAddress();
      }
      if (this.arkWallets.length && this.from && this.from === "ARK") {
        this.setRefundArkAddress();
      }
      try {
        if (lastId) {
          this.statusTimer = walletApi.timers.setInterval(() => {
            this.checkTransactionStatus();
          }, exchangeInterval);
          this.transaction = {
            orderId: lastId
          };
          await this.checkTransactionStatus();
          this.currentStep = 3;
          this.initializing = false;
          return;
        }
        await this.getAllCurrencies();
        await this.recountTo();
        this.initializing = false;
      } catch (error) {
        if (error.message) {
          walletApi.alert.error(
            `Fail to fetch available currencies. Reason: ${error.message}.`
          );
          return;
        }
        if (error.body) {
          const { message } = JSON.parse(error.body);
          walletApi.alert.error(message);
          return;
        }
        walletApi.alert.error("Unknown error.");
      } finally {
        this.initializing = false;
      }
    },
    switchToTwoStep() {
      this.currentStep = 2;
    },
    switchToOneStep() {
      this.currentStep = 1;
    },
    async startNewTransaction() {
      walletApi.storage.set("transactionId", null);
      this.goTo("switchain");
    },
    setArkAddress(value) {
      if (!value) {
        value = this.arkWallets[0];
      }
      const profile = walletApi.profiles.getCurrent();
      const selectedWallet = profile.wallets.find(wallet => {
        return wallet.name === value || wallet.address === value;
      });
      this.selectValue = value;
      if (!selectedWallet) {
        this.recipientWallet = profile.wallets[0].address;
        return;
      }
      this.recipientWallet = selectedWallet.address;
    },
    setRefundArkAddress(value) {
      if (!value) {
        value = this.arkWallets[0];
      }
      const profile = walletApi.profiles.getCurrent();
      const selectedWallet = profile.wallets.find(wallet => {
        return wallet.name === value || wallet.address === value;
      });
      this.selectRefundValue = value;
      if (!selectedWallet) {
        this.refundWallet = profile.wallets[0].address;
        return;
      }
      this.refundWallet = selectedWallet.address;
    }
  },
  created() {
    this.api = new ApiWorker(walletApi.http);
  },
  async mounted() {
    this.longName = longName;
    await this.initialize();
  }
};
