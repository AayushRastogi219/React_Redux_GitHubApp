import React,{Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

class UserDetails extends Component{
  constructor(props){
    super(props)

  }

  render(){
    return(
      <div style={{margin:15}}>
        <BootstrapTable data={[{...this.props.userProfileData}]} striped hover scrollTop={'Bottom'} hover={true} >
          <TableHeaderColumn isKey dataField={this.props.dataIdField}>Id</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataLoginField} >{this.props.headerLogin}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataNameField} >{this.props.headerName}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataLocationField} >{this.props.headerLocation}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataReposField} >{this.props.headerRepos}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataHtmlUrlField} dataFormat={anchorFormatter}>{this.props.headerHtmlUrl}</TableHeaderColumn>

          <TableHeaderColumn dataField={this.props.dataCreatedAtField}>{this.props.headerCreatedAt}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataUpdatedAtField}>{this.props.headerUpdatedAt}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataAvatarUrlField} dataFormat={imageFormatter}>{this.props.headerAvatarUrl}</TableHeaderColumn>
        </BootstrapTable>

      </div>
    )
  }
}
function imageFormatter(cell, row){
  return "<Image style={{width=220, height=210 }} src='"+cell+"' responsive/>" ;
}
function anchorFormatter(cell, row){
  return "<a href='"+cell+"'>"+cell+"</a>" ;
}

UserDetails.defaultProps={
  headerLogin:"Login",
  headerName:"Name",
  headerLocation:"Location",
  headerRepos:"Repos Count",
  headerHtmlUrl:"Account Url",
  headerCreatedAt:"Created At",
  headerUpdatedAt:"Updated At",
  headerAvatarUrl:"Image",

  dataIdField:'id',
  dataLoginField:'login',
  dataNameField:'name',
  dataLocationField:'location',
  dataReposField:'public_repos',
  dataHtmlUrlField:'html_url',
  dataCreatedAtField:'created_at',
  dataUpdatedAtField:'updated_at',
  dataAvatarUrlField:'avatar_url'
}
export default UserDetails;
