import {
  GET_RATES,
  UPDATE_PRODUCT_RATE,
  UPDATE_PRODUCT_RATE_COST,
  UPDATE_RATE,
  UPDATE_PLAN_PRICE
} from '../constants';

const initialState = {
	ratesInfo: [],
  providerRate: new Map(),
	productPrice: new Map(),
	productRateCost: new Map(),
	plan1:0,
	plan2:0,
	plan3:0,
	plan4:0,
	price1:0,
	price2:0,
	price3:0,
	price4:0,
	productOptionPrice : new Map(),
	planPrice: new Map()
};

export default function rates(state = initialState, action) {
  switch (action.type) {
    case GET_RATES:
    let newProviderRate = state.providerRate;
    newProviderRate.set(action.payload.key,action.payload.response.data.Products);
console.log('state',state);
      return { ...state,
        providerRate: newProviderRate,
        ratesInfo: action.payload.response.data.Products
      };

		case UPDATE_PRODUCT_RATE_COST:
			const {
				cost,
				id
			} = action.payload;
			let newProductCost = state.productRateCost ;
			newProductCost.set(id, (cost + state.productPrice.get(id)));
			return { ...state, productRateCost: newProductCost};

		case UPDATE_PLAN_PRICE:
			const {
				plan,
				price,
				prodId
			} = action.payload;
			let optionPrice = state.productOptionPrice;
			optionPrice.set(prodId, price.RetailRate);
			if(plan ==='plan1'){
						return { ...state, price1: price.RetailRate + state.price1, productOptionPrice:optionPrice };
			}
			if(plan==='plan2'){
				return { ...state, price2: price.RetailRate + state.price2, productOptionPrice:optionPrice};
			}
			if(plan==='plan3'){
				return { ...state, price3: price.RetailRate + state.price3, productOptionPrice:optionPrice};
			}
			if(plan==='plan4'){
				return { ...state, price4: price.RetailRate + state.price4, productOptionPrice:optionPrice};
			}
			return {...state};

		case UPDATE_RATE:
			const {
				productId,
				isSelected
			} = action.payload;
			const newPlanRate= state.productRateCost.get(productId)|| state.productPrice.get(productId);
			let newPrice =  state.planPrice ;
			let plancost =0;
			let prodPrice = state.productOptionPrice.get(productId) || 0;
			let totalPrice =0;
				if(action.payload.plan ==='plan1'){
					 	totalPrice = isSelected ? (newPrice.get('price1')||0) + prodPrice : (newPrice.get('price1')|| 0) - prodPrice ;
						newPrice = newPrice.set('price1', totalPrice);
						plancost = isSelected ? newPlanRate + state.plan1 : state.plan1 - newPlanRate ;
							return { ...state, plan1: plancost, planPrice: newPrice};
				}
				if(action.payload.plan==='plan2'){
					totalPrice = isSelected ? (newPrice.get('price2')||0) + prodPrice : (newPrice.get('price2')|| 0) - prodPrice ;
				 	newPrice = newPrice.set('price2', totalPrice);
				 	plancost = isSelected ? newPlanRate + state.plan2 : state.plan2 - newPlanRate ;
					 return { ...state, plan2: plancost, planPrice: newPrice};
				}
				if(action.payload.plan==='plan3'){
					totalPrice = isSelected ? (newPrice.get('price3')||0) + prodPrice : (newPrice.get('price3')|| 0) - prodPrice ;
				 	newPrice = newPrice.set('price3', totalPrice);
				 	plancost = isSelected ? newPlanRate + state.plan3 : state.plan3 - newPlanRate ;
					 return { ...state, plan3: plancost, planPrice: newPrice};
				}
				if(action.payload.plan==='plan4'){
					totalPrice = isSelected ? (newPrice.get('price4')||0) + prodPrice : (newPrice.get('price4')|| 0) - prodPrice ;
				 	newPrice = newPrice.set('price4', totalPrice);
				 	plancost = isSelected ? newPlanRate + state.plan4 : state.plan4 - newPlanRate ;
					 return { ...state, plan4: plancost, planPrice: newPrice};
				}
				return {...state};

    case UPDATE_PRODUCT_RATE:
      const {
        rate
      } = action.payload;
      let newProductPrice = state.productPrice;
      newProductPrice.set(action.payload.id, rate);
      return { ...state, productPrice: newProductPrice };

		default:
      return { ...state };
  }
}
