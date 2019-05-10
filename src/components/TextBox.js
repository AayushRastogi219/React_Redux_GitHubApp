import React, {Component} from 'react';

class TextBox extends Component{
  constructor(props) {
    super(props);

  }

  render(){
    return(
      <div style={{marginLeft:15, marginTop:15, marginRight:15, marginBottom:15}}>
        <input style={inputstyle} type='text' value={this.props.updatedUserDetail} onChange={this.props.onUserDetailChange} placeholder={this.props.placeholder} />
      </div>
    )
  }
}

const inputstyle={
  borderRadius:'3px',
  padding: '5px 10px',
  border: '1px solid #ccc',
  height:'auto',
  width: '100%',
  clear:'left'
};

export default TextBox;
