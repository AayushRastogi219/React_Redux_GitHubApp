import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import TextBox from './TextBox';
import RadioButton from './RadioButton';
import Button from './Button';
import {connect} from 'react-redux';
import * as formAction from '../action/action';

class MainForm extends Component{
  constructor() {
    super();
    this.state={
      errorType:{errorEmail:null, errorFirtName:null, errorSecondName:null, errorPassword:null, errorConfirmPassword:null, errorPasswordFormat:null, errorPasswordMismatch:null}, redirect:false
    }
  }

  onChangeEmailID=(event)=>{
    this.props.changeEmailIDStateInReducer(event.target.value);
  }
  onChangeFirstName=(event)=>{
    this.props.changeFirstNameStateInReducer(event.target.value);
  }
  onChangeSecondName=(event)=>{
    this.props.changeSecondNameStateInReducer(event.target.value);
  }
  onChangePassword=(event)=>{
    this.props.changePasswordStateInReducer(event.target.value);
  }
  onChangeConfirmPassword=(event)=>{
    this.props.changeConfirmedPasswordStateInReducer(event.target.value);
  }
  onChangeGender=(event)=>{
    if(event.target.value === 'Male'){
      this.props.changeMaleGenderStateInReducer(event.target.checked);
      this.props.changeFemaleGenderStateInReducer(!event.target.checked);
    }
    else{
      this.props.changeMaleGenderStateInReducer(!event.target.checked);
      this.props.changeFemaleGenderStateInReducer(event.target.checked);

    }
  }

  onSubmitButton=(event)=>{
    event.preventDefault();

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(this.props.emailID != null && this.props.emailID.match(mailformat)){
      this.setState(Object.assign(this.state.errorType,{errorEmail:''}));
    }
    else{
      this.setState(Object.assign(this.state.errorType,{errorEmail:'*Invalid EmailId'}));
    }

    if(this.props.firstName == null || this.props.firstName.length === 0){
      this.setState(Object.assign(this.state.errorType,{errorFirtName:'*Must Require'}));
    }
    else{
      this.setState(Object.assign(this.state.errorType,{errorFirtName:''}));
    }

    if(this.props.secondName == null || this.props.secondName.length === 0){
      this.setState(Object.assign(this.state.errorType,{errorSecondName:'*Must Require'}));
    }
    else{
      this.setState(Object.assign(this.state.errorType,{errorSecondName:''}));
    }

    if(this.props.password == null || this.props.password.length === 0){
      this.setState(Object.assign(this.state.errorType,{errorPassword:'*Must Require'}));
      this.setState(Object.assign(this.state.errorType,{errorPasswordFormat:''}));
    }
    else{
      this.setState(Object.assign(this.state.errorType,{errorPassword:''}));

      let passwordFormat = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/;
      if(this.props.password != null && this.props.password.match(passwordFormat)){
        this.setState(Object.assign(this.state.errorType,{errorPasswordFormat:''}));
      }
      else{
        this.setState(Object.assign(this.state.errorType,{errorPasswordFormat:'*Password is weak (atleast 8 char,1 special char, 1 upper case alphabate, 1 number)'}));
      }

    }

    if(this.props.confirmPassword == null || this.props.confirmPassword.length === 0){
      this.setState(Object.assign(this.state.errorType,{errorConfirmPassword:'*Must Require'}));
    }
    else{
      this.setState(Object.assign(this.state.errorType,{errorConfirmPassword:''}));
    }

    if(this.props.password != null && this.props.confirmPassword != null){
      if(this.props.password === this.props.confirmPassword){
        this.setState(Object.assign(this.state.errorType,{errorPasswordMismatch:''}));
      }
      else{
        this.setState(Object.assign(this.state.errorType,{errorPasswordMismatch:'*Password and Confirm Password Mismatch'}));
      }
    }

    const errorStates = {...this.state.errorType};
    if(errorStates.errorEmail==='' && errorStates.errorFirtName==='' && errorStates.errorSecondName==='' && errorStates.errorPassword==='' && errorStates.errorConfirmPassword==='' && errorStates.errorPasswordFormat==='' && errorStates.errorPasswordMismatch===''){
      this.setState({redirect:true})
    }
    else{
      this.setState({redirect:false})
    }
  }
  renderRedirect=()=>{
      if(this.state.redirect){
        return(<Redirect to='/gitDashBoard' />)
      }
      else{
        return(<div></div>)
      }
  }

