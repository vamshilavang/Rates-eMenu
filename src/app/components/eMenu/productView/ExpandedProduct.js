import React from 'react';
import {connect} from 'react-redux';
import { updateProductRate, updateProductRateCost, updatePlanRate, updatePlanPrice } from '../../../actions/actions';
import RatesOptions from './rateOptions';
import ProductDetails from './productDetails';

class ExpandedProduct extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    if(this.props.rateInfo && !this.props.rateInfo.size){
      return <span/>;
    }
    return(
      <div className="row">
        <ProductDetails
          providerId={this.props.providerId}
          providerCode={this.props.providerCode}
          productCode= {this.props.productCode}
          name='PLATINUM'
          plan='plan1'
          product={this.props.product}
          key='PLATINUM'
        />
        <ProductDetails
          providerId={this.props.providerId}
          providerCode={this.props.providerCode}
          productCode= {this.props.productCode}
          name='GOLD'
          plan='plan2'
          product={this.props.product}
          key='GOLD'
        />
        <ProductDetails
          providerId={this.props.providerId}
          providerCode={this.props.providerCode}
          productCode= {this.props.productCode}
          name='SILVER'
          plan='plan3'
          product={this.props.product}
          key='SILVER'
        />
        <ProductDetails
          providerId={this.props.providerId}
          providerCode={this.props.providerCode}
          productCode= {this.props.productCode}
          name='BASIC'
          plan='plan4'
          product={this.props.product}
          key='BASIC'
        />
      </div>
    );
  }
}

const mapStateToprops = state =>({
  rateInfo: state.rates.providerRate
});
const mapDispatchToProps = dispatch => ({dispatch });

export default connect(mapStateToprops, mapDispatchToProps)(ExpandedProduct);
