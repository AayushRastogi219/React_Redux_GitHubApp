import React,{Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import {Redirect} from 'react-router-dom';

class UserRepoDetails extends Component{
  constructor(props){
    super(props)
    this.state={
      redirect:false,
      selectedData:{}
    }
  }

  buttonFormatter=(cell, row)=>{
    return <button style={buttonstyle} type="button" onClick={() =>this.onShowRepoDetailClick(cell,row)}>Repo Details</button>
  }
  onShowRepoDetailClick=(cell,row)=>{
    if(row !==null && typeof(row) !== 'undefined'){
      this.setState({redirect:true})
      this.setState({selectedData:row})
    }
    else{
      this.setState({redirect:false})
      this.setState({selectedData:{}})
    }
  }
  renderRedirect=()=>{
    if(this.state.redirect){
      return(<Redirect to={{pathname:'/SelectedRepoData', state:{eachSelectedRepoData : this.state.selectedData} }}/>)
    }
    else{
      return(<div></div>)
    }
  }
  render(){
    let allRepos=[]
    for(let i=0; i<this.props.userProfileData.length; i++){
      allRepos.push(this.props.userProfileData[i])
    }

    return(
      <div style={{margin:15}}>
        <BootstrapTable data={allRepos} striped hover scrollTop={'Bottom'} hover={true} >
          <TableHeaderColumn isKey dataField={this.props.dataIdField}>Id</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataRepoNameField} >{this.props.headerName}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataRepoTypeField} >{this.props.headerRepoType}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataRepoUrlField} dataFormat={anchorFormatter}>{this.props.headerRepoUrl}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataRepoDescriptionField} >{this.props.headerRepoDescription}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataRepoWatcherCountField} >{this.props.headerRepoWatcherCount}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataCreatedAtField} >{this.props.headerCreatedAt}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataUpdatedAtField} >{this.props.headerUpdatedAt}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataBranchNameField} >{this.props.headerBranchName}</TableHeaderColumn>
          <TableHeaderColumn dataField="button" dataFormat={this.buttonFormatter}>{this.props.headerRepoDetails}</TableHeaderColumn>
        </BootstrapTable>
        {this.renderRedirect()}

      </div>
    )
  }
}

function anchorFormatter(cell, row){
  return "<a href='"+cell+"'>"+cell+"</a>" ;
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
UserRepoDetails.defaultProps={
  headerName:"Repo Name",
  headerRepoType:"Private Repo",
  headerRepoUrl:"Repo Url",
  headerRepoDescription:"Description",
  headerRepoWatcherCount:"Watcher Count",
  headerCreatedAt:"Created At",
  headerUpdatedAt:"Updated At",
  headerBranchName:"Branch Name",
  headerRepoDetails:"Repo Details",

  dataIdField:'id',
  dataRepoNameField:'name',
  dataRepoTypeField:'private',
  dataRepoUrlField:'html_url',
  dataRepoDescriptionField:'description',
  dataRepoWatcherCountField:'watchers_count',
  dataCreatedAtField:'created_at',
  dataUpdatedAtField:'updated_at',
  dataBranchNameField:'default_branch',
  dataRepoDetailField:'url'
}
export default UserRepoDetails;