  render(){
    return(
      <div>
      <form style={formstyle}>
        <TextBox placeholder={this.props.placeholderEmailId} updatedUserDetail={this.props.emailID} onUserDetailChange={this.onChangeEmailID} />
        <p style={style}>{this.state.errorType.errorEmail}</p>
        <TextBox placeholder={this.props.placeholderFirstName} updatedUserDetail={this.props.firstName} onUserDetailChange={this.onChangeFirstName}/>
        <p style={style}>{this.state.errorType.errorFirtName}</p>
        <TextBox placeholder={this.props.placeholderSecondName} updatedUserDetail={this.props.secondName} onUserDetailChange={this.onChangeSecondName}/>
        <p style={style}>{this.state.errorType.errorSecondName}</p>
        <TextBox placeholder={this.props.placeholderPassword} updatedUserDetail={this.props.password} onUserDetailChange={this.onChangePassword}/>
        <p style={style}>{this.state.errorType.errorPassword}</p>
        <p style={style}>{this.state.errorType.errorPasswordFormat}</p>
        <TextBox placeholder={this.props.placeholderConfirmPassword} updatedUserDetail={this.props.confirmPassword} onUserDetailChange={this.onChangeConfirmPassword}/>
        <p style={style}>{this.state.errorType.errorConfirmPassword}</p>
        <p style={style}>{this.state.errorType.errorPasswordMismatch}</p>
        <div style={{clear:'left'}}>
          <RadioButton labelName={this.props.male} onGenderChange={this.onChangeGender} updatedGender={!this.props.gender}/>
          <RadioButton labelName={this.props.female} onGenderChange={this.onChangeGender}  updatedGender={this.props.gender}/>
        </div>
        <div style={{margin:15, width:'97%'}}>
          <Button buttonName={this.props.signInButton} onSubmitClick={this.onSubmitButton}/>
        </div>
      </form>
      {this.renderRedirect()}
      </div>
    )
  }
}
MainForm.defaultProps={
  placeholderEmailId:"Email Id",
  placeholderFirstName:"First Name",
  placeholderSecondName:"Second Name",
  placeholderPassword:"Password",
  placeholderConfirmPassword:"Confirm Password",
  male:"Male",
  female:"Female",
  signInButton:"Sign In"
}

const style={
  color:"red",
  fontSize:'12px',
  float:'left',
  marginLeft:'10px'
}
const formstyle={
  width:'25%',
  backgroundColor: '#f2f2f2',
  borderRadius:'10px',
  margin:'0 auto',
  top:'10%',
  left:'40%',
  position:'absolute',
  transform:'translate(-50,-50)'
};

function mapStatesToProps(state){
  return{emailID:state.formReducer.userEmailID, firstName:state.formReducer.userFirstName, secondName:state.formReducer.userSecondName, password:state.formReducer.userPassword, confirmPassword:state.formReducer.userConfirmPassword, gender:state.formReducer.userGender};
}

function dispatchStatesToProps(dispatch){
  return{changeEmailIDStateInReducer:(updatedEmailID)=>{
    dispatch(formAction.changeEmailID(updatedEmailID))
  },
  changeFirstNameStateInReducer:(updatedFirstName)=>{
    dispatch(formAction.changeFirstName(updatedFirstName))
  },
  changeSecondNameStateInReducer:(updatedSecondName)=>{
    dispatch(formAction.changeSecondName(updatedSecondName))
  },
  changePasswordStateInReducer:(updatedPassword)=>{
    dispatch(formAction.changePassword(updatedPassword))
  },
  changeConfirmedPasswordStateInReducer:(updatedConfirmedPassword)=>{
    dispatch(formAction.changeConfirmPassword(updatedConfirmedPassword))
  },
  changeMaleGenderStateInReducer:(updatedGender)=>{
    dispatch(formAction.changeGender(updatedGender))
  },
  changeFemaleGenderStateInReducer:(updatedGender)=>{
    dispatch(formAction.changeGender(updatedGender))
  }
};
}

export default connect(mapStatesToProps, dispatchStatesToProps)(MainForm);
