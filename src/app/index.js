import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {populateDealerData} from './helper/index.js';



 let queryparam =  function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
       vars[hash[0]] = hash[1];
    }
    return vars;
}

if(window.dealerData){
    window.dealerData.deal_type = queryparam().deal_type
}
populateDealerData();
ReactDOM.render(<App/>,document.getElementById('root'));
