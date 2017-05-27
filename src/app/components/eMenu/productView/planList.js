import React, { Component } from 'react';
import {connect} from 'react-redux';
import { dealerData } from '../../../helper/index.js';

class PlanOption extends Component {
  constructor() {
    super();
    this.renderPlan = this.renderPlan.bind(this);
    this.state = {
      showProdDetails:''
    };
  }
  onChange = (plan) => {
    this.setState({showProdDetails: plan});
  }
  renderPlanDetails(price, type){
    const option =[];
    let baseValue =36;
    for (let i = 1; i < 5; i++) {
      option.push(`${baseValue} months @ ${price || 438}`);
      baseValue+=12;
    }
    return(<div className="plan-list--price-details">
        {option.map((item, i) => {
           return (
             <p key={i+type+price}>
               <input type="radio"  name="plan-details" value={(i+1)} />
               <span className="plans-radio-option">{item}</span>
             </p>);
        })}
      </div>
    );
  }
  renderPlan(planList){
            var moreProductOptions = planList,
            listProducts =  moreProductOptions.map((moreProduct, index) =>
            <div className ="span3" key={"itmVl"+index}>
               <div className ="r-panel1" key={"itmVl1"+index}>
               <p><input type="radio" name="plans" value={moreProduct.title} onChange={()=> this.onChange(moreProduct.title)}/><span className="plans-radio-option">{moreProduct.title}</span></p>
               <span className="prod-tot">Total Cost</span>
               <div className="input-prepend input-append cus-input default-margin-tp-btm">
                <span className="add-on" id="sizing-addon2">$</span>
                <input type="text" className="form-control" value={moreProduct.value}/>
               </div>
               <span className="prod-tot">Total Price</span>
              <div className="input-prepend input-append cus-input">
                <span className="add-on" id="sizing-addon2">$</span>
                <input type="text" className="form-control" value={moreProduct.price}/>
               </div>
               {this.state.showProdDetails === moreProduct.title ? this.renderPlanDetails(moreProduct.price, moreProduct.title ) : null}
              </div>
              </div>
            );
            return listProducts;
  }
  
  render() {
    let dealid = dealerData.dealid;
    let dealjacketid = dealerData.dealjacketid;
    let firstname = dealerData.user_first;
    let lastname = dealerData.user_last;
      return (
         <div>
          {this.renderPlan([{title: 'PLATINUM', value:this.props.plan1, price: this.props.price1}, {title: 'GOLD', value:this.props.plan2, price: this.props.price2}, {title: 'SILVER', value:this.props.plan3, price: this.props.price3},{title: 'BASIC', value:this.props.plan4, price: this.props.price4}])}
          <hr/>
           <button className="btn btn-primary pull-right p-btn">Presentation</button>
           <button className="btn btn-default pull-right p-btn"><a href={`http://localhost:6127/#/printselection/${dealid}/${dealjacketid}/${firstname}/${lastname}`} target="_blank">Print Menu</a></button>
           <button className="btn btn-default pull-left p-btn">Decline Packages</button>
           <button className="btn btn-default pull-left p-btn"><a href={`http://192.168.17.37:6127/#/printFinalMenu/${dealid}/${dealjacketid}/${firstname}/${lastname}`} target="_blank">Print FinalMenu</a></button>

         </div>
          )
          }
  }

const mapStateToprops = state =>({
  plan1:state.rates.plan1,
  plan2:state.rates.plan2,
  plan3:state.rates.plan3,
  plan4:state.rates.plan4,
  price1: state.rates.planPrice.get('price1'),
  price2: state.rates.planPrice.get('price2'),
  price3: state.rates.planPrice.get('price3'),
  price4: state.rates.planPrice.get('price4')
});

export default connect(mapStateToprops, null) (PlanOption);
