const colorGreen = "#28d070";
const colorBlue = "#234B6C";

const pluginContainer = `
  background-image: linear-gradient( rgba(43, 91, 129, 0.9), rgba(19, 46, 74, 0.9) ), url(https://s3.amazonaws.com/switchain.com/images/background.webp);
  position: relative;
  padding: 0;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-attachment: fixed !important;
  background-position: center !important;
`;

const formContainer = `
  z-index: 1;
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: transparent;
  z-index: 1;
`;

const mainContainer = `
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const mainPageHeader = `
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-left: 25px;
    padding-top: 40px;
`;

const mainHeader = `
  color: white;
  font-size: 48px;
`;

const subTitle = `
  margin-bottom: 30px;
  font-size: 28px;
  color: #547793;
`;

const mainBlock = `
  padding: 20xp;
  z-index: 100;
`;

const block = `
  display: flex;
  justify-content: center;
`;

const labelsBlock = `
  flex: 7;
`;

const formBlock = `
  flex: 5;
`;

const inputWrapper = `
  position: relative;
  background-color: #fff;
  color: ${colorBlue};
  border-radius: 4px;
`;

const exchangeButton = `
  width: 100%;
  border-radius: 5px;
  height: 46px;
  line-height: 46px;
  padding: 0 46px;
  background: ${colorGreen};
  border: none;
  color: #fff;
  font-size: 20px;
  margin-top: 30px;
`;

const input = `
  color: ${colorBlue};
  background: none;
  border: 0;
  height: 70px;
  margin: 0;
  font-size: 24px;
  padding: 17px 150px 0 20px;
  width: 100%;
`;

const exchangeInputTitle = `
  color: ${colorBlue};
  position: absolute;
  top: 5px;
  left: 20px;
  font-size: 14px;
`;

const exchangeInputSearch = `
  position: absolute;
  right: 0;
  top: 0;
  padding-left: 8px;
  border-left: 1px solid ${colorBlue};
  width: 140px;
  height: 70px;
  font-size: 20px;
  color: ${colorBlue};
  display: flex;
  align-items: center;
  text-transform: uppercase;
`;

const subName = `
  font-size: 10px;
  top: -0.9em;
`;

const arrow = `
  position: absolute;
  right: 10px;
  top: 32px;
  border: 6px solid transparent;
  border-top: 6px solid ${colorBlue};
`;

const sequenceBlock = `
  height: 50px;
  width: 100%;
  padding-left: 50px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-right: 30px
`;

const circle = `
  position: absolute;
  width: 10px;
  height: 10px;
  top: 20px;
  left: 18px;
  background-color: #fff;
  border-radius: 50%;
`;

const line = `
  position: absolute;
  left: 22px;
  height: 50px;
  top: 0;
  width: 2px;
  background-color: #fff;
`;

const exchangeSequence = `
  font-size: 12px;
  color: white;
`;

const toggleButton = `
  position: absolute;
  width: 20px;
  height: 20px;
  right: 10px;
  top: 15px;
  color: ${colorGreen};
  cursor: pointer;
  display: flex;
`;

const coinIcon = `
  width: 20px;
  margin-right: 5px;
  filter: invert(95%) sepia(57%) saturate(4466%) hue-rotate(69deg) brightness(86%) contrast(85%);
`;

const selectFromWrapper = `
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
`;

const selectContainer = `
  position: absolute;
  top: 3px;
  right: 3px;
  border-radius: 4px;
  background-color: white;
  width: 330px;
  z-index: 15;
`;

const searchInput = `
  width: 100%;
  border: none;
  border-bottom: 1px solid #b6c0cb;
  font-size: 16px;
  margin-bottom: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 40px;
`;

const currencyListContainer = `
  overflow: scroll;
  max-height: 250px;
  padding: 5px 0;
`;

const currencyList = `
  list-style: none;
  padding: 0 5px;
  margin: 0;
  color: black;
`;

const currencyItem = `
  display: flex;
  padding: 2px 14px;
  cursor: pointer;
  display: flex;
  font-size: 12px;
  align-items: center;
`;

const coinTicker = `
  flex: 2;
  text-transform: uppercase;
  padding-left: 5px;
`;

const coinName = `
  flex: 3;
  color: #ccc;
  text-align: left;
  word-break: break-all;
`;

const inputLoader = `
  position: absolute;
  bottom: 14px;
  left: 20px;
  color: ${colorGreen};
`;

const sreachIcon = `
  position: absolute;
  color: #d7dfe8;
  left: 10px;
  top: 10px;
`;

const footer = `
  padding: 21px 0px;
  width: 100%;
  text-align: center;
  background: linear-gradient(270deg, #CDBAFF 0%, #5E5AE2 97.43%);
  font-size: 20px;
  color: white;
  text-transform: capitalize;
  font-weight: 600;
`;

const starsSubTitle = `
  margin-bottom: 20px;
  max-width: 270px;
  display: inline-block;
  position: relative;
  text-transform: capitalize;
`;

const starsSubTitleText = `
  color: #FFC24A;
  font-size: 18px;
  font-weight: 600;
`;

const bigStar = `
  position: absolute;
  right: -18px;
  top: -24px;
  width: 16px;
  height: auto;
`;

const smallStar = `
  position: absolute;
  right: -30px;
  top: 0;
  width: 10px;
  height: auto;
`;

const trustpilot = `
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

module.exports = {
  mainContainer,
  mainHeader,
  subTitle,
  mainBlock,
  block,
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
  selectFromWrapper,
  selectContainer,
  searchInput,
  currencyListContainer,
  currencyItem,
  currencyList,
  coinTicker,
  coinName,
  inputLoader,
  sreachIcon,
  subName,
  mainPageHeader,
  pluginContainer,
  formContainer,
  footer,
  starsSubTitle,
  bigStar,
  smallStar,
  starsSubTitleText,
  trustpilot
};
