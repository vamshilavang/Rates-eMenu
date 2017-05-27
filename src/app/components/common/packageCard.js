import React, { Component } from 'react';

class PackageCard extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let pkg = this.props.pkg;
    

    return (
      <div className="package-card">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">{pkg.package_name}</h3>
          </div>
          <div className="panel-body print-card">
            {
              pkg.products.map((p, i) => {
                let selectedPayment = p.payment_options.find(pay=>pay.termrateoptions.term==p.term)
                return (
                  <div className="main">
                    <div className="row-fluid" key={`${pkg.package_name}_${i}`}>
                      <div className="span6 prod-name">{p.name}</div>
                      <div className="span6 text-right padding-right">${selectedPayment.payment_monthly}/mo</div>
                    </div>
                  
                    <div className="row-fluid" key={`${pkg.package_name}v_${i}`}>
                      <div className="span7">{p.term} mo/{p.miles} mi</div>
                      <div className="span5 text-right padding-right">{(p.deductible != null && p.deductible != 0) ? `$${p.deductible} Ded` : ``}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <ul className="list-group print-list">
          {
            pkg.package_options.map((opt, i) => {
              return (
                <li key={`${pkg.package_name}_${i}_options`} className="list-group-item"> ____{opt.termrateoptions.term} months = {opt.payment}</li>
              )
            })

          }
        </ul>
      </div>
    );
  }
}

export default PackageCard;