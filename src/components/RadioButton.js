import React, {Component} from 'react';

class RadioButton extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div style={{margin:20,display:'inline'}}>
      <label>{this.props.labelName}
        <input style={{marginLeft:5}} type='radio' value={this.props.labelName} checked={this.props.updatedGender} onChange={this.props.onGenderChange}/>
      </label>
      </div>
    )
  }
}
export default RadioButton;
