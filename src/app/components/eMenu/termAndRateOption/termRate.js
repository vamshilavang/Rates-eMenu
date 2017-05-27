import React from 'react';
import GridView from './GridView';

class TermRate extends React.Component {
  constructor(props){
   super(props);

 this.state = {
    optionTypes: [
      { name: 'option 1', position: 1 , pointer: 0, title : 'option1'},
      { name: 'option 2', position: 2 , pointer: 1, title : 'option2'},
      { name: 'option 3', position: 3 , pointer: 2, title : 'option3'},
      { name: 'option 4', position: 4 , pointer: 3, title : 'option4'}
    ]
  }
    this.promoteHandle = this.promoteHandle.bind(this);

}
promoteHandle(){
  console.log('Promtg Handle', this.props)
  this.props.events();
}
render() {
  let options = this.state.optionTypes;

  return (
    <div className="container-fluid row">
      <span className="term-rate">Term & Rate Options</span>
      <div className="App">
            <GridView options={this.state.optionTypes} selectedOption={'BALL'} ref="grid" promot={this.promoteHandle} />
        <button className="btn btn-primary pull-right btn-cus" type="button" onClick={()=> { this.refs.grid.submitHandle() }}>get rates</button>
      </div>
    </div>
    );
}


 }
export default TermRate;
