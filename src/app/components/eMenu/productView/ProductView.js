import React from 'react';
import {getDealerRates, updateProductRate, updatePlanRate} from '../../../actions/actions';
import ExpandedProduct from './ExpandedProduct';
import {connect} from 'react-redux';

function getPrice(rateInfo) {
return  rateInfo.length ? getDealerCost(rateInfo[0]) : 0;
}

function getDealerCost(rateInfo) {
  let dealerCost = 0;
  let levelLookUp = rateInfo.Levels[0];
  while(levelLookUp){
    if(levelLookUp.RateInfo && levelLookUp.RateInfo.Rates[0] ){
      dealerCost = levelLookUp.RateInfo.Rates[0].DealerCost;
      levelLookUp.RateInfo.Rates[0].Options.map(item => {
        if(item.IsSelected){
          dealerCost+=item.NetRate;
        }
      })
    }
    levelLookUp = levelLookUp.Levels[0];
  }
  return dealerCost;
}
function packageTypesState() {
  return{
    isPlan1Selected:false,
    isPlan2Selected:false,
    isPlan3Selected:false,
    isPlan4Selected:false
  };
}

class Product extends React.Component{
  constructor(props){
    super(props);
      this.state = {
          ...packageTypesState(),
          imageUrl: this.props.optType.imageUrl,
          title: this.props.optType.title,
          showMore: false,
          platinum: this.props.optType.platinum,
          gold: this.props.optType.gold,
          silver: this.props.optType.silver,
          basic: this.props.optType.basic,
          providerId: props.optType.providerList[0].providerId,
          productCode: props.optType.providerList[0].product_code,
          providerCode:  props.optType.providerList[0].provider_code
      }
  }
  componentWillMount(){
    this.props.dispatch(updateProductRate(getPrice(this.props.rateInfo), this.props.optType.id));
    if(this.props.optType.isRateable){
      let provider = this.props.optType.providerList[0];
console.log('provider---',provider);
      this.props.dispatch(getDealerRates(provider.providerId, provider.product_code, provider.provider_code, this.props.optType.id));
    }
  }

  updateShowMore(event) {
    this.setState({ showMore: !this.state.showMore });
  }
  getRates(event){
    const selectedProvider = this.props.optType.providerList[event.target.selectedIndex];
    this.props.dispatch(getDealerRates(selectedProvider.providerId, selectedProvider.product_code, selectedProvider.provider_code, this.props.optType.id));
    console.log('selectedProvider',selectedProvider);
    this.setState({
        providerCode: selectedProvider.product_code,
        providerId: selectedProvider.providerId
    });
  }
  onPlanChange =(plan) =>{
    let isSelected = false;
    switch (plan) {
      case 'plan1':
      isSelected =  !this.state.isPlan1Selected;
      this.setState({isPlan1Selected: !this.state.isPlan1Selected});
      break;
      case 'plan2':
      isSelected =  !this.state.isPlan2Selected;
      this.setState({isPlan2Selected: !this.state.isPlan2Selected});
      break;
      case 'plan3':
      isSelected =  !this.state.isPlan3Selected;
      this.setState({isPlan3Selected: !this.state.isPlan3Selected});
      break;
      case 'plan4':
      isSelected =  !this.state.isPlan4Selected;
      this.setState({isPlan4Selected: !this.state.isPlan4Selected});
      break;
    }
    this.props.dispatch(updatePlanRate(this.props.optType.id, plan, isSelected ));
  }
  render(){
    const id = this.props.optType.id;
    console.log('state--------',this.state);
    return(
      <div className="">
      <div className="row-fluid product">
        <div className="span4">
          <img src={this.props.optType.imageUrl ? this.props.optType.imageUrl.toString() : ""} width="100%" />
        </div>
        <div className="span4">
         <div className="prov-list">
          <p className="r-no-bottom-margin"><b>{this.state.title}</b></p>
          <p className="r-gray">{this.props.price.get(id)}</p>
          <p className="r-no-bottom-margin r-gray r-medium-text">Provider</p>
          <select className="control-group prod-form" onChange={(event) => this.getRates(event)}>
          {this.props.optType.providerList.map((provider, i) => <option key={provider.providerName+provider.providerId+i}>{provider.providerName}</option>)})}
          </select>
          <p className="r-small-top-margin"><a className="anchor-pointer" onClick={this.updateShowMore.bind(this)}>{this.state.showMore == false ? 'Show More' : 'Show Less'}</a></p>
         </div>
       </div>
        <div className="span4 r-checkbox-margin-top">
          <span className="row">
          <input className="prodbx" type="checkbox" checked={this.state.isPlan1Selected} key="platinum" onChange ={(event) => {this.onPlanChange('plan1')}} value={this.state.platinum} />
          <input className="prodbx" type="checkbox" checked={this.state.isPlan2Selected} key="gold" onChange ={(event) => {this.onPlanChange('plan2')}} value={this.state.gold} />
          <input className="prodbx" type="checkbox" checked={this.state.isPlan3Selected} key="silver" onChange ={(event) => {this.onPlanChange('plan3')}} value={this.state.silver}/>
          <input className="prodbx" type="checkbox" checked={this.state.isPlan4Selected} key="basic" onChange ={(event) => {this.onPlanChange('plan4')}} value={this.state.basic} />
          </span>
        </div>
      </div>
      {this.state.showMore && <ExpandedProduct key={"Expanded" + this.props.key}
       product = {this.props.optType}
       providerId = {this.state.providerId}
       providerCode = {this.state.providerCode}
       productCode = {this.state.productCode}
       />}
      <hr/>
    </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({dispatch });
const mapStateToprops = state =>({
  rateInfo: state.rates.ratesInfo,
  price: state.rates.productPrice
});

export default connect(mapStateToprops, mapDispatchToProps)(Product);
