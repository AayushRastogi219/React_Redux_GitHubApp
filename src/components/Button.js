import React, {Component} from 'react';

class Button extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <button style={buttonstyle}  type="button" onClick={this.props.onSubmitClick}>{this.props.buttonName}</button>
    )
  }
}
const buttonstyle={
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  width:'inherit',
  marginRight:'inherit'
};

export default Button;
