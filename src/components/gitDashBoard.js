import React, {Component} from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../css/SearchForm.css'
import {connect} from 'react-redux'
import ReactDOM from 'react-dom';
import Modal from 'react-modal'
import UserDetails from './UserDetails'
import UserRepoDetails from './UserRepoDetails'
import DisplayUserName from './DisplayUserName'
import Button from './Button';
import {changeGitUserName, changeGitUserData, changeGitUserRepoData} from '../action/action';

class gitDashBoard extends Component{
  constructor(){
    super();
    this.state={
      isActive:false,
      allSearchedUsers:[]
    }
  }
  componentWillMount(){
    Modal.setAppElement('body')
  }

  componentDidMount(){
    this.updateDataListItems(this.loadAllSearchedUsersFromLocalStorage())
  }
  componentWillUnmount(){
    // console.log('componentWillUnmount got called')
    // localStorage.removeItem(this.props.userNameLocalStorage)
  }

  loadAllSearchedUsersFromLocalStorage=()=> {
    try {
        const deserializedState = localStorage.getItem(this.props.userNameLocalStorage)
        if (deserializedState === null) return []
        return JSON.parse(deserializedState)
      } catch(e) {
        console.log(e)
        return undefined
      }
  }

  saveAllSearchedUsersToLocalStorage=(userName)=>{
    try {
      if(userName !== ""){
      let isUserAlreadySearched=false
      let index=0
      let allExistingSearchedUsers = this.loadAllSearchedUsersFromLocalStorage()
      for(let i=0; i<allExistingSearchedUsers.length; i++){
        if(allExistingSearchedUsers[i].name !== userName){
          isUserAlreadySearched = false
          index = index+1;
        }
        else{
          isUserAlreadySearched = true;
          break;
        }
      }
      if(!isUserAlreadySearched) allExistingSearchedUsers.push({id: index+1, name:userName});

      const serializedState = JSON.stringify(allExistingSearchedUsers)
      localStorage.setItem(this.props.userNameLocalStorage, serializedState)
      this.updateDataListItems(allExistingSearchedUsers)
    }} catch(e) {
      console.log(e)
    }
  }

  updateDataListItems=(allSearchedUserNames)=>{
    if(typeof(allSearchedUserNames) !== 'undefined'){
      let str='';
      for (let i = 0; i < allSearchedUserNames.length; i++) {
        str += '<option value="'+allSearchedUserNames[i].name+'" />';
      }
      ReactDOM.findDOMNode(document.getElementById('gitHubSearchedUsers')).innerHTML=str;
    }
  }

  onUserNameChange=(event)=>{
    this.props.changeGitUserNameStateInReducer(event.target.value);
  }

  onSubmitClick=(event)=>{
    event.preventDefault();
    this.saveAllSearchedUsersToLocalStorage(this.props.gitUserAccountName);
    this.getUserDetails()
  }

  getUserDetails=()=>{
    const userProfileDetails = async ()=>{
      try{
        if(this.props.gitUserAccountName){
          const response = await fetch(this.props.gitHubApiUrl+this.props.gitUserAccountName)
          if (!response.ok) throw Error(response.statusText);

          const userProfileData= await response.json()
          this.props.changeGitUserProfileDataStateInReducer(userProfileData);
          this.props.changeGitUserRepoDataStateInReducer({});
        }
        else{
          this.props.changeGitUserProfileDataStateInReducer({});
          this.props.changeGitUserRepoDataStateInReducer({});
        }
      } catch(error){
        console.log(error)
      }
    }
    userProfileDetails();
  }

  onShowRepoClick=(event)=>{
    const userRepoDetails = async ()=>{
      try{
        if(this.props.gitUserAccountName){
          const response = await fetch(this.props.gitHubApiUrl+this.props.gitUserAccountName+'/repos')
          if (!response.ok) throw Error(response.statusText);

          const userRepoData= await response.json()
          this.props.changeGitUserRepoDataStateInReducer(userRepoData);
        }
      } catch(error){
        console.log(error)
      }
    }
    userRepoDetails();
  }

  editUserToggleModal=()=>{
    this.setState({isActive:!this.state.isActive})
  }

