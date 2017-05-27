import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './createStore';
import Emenu from './components/eMenu/eMenu';
import InvoiceView from './components/eMenu/invoice/invoiceView.js';
import PrintFinal from './components/eMenu/invoice/printFinal.js';
import logger from 'redux-logger'

const store = createStore(
  reducers,
  applyMiddleware(thunk,logger));



class App extends Component {
  
  render() {
    let content = '';
    let container = 'container';
    if(window.location.href.indexOf('printselection')>-1){
      content = <InvoiceView/>
    }else if(window.location.href.indexOf('printFinalMenu')>-1){
      content = <PrintFinal/>
    }else{
      content = <Emenu/>
      container = 'container-fluid';
    }

    // let content = (window.location.href.indexOf('printselection')>-1) ? <InvoiceView/> : (window.location.href.indexOf('printFinalMenu')>-1) ? <PrintFinal/>  :<Emenu />;
    return (
      <Provider store={store}>
        <div>
          <div className={container} style={{marginTop: '10px'}}>
            {content}
          </div>
        </div>
      </Provider>
    );
  }
}
export default App;
