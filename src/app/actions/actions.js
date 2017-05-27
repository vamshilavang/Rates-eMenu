import axios from 'axios';
import httpHelper from '../utils/httpHelper';
import config from '../config.js';
import {
  GET_RATES,
  SET_INITIAL_VALUES,
  UPDATE_PRODUCT_RATE,
  UPDATE_PRODUCT_RATE_COST,
  UPDATE_RATE,
  UPDATE_PLAN_PRICE
} from '../constants';
import {
  dealerData,
  populateDealerData
} from '../helper';

populateDealerData();
const dealjacketid = dealerData.dealjacketid;
const dealid = dealerData.dealid;
const rateUrl = `${config.dealProductsAPI}/deal/v1/deal-jackets/${dealjacketid}/deals/${dealid}/required-fields/`;

export var setInitialValues = (values) => {
  return {
    type: SET_INITIAL_VALUES,
    payload: values
  }
}

export function updateProductRate(rate, productId) {
  return {
    type: UPDATE_PRODUCT_RATE,
    payload: {
      rate: rate,
      id: productId
    }
  }
}

export function updateProductRateCost(productId, cost) {
  return {
    type: UPDATE_PRODUCT_RATE_COST,
    payload: {
      cost,
      id: productId
    }
  }
}

export function updatePlanRate(productId, plan) {
  return {
    type: UPDATE_RATE,
    payload: {
      productId,
      plan
    }
  }
}

export function updatePlanPrice(plan, price) {
  return {
    type: UPDATE_PLAN_PRICE,
    payload: {
      plan,
      price
    }
  };
}

export function getDealerRates(providerId, productCode, providerCode, id) {
  return (dispatch) => {
    const apiConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    axios.get(rateUrl).then((data) => {
      let deal_menu_json = data.data.deal_menu_json;
      deal_menu_json = JSON.parse(deal_menu_json);
      let provider;
      deal_menu_json.Products.map(item => {
        if (item.ProductTypeCode === productCode && item.ProviderId === providerCode ) {
          provider = item;
        }
      });
      deal_menu_json.Products = [provider];
      deal_menu_json.keydata = getRateRequestBody(providerId);
      console.log(deal_menu_json);
      const url = `${config.ratingAPI}/Rating/RatingRESTAPI/json/rates_json`;
      axios.post(url, deal_menu_json, apiConfig).then(function(response) {
          console.log('Rate-response', response);
          dispatch({
            type: GET_RATES,
            payload: {response, key:`${id}-${providerId}-${productCode}-${providerCode}`}
          });
        })
        .catch((e) => {});
    });
  }
}

function getRateRequestBody(providerId) {
  const keyData = {
    "EchoData": dealid,
    "ClientId": "DEM",
    "ClientDealerId": providerId,
    "DTDealerId": providerId,
    "RequestDate": `\/Date(${new Date().getTime()})\/`,
    "ContractDate": `\/Date(${new Date().getTime()})\/`
  }
  return keyData;
}
