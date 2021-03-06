import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectedProducts from '../../common/selectedProducts.js';
// import { getPackageDetails } from '../../../actions';
import { getDealerPackageDetails, getNameList, getVehicleData, getFinancialData, getTradeinVehicles } from '../../../actions/print.js';
import { dealerData } from '../../../helper/index.js'

class InvoiceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }

  }

  componentDidMount() {
    let loadData = [];
    let dealerData = {};
    let urlArr = window.location.href.split('/');
    dealerData.dealid = urlArr[urlArr.length - 4]
    dealerData.dealjacketid = urlArr[urlArr.length - 3];

    loadData.push(this.props.getNameList(dealerData.dealjacketid, dealerData.dealid));
    loadData.push(this.props.getVehicleData(dealerData.dealjacketid, dealerData.dealid));
    loadData.push(this.props.getDealerPackageDetails(dealerData.dealjacketid, dealerData.dealid));
    loadData.push(this.props.getFinancialData(dealerData.dealjacketid, dealerData.dealid));
    loadData.push(this.props.getTradeinVehicles(dealerData.dealjacketid, dealerData.dealid));


    Promise.all(loadData).then(() => {
      this.setState({ loaded: true, firstname: urlArr[urlArr.length - 2], lastname: urlArr[urlArr.length - 1] })
      //setTimeout(() => { window.print() }, 100)
    });
  }

  render() {

    let content = <div></div>;
    if (this.state.loaded) {
      let customerInfo = this.props.printNames.results[0];
      let vehicleInfo = this.props.vehicleData.results[0];
      let financialInfo = this.props.financialInfo;
      let selectedDealerPackageArr = this.props.dealerPackage.filter(d => d.is_package_selected);
      let selectedProducts = []
      let declinedProducts = [];
      let packagePrice = 0;
      let selectedDealerPackage;
      if(selectedDealerPackageArr.length){
        selectedDealerPackage = selectedDealerPackageArr[0];
        selectedProducts = selectedDealerPackage.products;
        packagePrice = parseInt(selectedDealerPackage.price);
        if (selectedDealerPackage.position > 1) {
        let mainDealerPackage = this.props.dealerPackage.find(d => d.position == 1);
        declinedProducts = mainDealerPackage.products.filter(m => {
          let decline = true;
          selectedProducts.map(s => {
            if (s.name == m.name) decline = false
          })
          if (decline) return m;
        })
      }
    }else{
      let mainDealerPackage = this.props.dealerPackage.find(d => d.position == 1);
        declinedProducts = mainDealerPackage.products;
        selectedProducts = []
      }
      
      let userName = `${this.state.lastname}, ${this.state.firstname}`;
      // let selectedPackage = this.props.dealerPackage.find(d => d.is_package_selected == true);
      let totalAmt = parseInt(financialInfo.amount_financed) + packagePrice;
      let d = new Date();
      let currentTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      content = <div>
        <div className='row-fluid first-row'>
          <div className='span2'><img className="print-image" src="../img/kyalaLogo.png" alt="" /></div>
          <div className='span10'>
            <div className="row print-summary-top">
              <span className="print-customer-name">{`${customerInfo.first_name} ${customerInfo.last_name}`}</span>
              <span className="print-model-info">{`${vehicleInfo.year} ${vehicleInfo.make}  ${vehicleInfo.model_number} ${vehicleInfo.model} ${vehicleInfo.vin} - ${vehicleInfo.odometer} miles`}</span>
            </div>
            <div className="row print-financial-info">
              <span>Selling Price: ${financialInfo.selling_price}</span>
              <span>Trade In: ${this.props.tradeinData.allowance}</span>
              <span>Payoff: ${this.props.tradeinData.payoff}</span>
              <span>Cash Down: ${financialInfo.total_down_payment}</span>
              <span>Rebate: ${financialInfo.rebate_amount}</span>
            </div>
            <div className="row print-financial-info">
              <span>Base Amt Financed: ${financialInfo.amount_financed}</span>
              <span>Total Amt Financed:  ${totalAmt}</span>
              <span>Term: {financialInfo.term} months</span>
              <span>Rate: {financialInfo.apr} %</span>
              <span>Payment: ${financialInfo.monthly_payment}</span>
            </div>
          </div>
        </div>

        <SelectedProducts first_name={customerInfo.first_name} last_name={customerInfo.last_name} selectedProducts={selectedProducts} declinedProducts={declinedProducts} />

        <div className='row-fluid'>
          <div className='span9' >
            <span>Signature: ________________________________________________________</span>
          </div>
          <div className='span3 text-right'>
            <span>Prepared by:</span><span>{userName} on {currentTime}</span>
          </div>
        </div>

        <div className="row print-footer">
          You should be aware the products above are optional and contain additional benefits, limitations and exclusions from coverage. PLEASE REVIEW THE CONTRACT.  Payments listed above are estimates.  For specific payment information, please refer to the product contract.  The purchase of value added products is NOT required in order to obtain financing or to lease/purchase a vehicle.Each value added optional product may be purchased separately.
        </div>
      </div >
    }

    return (
      <div>{content}</div>
    )
  }
}

//setting it to printNames
function mapStateToProps(state) {
  console.log(state);
  return {
    printNames: state.printNames,
    vehicleData: state.vehicleData,
    financialInfo: state.financialInfo,
    dealerPackage: state.dealerPackage,
    tradeinData: state.tradeinData,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getFinancialData, getNameList, getVehicleData, getDealerPackageDetails, getTradeinVehicles
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceView);