import React from 'react';
var axios = require('axios');
import { findDOMNode } from 'react-dom';
import HttpHelper from '../../../utils/httpHelper.js';
import config from '../../../config.js';
import {dealerData,populateDealerData} from '../../../helper/index.js';

class GridView extends React.Component {
   constructor(props){
    super(props);
    populateDealerData();
    console.log('config',config);
    this.state = {
      options : this.props.options,
      selectedOption: this.props.selectedOption,
      financialInfo: {},
      isLoading: true,
      rate: '',
      isRateError: false,
      rateMsg: '',
      isTermError: false,
      termMsg:'',
      dealjacketid: dealerData.dealjacketid,
      dealid: dealerData.dealid,
      deal_type: dealerData.deal_type,
      dealer_code: dealerData.dealer_code
    }
    this.updatePayment = this.updatePayment.bind(this);
    this.updateMonthCount = this.updateMonthCount.bind(this);
    this.getInitialValues = this.getInitialValues.bind(this);
    this.setInitialValues = this.setInitialValues.bind(this);

    this.changeRate = this.changeRate.bind(this);
    this.changeTerm = this.changeTerm.bind(this);
    this.changePayment = this.changePayment.bind(this);
    this.processOptions = this.processOptions.bind(this);

  }
  componentWillMount(){
    this.getInitialValues(this.state.selectedOption);
    this.getDealTerms();
  }
  getDealTerms(){
    //let dealItemsUrl = `${config.dealTermsAPI}/deal/v1/deal-jackets/310200000000000016/deals/310200000000000017/deal-term-rate-options/`;
    let dealItemsUrl = `${config.dealTermsAPI}/deal/v1/deal-jackets/${this.state.dealjacketid}/deals/${this.state.dealid}/deal-term-rate-options/`;
    let that  = this;
    HttpHelper(dealItemsUrl, 'get', '').then(function(data){
      console.log('DealItems', data);
      that.setState({ dealTerms: data  });
    }.bind(this));
  }
  submitHandle(){
   var dealTerms = this.state.dealTerms;
   console.log('this.refs', this.refs);
   var formData = [];

   var option1 = {};

   option1.term = this.refs.option1Term.value;
   if(this.refs.option1Monthly_payment) {
     option1.payment = this.refs.option1Monthly_payment.value;
     option1.ballon_payment = this.refs.option1Monthly_payment.value;
   }
   if(this.refs.option1Money_factor) option1.money_factor = this.refs.option1Money_factor.value;
   if(this.refs.option1Residual_percentage) option1.residual = this.refs.option1Residual_percentage.value;
   if(this.refs.option1CashApr) option1.apr = this.refs.option1CashApr.value;
   option1.position = '';
   option1.deal_id = this.state.dealid;
   option1.deal_jacket_id = this.state.dealjacketid;
   option1.dlr_cd= this.state.dealer_code;

   var option2 = {};
   if(this.refs.option2Box.checked === true){

   if(this.refs.option2Term.value !== '') {
      option2.term = this.refs.option2Term.value;
      this.refs.option2Term.className = "form-control borderd-hfit ";
    }
   else  this.refs.option2Term.className = "form-control borderd-hfit err";

   if(this.refs.option2Monthly_payment.value !== '') {
     option2.monthly_payment = this.refs.option2Monthly_payment.value;
     option2.ballon_payment = this.refs.option2Monthly_payment.value;
     //this.refs.option2Monthly_payment.className = "form-control borderd-hfit ";
   }

   if(this.refs.option2Money_factor) {
     option2.money_factor = this.refs.option2Money_factor.value;
     //this.refs.option2Money_factor.className = "form-control borderd-hfit "
   } //else this.refs.option2Money_factor.className = "form-control borderd-hfit err";

   if(this.refs.option2Residual_percentage && this.refs.option2Residual_percentage.value !== '') {
     option2.residual = this.refs.option2Residual_percentage.value;
     this.refs.option2Residual_percentage.className = "form-control borderd-hfit ";
   } else { if(this.refs.option2Residual_percentage) {this.refs.option2Residual_percentage.className = "form-control borderd-hfit err"; return false; }}

   if(this.refs.option2CashApr.value !== '') {
     option2.apr = this.refs.option2CashApr.value;
     this.refs.option2CashApr.className = "form-control borderd-hfit ";
   }else {this.refs.option2CashApr.className = "form-control borderd-hfit err"; return false;}

   option2.payment = '';
   option2.position = '';
   option2.deal_id = this.state.dealid;
   option2.deal_jacket_id = this.state.dealjacketid;
   option2.dlr_cd= this.state.dealer_code;
  }

   var option3 = {};
   if(this.refs.option3Box.checked == true){
     if(this.refs.option3Term.value !== '') {
        option3.term = this.refs.option3Term.value;
        this.refs.option3Term.className = "form-control borderd-hfit ";
      }else  {this.refs.option3Term.className = "form-control borderd-hfit err"; return false}

     if(this.refs.option3Monthly_payment.value !== '') {
       option3.monthly_payment = this.refs.option3Monthly_payment.value;
       option3.ballon_payment = this.refs.option3Monthly_payment.value;
       //this.refs.option3Monthly_payment.className = "form-control borderd-hfit ";
     }

     if(this.refs.option3Money_factor) {
        option3.money_factor = this.refs.option3Money_factor.value;
        //this.refs.option3Money_factor.className = "form-control borderd-hfit "
     } //else this.refs.option3Money_factor.className = "form-control borderd-hfit err";

     if(this.refs.option3Residual_percentage && this.refs.option3Residual_percentage.value !== '') {
        option3.residual = this.refs.option3Residual_percentage.value;
       this.refs.option3Residual_percentage.className = "form-control borderd-hfit "
     }else { if(this.refs.option3Residual_percentage) { this.refs.option3Residual_percentage.className = "form-control borderd-hfit err"; return false; } }

     if(this.refs.option3CashApr.value !== '') {
        option3.apr = this.refs.option3CashApr.value;
       this.refs.option3CashApr.className = "form-control borderd-hfit "
     }else {this.refs.option3CashApr.className = "form-control borderd-hfit err"; return false;}

     option3.payment = '';
     option3.position = '';
     option3.deal_id = this.state.dealid;
     option3.deal_jacket_id = this.state.dealjacketid;
     option3.dlr_cd= this.state.dealer_code;
  }

   var option4 = {};
   if(this.refs.option4Box.checked == true){

   if(this.refs.option4Term.value !== '') {
      option4.term = this.refs.option4Term.value;
      this.refs.option4Term.className = "form-control borderd-hfit ";
    }else  {this.refs.option4Term.className = "form-control borderd-hfit err"; return false;}

   if(this.refs.option4Monthly_payment.value !== '') {
     option4.monthly_payment = this.refs.option4Monthly_payment.value;
     option4.ballon_payment = this.refs.option4Monthly_payment.value;
     //this.refs.option4Monthly_payment.className = "form-control borderd-hfit ";
   }

   if(this.refs.option4Money_factor) {
     option4.money_factor = this.refs.option4Money_factor.value;
     //this.refs.option3Money_factor.className = "form-control borderd-hfit ";
   }

   if( this.refs.option4Residual_percentage && this.refs.option4Residual_percentage.value !== '') {
      option4.residual = this.refs.option4Residual_percentage.value;
      this.refs.option4Residual_percentage.className = "form-control borderd-hfit ";
    }else { if(this.refs.option4Residual_percentage) {this.refs.option4Residual_percentage.className = "form-control borderd-hfit err"; return false;} }

   if(this.refs.option4CashApr.value !== '') {
     option4.apr = this.refs.option4CashApr.value;
    this.refs.option4CashApr.className = "form-control borderd-hfit ";
  }else{ this.refs.option4CashApr.className = "form-control borderd-hfit err"; return false;}

   option4.payment = '';
   option4.position = '';
   option4.deal_id = this.state.dealid;
   option4.deal_jacket_id = this.state.dealjacketid;
   option4.dlr_cd= this.state.dealer_code;
  }
   formData.push(option1);
   if(this.refs.option2Box.checked === true) formData.push(option2);
   if(this.refs.option3Box.checked === true) formData.push(option3);
   if(this.refs.option4Box.checked === true) formData.push(option4);
   var deal = {};
   deal.dlr_cd = this.state.dealer_code;
   deal.deal_jacket_id = this.state.dealjacketid;
   deal.deal_id = this.state.dealid;
   deal.prod_dlr_id = '';
   deal.termrateoptions = formData;

    console.log('Deal insert data', JSON.stringify(deal));

    //var dealPostUrl = `${config.dealTermsAPI}/deal/v1/deal-jackets/310200000000000016/deals/310200000000000017/deal-term-rate-options/`;
    let dealPostUrl = `${config.dealTermsAPI}/deal/v1/deal-jackets/${this.state.dealjacketid}/deals/${this.state.dealid}/deal-term-rate-options/`;
    let that  = this;
    HttpHelper( dealPostUrl, 'post', deal).then(function(data){
      console.log('response of deal post', data);
      that.props.promot();
    }.bind(this));

  }

  updateMonthCount(event){

    let updatedPayment = parseInt(this.state.rate) * parseInt(event.target.value);
    this.setState({monthCount:event.target.value, totalPayment: updatedPayment})
   }

  updatePayment(event){
    let updatedPayment = parseInt(this.state.monthCount) * parseInt(event.target.value);
    this.setState({rate: event.target.value, totalPayment: updatedPayment});
   }
   getInitialValues(selectedOption){
    let that = this;
    //let apiUrl = `${config.dealFinanceAPI}/deal/v1/deal-jackets/310200000000000623/deals/310200000000000624/deal-finance-summary/`;
    let apiUrl = `${config.dealFinanceAPI}/deal/v1/deal-jackets/${this.state.dealjacketid}/deals/${this.state.dealid}/deal-finance-summary/`;
    console.log('apiUrl',apiUrl);
    HttpHelper(apiUrl, 'get', '').then(function(data){
      that.setInitialValues(data);
    }.bind(this));

   }
   setInitialValues(financialData){
    const  type = (financialData.finance_method === 'RETL' && (financialData.term === 0 || financialData.term === 1)) ? 'CASH' : financialData.finance_method;
    financialData.finance_method = type;
      this.setState({
        financialInfo: financialData,
        isLoading: false
      });
   }
   changeApr(target, factorRef, event){
     var cVal = event.target.value;
     if(isNaN(this.refs[target].value)){
       this.refs[target].className = "form-control borderd-hfit err";
     }else if(parseFloat(this.refs[target].value) > 99.99){
       this.refs[target].className = "form-control borderd-hfit err";
     }else{
       this.refs[target].className = "form-control borderd-hfit";
       this.refs[factorRef].value = (this.refs[target].value/2400);
    }
  }
   changeRate(target,  event){
     var cVal = event.target.value;
     if(isNaN(this.refs[target].value)){
       this.refs[target].className = "form-control borderd-hfit err";
     }else if(parseFloat(this.refs[target].value) > 99.99){
       this.refs[target].className = "form-control borderd-hfit err";
     }else{
       this.refs[target].className = "form-control borderd-hfit";
    }


      if(isNaN(event.target.value)){
         this.setState({
          rate: cVal,
          isRateError: true,
          rateMsg: 'Please Enter Numeric Values'
        });
      }else if(parseFloat(cVal) > 99.9999){
        console.log('More than 99')
        this.setState({
          rate: cVal,
          isRateError: true,
          rateMsg: 'Value Should not Exceed 99.9999'
        });
      }else{
           this.setState({
            rate: cVal,
            isRateError: false,
            rateMsg: ''
          });
      }
   }

