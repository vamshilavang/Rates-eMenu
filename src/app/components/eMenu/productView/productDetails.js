import React, {
  Component
} from 'react';
import { connect } from 'react-redux';
import { updateProductRate, updateProductRateCost, updatePlanRate, updatePlanPrice } from '../../../actions/actions';
import _ from 'underscore';
import RatesOptions from './rateOptions';

function getLevels(Levels) {
  const levelType1 = Levels;
  const levelType2 =(levelType1 && levelType1.length) ? levelType1[0].Levels : null;
  const levelType3 =(levelType2 && levelType2.length) ? levelType2[0].Levels : null;
  return {
  levelType1,
  levelType2,
  levelType3
};
}

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    //this.props.dispatch(updateProductRate(retailRate.RetailRate, this.props.product.id));
  const key = `${props.product.id}-${props.providerId}-${props.productCode}-${props.providerCode}`;
console.log(key);
console.log(props.rateInfo);

    let providerRate = props.rateInfo.get(key);
    providerRate = providerRate ? providerRate[0].Levels : null;

    this.state = {
      rateIndex:0,
      ...getLevels(providerRate),
      programIndex:0,
      coverageIndex:0,
      planIndex:0,
      RetailRate: {
          RetailRate: 0
        }
    }
  }
  componentWillReceiveProps(nextProps){
    console.log('nextProps.rateInfo',nextProps.rateInfo);
    let providerRate = nextProps.rateInfo.get(`${nextProps.product.id}-${nextProps.providerId}-${nextProps.productCode}-${nextProps.providerCode}`);
    providerRate = providerRate ? providerRate[0].Levels : null;
    console.log(nextProps.providerCode);
    this.setState({...getLevels(providerRate)});
  }
  selectionEvent(priceObj, plan) {
    let rate = this.state.RetailRate;
    if (priceObj.checked) {
      rate.RetailRate += priceObj.price;
    } else {
      rate.RetailRate -= priceObj.price;
    }
    rate.OptionId = priceObj.OptionId;
    rate.checked = priceObj.checked;
    this.setState({
      RetailRate: rate
    });
    this.props.dispatch(updatePlanPrice(plan, rate , this.props.product.id))
    this.props.dispatch(updateProductRate(rate.RetailRate, this.props.product.id));
  }
  setLevel1 = (levels, index) =>{
    const levelType1 = levels[index];
    const levelType2 = (levelType1 && levelType1.Levels ) ? levelType1.Levels : null;
    const levelType3 = (levelType2 && levelType2.length) ? levelType2[0].Levels : null;
    this.setState({levelType2, levelType3, programIndex: index});
  }
  getRetailRate = (rate, plan) => {
    let retailPrice = {
      error: false,
      errorMessage: '',
      RetailRate: 0,
      isDisabled: false,
      OptionId: 0,
      checked: false,
      min: 0,
      max: 0
    };
    if (rate && rate.length) {
      let RetailRate = rate[0].RetailRate;
      const RegulatedRuleId = rate[0].RegulatedRuleId;
      retailPrice.RetailRate = RetailRate,
      retailPrice.min = rate[0].MaxRetailRate,
      retailPrice.max = rate[0].MaxRetailRate
      rate[0].Options.map(item => {
      if (item.IsSelected) {
          RetailRate += item.RetailRate;
         }
      })
      if (RegulatedRuleId) {
        const max = rate[0].MaxRetailRate;
        const min = rate[0].MinRetailRate;
        if (RegulatedRuleId === 5) {
          if (RetailRate < min || RetailRate > max) {
            retailPrice.error = true;
            retailPrice.errorMessage = `Price sholud be in the range of ${min}  and ${max}`;
          }
        }
        if (RegulatedRuleId === 3) {
          retailPrice.isDisabled = true;
        }
      }
    }
    // dont want to reRender, as this function is getting
    // called inside render function.
    // So dont want to trigger react life cycle methods. Hence not using this.setState()
    this.state.RetailRate = retailPrice;
    //  this.props.dispatch(updatePlanPrice('plan2', retailPrice ))
  }
  setLevel2 = (levels, index) =>{
    const levelType2 = levels[index];
    const levelType3 = (levelType2 && levelType2.Levels ) ? levelType2.Levels : null;
    this.setState({ levelType3, coverageIndex: index});
  }
  setLevel3 = (levels, index) =>{
    this.setState({ rateIndex: index, planIndex: index});
  }
   Levels = (levelType, keyType,  fn, selectedIndex= 0 ) => {
     const isRateable = this.props.product.isRateable;
    if(isRateable && levelType && levelType.length ){
      return (<div className="row r-small-bottom-margin">
        <p className="r-gray r-bottom-no-margin r-small-text">{levelType[0].LevelType}</p>
        <select value={levelType[selectedIndex].Desc} className="control-group"  onChange={event =>{
          fn(levelType, event.target.selectedIndex)}}>
        {levelType.map((item, i) => {
            return <option key={ `${keyType}${item.Desc}${this.props.product.id}${i}`}>{item.Desc}</option>
        })}
        </select>
      </div>);
    }
    return null;
  };
  getCost = rate => {
    let cost = 0;
    if (rate) {
      cost = rate[0].DealerCost;
      rate[0].Options.map(item => {
        if (item.IsSelected) {
          cost += item.NetRate;
        }
      })
    }
    this.props.dispatch(updateProductRate(this.state.RetailRate.RetailRate, this.props.product.id));
    this.props.dispatch(updateProductRateCost( this.props.product.id, cost));

    return cost + this.state.RetailRate.RetailRate;
  }

  getTerm = (rates, type) =>{
    const product = this.props.product;
    if (product.isRateable) {
  //  if ((product.extension_data && product.extension_data.length < 3) || (!product.extension_data)) {
      if(!rates){
        return [];
      }
        return (
            rates.map((item, i) => {
          return <option key={`${item.TermMileage.Term} / ${item.TermMileage.Mileage}${item.TermMileage.TermId + i}`}>{`${item.TermMileage.Term} / ${item.TermMileage.Mileage}`}</option>
        })
      );
    }
    const len =  product.extension_data.length;
    let term = [];
    let mileage =[];
    const termMilage= [];
    for (let i = 0; i < len; i++) {
    if(product.extension_data[i].option_name === 'Term'){
      term.push(product.extension_data[i].option_value);
    }
    if(product.extension_data[i].option_name === 'Mileage'){
      mileage.push( product.extension_data[i].option_value);
    }
    }
    for(let i =0 ; i< term.length ; i++){
      termMilage.push(<option key={`${term[i]} / ${mileage[i]}`+i}>{`${term[i]} / ${mileage[i]}`}</option>)
    }
    return termMilage;
  }

  getDeductible = (rates) => {
    const product = this.props.product;
    if (product.isRateable) {
      if(!rates){
        return [];
      }
      const DeductAmt = _(rates).groupBy((item) => item.Deductible.DeductAmt);
      const amount = Object.keys(DeductAmt);
      return (
        amount.map((item, i) => {
          return <option key = {item + i} > {item} </option>
        })
      );
    }
  const len = product.extension_data.length;
  const deductible = [];
    for (let i = 0; i < len; i++) {
      if (product.extension_data[i].option_name === 'Deductible') {
        deductible.push(<option key = {`${product.extension_data[i].option_value}`+i} >
         { product.extension_data[i].option_value}
         </option>);
        }
      }
      return deductible;
  }
  getRateInfo = (levels) => {
    levels = levels.filter(level => level && level.length);
    if (levels) {
      return levels[levels.length - 1];
    }
  }
  getRates = (rateprops, rateIndex) => {
    if (rateprops && rateprops.length) {

      return rateprops[rateIndex].RateInfo.Rates
    }
  }
  getRateOptions = (Rates, plan) => {
     const isRateable = this.props.product.isRateable;
    const options = [];
    if(isRateable){
    Rates[0].Options.map((opt, i) => {
          const selected = this.state.RetailRate.OptionId === opt.OptionId ? this.state.RetailRate.checked : opt.IsSelected;
             options.push(
                <RatesOptions key ={opt.OptionDesc+i}
                isSelected={selected}
                OptionDesc={opt.OptionDesc}
                IsSurcharge ={opt.IsSurcharge}
                opt ={opt}
                onSelect ={event => this.selectionEvent(event, plan)}
                />);
      });
    return( <div className="row r-small-bottom-margin">
      <p className="r-gray r-small-text">Options</p>
      {options.map(item => item)}
      </div>);
    }
    return null;
  }
  render() {
    const levelType1 = this.state.levelType1;
    const levelType2 =this.state.levelType2;
    const levelType3 = this.state.levelType3;
    const rateprops = this.getRateInfo([levelType1, levelType2, levelType3]);
    const rate = this.getRates(rateprops, 0);
    this.getRetailRate(rate);
    const termMilage = this.getTerm(rate);
    const deductible =  this.getDeductible(rate);
    const rateOptions = rate ? this.getRateOptions(rate, this.props.plan): [];
    return (
      <div className="span3 r-small-right-left-margin">
        <div className="rcorners">
          <div className="row r-small-bottom-margin-h"><b>{this.props.name}</b></div>
            {this.Levels(levelType1, 'program', this.setLevel1, this.state.programIndex)}
            {this.Levels(levelType2, 'coverage', this.setLevel2, this.state.coverageIndex)}
            {this.Levels(levelType3, 'plan', this.setLevel3, this.state.planIndex)}
            <div className="row r-small-bottom-margin">
            <p className="r-gray r-bottom-no-margin r-small-text">Term/Miles</p>
            <select className="control-group">
            {termMilage.map(item => item)}
            </select>
            </div>
            <div className="row r-small-bottom-margin">
            <p className="r-gray r-bottom-no-margin r-small-text">Deductible</p>
            <select className="control-group">
            {deductible.map(item => item)}
            </select>
            </div>
            {rateOptions}
            <span className="prod-tot">Cost</span>
            <div className="input-prepend input-append default-margin-tp-btm cus-input">
            <span className="add-on" id="sizing-addon2">$</span>
            <input value={this.getCost(rate)} type="text" className="form-control" onChange={() => {}}/>
            </div>
            <span className="prod-tot">Price</span>
            <div className="input-prepend input-append cus-input">
            <span className="add-on" id="sizing-addon2">$</span>
            <input value ={this.state.RetailRate.RetailRate} type="text" className="form-control" onChange={() => {
                this.props.dispatch(updatePlanPrice(this.props.plan, this.state.RetailRate.RetailRate ))
            }}/>
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToprops = state =>({
  rateInfo: state.rates.providerRate
});
const mapDispatchToProps = dispatch => ({dispatch });

export default connect(mapStateToprops, mapDispatchToProps)(ProductDetails);
