import httpHelper from '../utils/httpHelper';
import config from '../config.js';
import printNames from '../mockAPI/printNames.js';
import VehicleData from '../mockAPI/Vehicle.js';
// import dealerPackageData from '../mockAPI/dealerPackage.js';
import financialInfoData from '../mockAPI/financialInfo.js';
const dealerPackageData = require('../mockAPI/dealerPackages.json');


export const getPackageDetails = (values) => {
    return {
        type: GET_PACKAGE_DETAILS,
        values
    }
}
export const getNameList_success = (printNames) => {
    return {
        type: 'PRINT_NAMES_LIST',
        printNames
    }
}
export const getVehicleData_success = (vehicleData) => {
    return {
        type: 'VEHICLE_DATA',
        vehicleData
    }
}
export const getPackageDetails_success = (dealerPackagInfo) => {
    return {
        type: 'DEALER_PACKAGE_DATA',
        dealerPackagInfo
    }
}
export const getFinancialData_success = (financialData) => {
    return {
        type: 'FINANCIAL_DATA',
        financialData
    }
}
export const getTradeinVehicles_success = (tradeinData) => {
    return {
        type: 'TRADEIN_VEHICLE_DATA',
        tradeinData
    }
}
//action creators
export function getNameList(dealjacketid, dealid) {
    return function (dispatch, getState) {
        return httpHelper(`${config.customerAPI}/mobile/v1/deal/deal-jackets/${dealjacketid}/deals/${dealid}/simple-customer/`, 'get')
            .then((printNames) => {
                dispatch(getNameList_success(printNames));
                return printNames;
            })

    }
}
export function getVehicleData(dealjacketid, dealid) {
    return function (dispatch, getState) {
        return httpHelper(`${config.vehicleAPI}/mobile/v1/deal/deal-jackets/${dealjacketid}/deals/${dealid}/vehicle/`, 'get')
            .then((vehicleData) => {
                dispatch(getVehicleData_success(vehicleData));
                return vehicleData;
            })

    }
}
export function getDealerPackageDetails(dealjacketid, dealid) {
    return function (dispatch, getState) {
        // return httpHelper(`${config.productsPackageAPI}/deal/v1/deal-jackets/${dealjacketid}/deals/${dealid}/package-products/`, 'get')
        //     .then((dealerPackageData) => {
        //         dispatch(getPackageDetails_success(dealerPackageData['packages']));
        //         return dealerPackageData;
        //     })
       return new Promise((resolve, reject) => {
            setTimeout(() => {
                dispatch(getPackageDetails_success(dealerPackageData['packages']));
                resolve(dealerPackageData);
            }, 100)
        })
    }
}
export function getFinancialData(dealjacketid, dealid) {
    return function (dispatch, getState) {

        return httpHelper(`${config.dealFinanceAPI}/deal/v1/deal-jackets/${dealjacketid}/deals/${dealid}/deal-finance-summary/`, 'get')
            .then((financialInfoData) => {
                dispatch(getFinancialData_success(financialInfoData));
                return financialInfoData;
            })

    }
}

export function getTradeinVehicles(dealjacketid, dealid) {
    return function (dispatch, getState) {
        return httpHelper(`${config.dealFinanceAPI}/deal/v1/deal-jackets/${dealjacketid}/deals/${dealid}/tradein-vehicles/`, 'get')
            .then((tradeinData) => {
                dispatch(getTradeinVehicles_success(tradeinData));
                return tradeinData;
            })

    }
}