  onAfterSaveCell=(row, cellName, cellValue)=>{
    let allExistingSearchedUsers = this.loadAllSearchedUsersFromLocalStorage()
    for(let i=0; i<allExistingSearchedUsers.length; i++){
      if(allExistingSearchedUsers[i].id === row.id) allExistingSearchedUsers[i].name = row.name
    }
    const serializedState = JSON.stringify(allExistingSearchedUsers)
    localStorage.setItem(this.props.userNameLocalStorage, serializedState)
    this.updateDataListItems(allExistingSearchedUsers)
  }
  onAfterInsertRow=(row)=> {
    this.saveAllSearchedUsersToLocalStorage(row.name);
  }
  onAfterDeleteRow=(rowKeys)=>{
    let allExistingSearchedUsers = this.loadAllSearchedUsersFromLocalStorage()
    for(let i=0; i<allExistingSearchedUsers.length; i++){
      if(allExistingSearchedUsers[i].id === rowKeys[0]) allExistingSearchedUsers.splice(i,1)
    }
    const serializedState = JSON.stringify(allExistingSearchedUsers)
    localStorage.setItem(this.props.userNameLocalStorage, serializedState)
    this.updateDataListItems(allExistingSearchedUsers)
  }

  render(){
    const cellEditProp = {mode: 'click', blurToSave: true, afterSaveCell: this.onAfterSaveCell}
    const options = {afterInsertRow: this.onAfterInsertRow, afterDeleteRow: this.onAfterDeleteRow}
    const selectRowProp = {mode:'radio', clickToEdit: true, bgColor: 'lightblue'};

    const isUserProfileDataValid = (Object.keys(this.props.gitUserProfileData).length) ? true : false;
    const isUserRepoDataValid = ((Object.keys(this.props.gitUserRepoData).length) ? true : false);

    return(
      <section>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">React Redux GitHub Profile Finder App</h1>
          </header>
        </div>

        <div>
          <form className="search-form" onSubmit={this.onSubmitClick} autoComplete="on">
            <input className="field" placeholder={this.props.placeholderUserName} value={this.props.gitUserAccountName} onChange={this.onUserNameChange} list="gitHubSearchedUsers" />
            <datalist id="gitHubSearchedUsers"></datalist>
            <span style={buttonContainerstyle}><Button buttonName={this.props.editUserNameButton} onSubmitClick={this.editUserToggleModal}/></span>

            <Modal style={CustomStyles} isOpen={this.state.isActive} onRequestClose={this.editUserToggleModal}>
              <DisplayUserName searchedUserNameData={this.loadAllSearchedUsersFromLocalStorage()} cellUpdateProp={cellEditProp} onAfterInsertRow={options} rowSelectionProp={selectRowProp}/>
              <span style={{float:'right', marginRight:2, marginBottom:2}}>
                <Button buttonName={this.props.closeModalDialogButton} onSubmitClick={this.editUserToggleModal}/>
                <Button buttonName={this.props.saveModalDialogButton} onSubmitClick={this.editUserToggleModal}/>
              </span>
            </Modal>

          </form>

          {isUserProfileDataValid && <UserDetails userProfileData={this.props.gitUserProfileData}/>}
          {isUserProfileDataValid && <span style={buttonContainerstyle}><Button buttonName={this.props.showAllRepoButton} onSubmitClick={this.onShowRepoClick}/></span>}
          {isUserRepoDataValid && <UserRepoDetails userProfileData={this.props.gitUserRepoData}/>}

        </div>
      </section>
    )
  }

}

function mapStatesToProps(state){
  return{gitUserAccountName:state.accountReducer.gitUserName, gitUserProfileData:state.accountReducer.gitUserProfileData, gitUserRepoData:state.accountReducer.gitUserRepoData};
}

function dispatchStatesToProps(dispatch){
  return{changeGitUserNameStateInReducer:(updatedGitUserName)=>{
      dispatch(changeGitUserName(updatedGitUserName))
    },
    changeGitUserProfileDataStateInReducer:(updatedGitUserProfileData)=>{
      dispatch(changeGitUserData(updatedGitUserProfileData))
    },
    changeGitUserRepoDataStateInReducer:(updatedGitUserRepoData)=>{
      dispatch(changeGitUserRepoData(updatedGitUserRepoData))
    }
  }
}
gitDashBoard.defaultProps={
  placeholderUserName:"User Name",
  showAllRepoButton:"Show all repos",
  editUserNameButton:"Edit",
  closeModalDialogButton:"Close",
  saveModalDialogButton:"Save",
  userNameLocalStorage:"searchedGitHubUserName",
  gitHubApiUrl:"https://api.github.com/users/"
}
const buttonContainerstyle={
  display:'inline',
  width:'7%',
  marginLeft:'15px'
};

const CustomStyles = {
  overlay: {
    backgroundColor: 'rgba(32, 40, 46, 0.5)',
    display: 'flex',
    alignItems: 'center'
  },
  content : {
   top                   : '50%',
   left                  : '50%',
   right                 : 'auto',
   bottom                : 'auto',
   marginRight           : '-50%',
   transform             : 'translate(-50%, -50%)',
   width:'40%',
   height:'42%',
   borderRadius:'15px'
  }
}

export default connect(mapStatesToProps, dispatchStatesToProps)(gitDashBoard);
