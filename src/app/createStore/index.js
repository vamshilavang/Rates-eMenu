import { combineReducers } from 'redux';
import {
	setInitialValuesReducer,
	getPackageDetailsReducer,
	getPrintNamesReducer,
	getVehicleDataReducer,
	getFinancialDataReducer,
	getTradeinVehiclesReducer
} from '../reducers/reducers';
import rates from '../reducers/provider-rates';

export default combineReducers({
	setInitialValues: setInitialValuesReducer,
	printNames: getPrintNamesReducer,
	vehicleData: getVehicleDataReducer,
	financialInfo: getFinancialDataReducer,
	dealerPackage: getPackageDetailsReducer,
	tradeinData: getTradeinVehiclesReducer,
	rates,
});