   processOptions(target, status){
     console.log('target, status', target, status);
     switch(target){
       case 'option2Term':
           this.refs.option2Box.checked = status;
           console.log('this.refs.option2Box.checked',this.refs.option2Box.checked);
       break;
       case 'option3Term':
          this.refs.option3Box.checked = status;
       break;
       case 'option4Term':
          this.refs.option4Box.checked = status;
       break;
     }
   }

   changeTerm(target, event){
     console.log('option1', this.refs);
     if(this.refs[target].value == ''){
       this.processOptions(target, false);
    }
    else if(isNaN(this.refs[target].value !=='')){
      this.refs[target].className = "form-control borderd-hfit err";
       this.processOptions(target, true);
    }else if(this.refs[target].value !=='' && parseInt(this.refs[target].value) > 999){
      this.refs[target].className = "form-control borderd-hfit err";
       this.processOptions(target, true);
    }else{
      this.refs[target].className = "form-control borderd-hfit";
      this.processOptions(target, true);
    }

   }
   changePayment(target, event){
    if(isNaN(this.refs[target].value)){
      this.refs[target].className = "form-control borderd-hfit err";
    }else if(parseInt(this.refs[target].value) > 999){
      this.refs[target].className = "form-control borderd-hfit err";
    }else{
      this.refs[target].className = "form-control borderd-hfit";
    }

   }

