export var setInitialValuesReducer = (state={}, action) => {
	switch(action.type){
		case 'SET_INITIAL_VALUES':
		 return action.value;
		default:
		 return state;
	}
}
// updating the store
export var getPrintNamesReducer = (state = {}, action) => {
	switch (action.type) {
		case 'PRINT_NAMES_LIST':
			return action.printNames;
		default:
			return state;
	}
}
export var getVehicleDataReducer = (state = {}, action) => {
	switch (action.type) {
		case 'VEHICLE_DATA':
			return action.vehicleData;
		default:
			return state;
	}
}
export var getPackageDetailsReducer = (state = [], action) => {
	switch (action.type) {
		case 'DEALER_PACKAGE_DATA':
			return action.dealerPackagInfo;
		default:
			return state;
	}
}
export var getFinancialDataReducer = (state = {}, action) => {
	switch (action.type) {
		case 'FINANCIAL_DATA':
			return action.financialData;
		default:
			return state;
	}
}
export var getTradeinVehiclesReducer = (state = {}, action) => {
	switch (action.type) {
		case 'TRADEIN_VEHICLE_DATA':
			return action.tradeinData;
		default:
			return state;
	}
}