  render() {
    let dtls = this.state;
    let options = this.state.options;
    const {financialInfo} = this.state;
    // console.log('financialInfo.finance_method', financialInfo)
    return (
      <div>
      {
        [...options].map((option, i) =>
        <div key={i} className="span3">
        {
          !dtls.isLoading  ?
          <div className="r-panel">
            <p>{option.name !== 'option 1' ? <input type="checkbox" name={option.name} defaultChecked = 'true' ref = {option.title + 'Box'}/> : null } {option.name} </p>
            <div className="lessPad">
            {financialInfo.finance_method === 'CASH' &&
            <div className="cashDtlsForm">
            <label className="opt-label">Term</label>
            <div className="input-append default-margin-tp-btm cus-input lessPad">
            {dtls.dealTerms ?
              <input type="text" className={"form-control borderd-hfit "}
                defaultValue = {option.position === 1 ? dtls.financialInfo.term :
                  (dtls.dealTerms ? (dtls.dealTerms.termrateoptions[option.pointer] ? dtls.dealTerms.termrateoptions[option.pointer].term : '' ) : '') }
                ref={option.title+"Term"}
                disabled = { option.position === 1 ? 'disabled' : false }
                onChange={(event)=>this.changeTerm(option.title+"Term",  event)} />
            :
            <input type="text" className={"form-control borderd-hfit "}
              defaultValue = {option.position === 1 ? dtls.financialInfo.term : (dtls.financialInfo.term + (12 * (parseInt(option.position) - 1))) }
              ref={option.title+"Term"}
              disabled = { option.position === 1 ? 'disabled' : false }
              onChange={(event)=>this.changeTerm(option.title+"Term", event)} />
            }
            </div>

             <label className="opt-label"> Rate</label>
              <div className="input-append default-margin-tp-btm cus-input lessPad">
              <input type="text" className="form-control borderd hfit"
                ref={option.title+"CashApr"}
                defaultValue =  {option.position === 1 ? dtls.financialInfo.apr :
                  (dtls.dealTerms ?
                  (dtls.dealTerms.termrateoptions[option.pointer] ? dtls.dealTerms.termrateoptions[option.pointer].apr : '') : '') }
                onChange={(event)=>this.changeRate(option.title+"CashApr", event)}
                disabled = { option.position === 1 ? 'disabled' : false }/>
                <span className="add-on" id="sizing-addon2">%</span>
               </div>

               <label className="opt-label">Payment</label>
               <div className="input-append input-prepend default-margin-tp-btm cus-input cus-payment lessPad">
                <span className="add-on cus-addon" id="sizing-addon2">$</span>
                 <input type="text" className="form-control"
                   ref={option.title+"Monthly_payment"}
                   defaultValue = {option.position === 1 ? dtls.financialInfo.monthly_payment : '' }
                   onChange={(event)=>this.changePayment(option.title+"Monthly_payment", event)}
                   disabled = { option.position  ? 'disabled' : false }/>
               </div>
             </div>
            }

            {financialInfo.finance_method === 'RETL' &&
              <div className="retlDtlsForm">
                <label className="opt-label">Term</label>
                <div className="input-prepend input-append default-margin-tp-btm cus-input lessPad">
                <input type="text" className={"form-control borderd-hfit "}
                  defaultValue = {option.position === 1 ? dtls.financialInfo.term : (dtls.financialInfo.term + (12 * (parseInt(option.position) - 1))) }
                  ref={option.title+"Term"}
                  disabled = { option.position === 1 ? 'disabled' : false }
                  onChange={(event)=>this.changeTerm(option.title+"Term", event)} />
                </div>

                <label className="opt-label">APR</label>
                <div className="input-append default-margin-tp-btm cus-input lessPad">
                <input type="text" className="form-control borderd hfit"
                  ref={option.title+"CashApr"}
                  defaultValue =  {option.position === 1 ? dtls.financialInfo.apr :
                    (dtls.dealTerms ?
                    (dtls.dealTerms.termrateoptions[option.pointer] ? dtls.dealTerms.termrateoptions[option.pointer].apr : '') : '') }
                  onChange={(event)=>this.changeApr(option.title+"CashApr", event)}
                  disabled = { option.position === 1 ? 'disabled' : false }/>
                  <span className="add-on" id="sizing-addon2">%</span>
                </div>

                <label className="opt-label">Payment</label>
                <div className="input-prepend input-append default-margin-tp-btm cus-input cus-payment lessPad">
                <span className="add-on" id="sizing-addon2">$</span>
                <input type="text" className="form-control"
                  ref={option.title+"Monthly_payment"}
                  defaultValue = {option.position === 1 ? dtls.financialInfo.monthly_payment : '' }
                  onChange={(event)=>this.changePayment(option.title+"Monthly_payment", event)}
                  disabled = { option.position  ? 'disabled' : false } />
                  </div>
             </div>
            }

            {financialInfo.finance_method === 'LEAS' &&
            <div className="leasDtlsForm">
              <label className="opt-label">Term</label>
              <div className="input-append default-margin-tp-btm cus-input lessPad">

              {dtls.dealTerms ?
                <input type="text" className={"form-control borderd-hfit "}
                  defaultValue = {option.position === 1 ? dtls.financialInfo.term :
                    (dtls.dealTerms ? (dtls.dealTerms.termrateoptions[option.pointer] ? dtls.dealTerms.termrateoptions[option.pointer].term : '' ) : '') }
                  ref={option.title+"Term"}
                  disabled = { option.position === 1 ? 'disabled' : false }
                  onChange={(event)=>this.changeTerm(option.title+"Term",  event)} />
              :
              <input type="text" className={"form-control borderd-hfit "}
                defaultValue = {option.position === 1 ? dtls.financialInfo.term : (dtls.financialInfo.term + (12 * (parseInt(option.position) - 1))) }
                ref={option.title+"Term"}
                disabled = { option.position === 1 ? 'disabled' : false }
                onChange={(event)=>this.changeTerm(option.title+"Term", event)} />
              }
              </div>
              <label className="opt-label">APR</label>
              <div className="input-append default-margin-tp-btm cus-input lessPad">
              <input type="text" className="form-control borderd hfit"
                ref={option.title+"CashApr"}
                defaultValue =  {option.position === 1 ? dtls.financialInfo.apr :
                  (dtls.dealTerms ?
                  (dtls.dealTerms.termrateoptions[option.pointer] ? dtls.dealTerms.termrateoptions[option.pointer].apr : '') : '') }
                onChange={(event)=>this.changeApr(option.title+"CashApr", event)}
                disabled = { option.position === 1 ? 'disabled' : false }/>
                <span className="add-on" id="sizing-addon2">%</span>
              </div>

              <label className="opt-label">Money Factor</label>
              <div className="input-append default-margin-tp-btm cus-input lessPad">
                <input type="text" className="form-control borderd-hfit"
                  ref={option.title+"Money_factor"}
                 defaultValue = {option.position === 1 ? (financialInfo.apr/2400) :
                   (dtls.dealTerms ?
                     (dtls.dealTerms.termrateoptions[option.pointer] ? dtls.dealTerms.termrateoptions[option.pointer].money_factor : '') : '' )}
                 disabled = { option.position === 1 ? 'disabled' : true }/>
              </div>

              <label className="opt-label">Residual</label>
              <div className="input-append default-margin-tp-btm cus-input lessPad">
                <input type="text" className="form-control borderd hfit"
                ref={option.title+"Residual_percentage"}
                onChange={(event)=>this.changeRate(option.title+"Residual_percentage", event)}
                defaultValue = {option.position === 1 ? financialInfo.residual_percentage :
                  (dtls.dealTerms ?
                    (dtls.dealTerms.termrateoptions[option.pointer] ? dtls.dealTerms.termrateoptions[option.pointer].residual : ''): '') }
                disabled = { option.position === 1 ? 'disabled' : false }/>
                <span className="add-on" id="sizing-addon2">%</span>
              </div>

              <label className="opt-label">Payment</label>
              <div className="input-append input-prepend default-margin-tp-btm cus-input cus-payment lessPad">
              <span className="add-on cus-addon" id="sizing-addon2">$</span>
              <input type="text" className="form-control"
                  ref={option.title+"Monthly_payment"}
                  defaultValue = {option.position === 1 ? dtls.financialInfo.monthly_payment : '' }
                  onChange={(event)=>this.changePayment(option.title+"Monthly_payment", event)}
                  disabled = { option.position  ? 'disabled' : false } />
                </div>
              </div>
            }

            {financialInfo.finance_method === 'BALL' &&
            <div className="leasDtlsForm">
              <label className="opt-label">Term</label>
              <div className="input-append default-margin-tp-btm cus-input lessPad">
              {dtls.dealTerms ?
                <input type="text" className={"form-control borderd-hfit "}
                  defaultValue = {option.position === 1 ? dtls.financialInfo.term :
                    (dtls.dealTerms ? (dtls.dealTerms.termrateoptions[option.pointer] ? dtls.dealTerms.termrateoptions[option.pointer].term : '' ) : '') }
                  ref={option.title+"Term"}
                  disabled = { option.position === 1 ? 'disabled' : false }
                  onChange={(event)=>this.changeTerm(option.title+"Term",  event)} />
              :
              <input type="text" className={"form-control borderd-hfit "}
                defaultValue = {option.position === 1 ? dtls.financialInfo.term : (dtls.financialInfo.term + (12 * (parseInt(option.position) - 1))) }
                ref={option.title+"Term"}
                disabled = { option.position === 1 ? 'disabled' : false }
                onChange={(event)=>this.changeTerm(option.title+"Term", event)} />
              }
              </div>

              <label className="opt-label">APR</label>
              <div className="input-append default-margin-tp-btm cus-input lessPad">
              <input type="text" className="form-control borderd hfit"
                ref={option.title+"CashApr"}
                defaultValue =  {option.position === 1 ? dtls.financialInfo.apr :
                  (dtls.dealTerms ?
                  (dtls.dealTerms.termrateoptions[option.pointer] ? dtls.dealTerms.termrateoptions[option.pointer].apr : '') : '') }
                onChange={(event)=>this.changeApr(option.title+"CashApr", event)}
                disabled = { option.position === 1 ? 'disabled' : false }/>
                <span className="add-on" id="sizing-addon2">%</span>
              </div>

               <label className="opt-label">Balloon Payment</label>
               <div className="input-append input-prepend default-margin-tp-btm cus-input cus-payment balloon-payment lessPad">
                <span className="add-on" id="sizing-addon2">$</span>
                 <input type="text" className="form-control"
                  ref={option.title+""}
                  defaultValue = {option.position === 1 ? dtls.financialInfo.residual_percentage : '' }
                  disabled = { option.position  ? 'disabled' : false }
                  onChange={(event)=>this.changeRate(option.title+"", event)} />
               </div>

               <label className="opt-label">Payment</label>
               <div className="input-append input-prepend default-margin-tp-btm cus-input cus-payment lessPad">
               <span className="add-on cus-addon" id="sizing-addon2">$</span>
               <input type="text" className="form-control"
                   ref={option.title+"Monthly_payment"}
                   defaultValue = {option.position === 1 ? dtls.financialInfo.monthly_payment : '' }
                   onChange={(event)=>this.changePayment(option.title+"Monthly_payment", event)}
                   disabled = { option.position  ? 'disabled' : false } />
                 </div>
            </div>
            }

           </div>

          </div>
          : <h3> Loading Info...</h3>
        }
         </div>
        )}
      </div>
     )

  }

}
export default GridView;
