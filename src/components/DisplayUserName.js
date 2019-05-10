import React,{Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

class DisplayUserName extends Component{
  constructor(props){
    super(props)

  }

  render(){
    return(
      <div style={{margin:5}}>
        <BootstrapTable data={this.props.searchedUserNameData} striped hover height={this.props.tableHeight} scrollTop={'Top'} hover={true} cellEdit={this.props.cellUpdateProp} insertRow={true} options={this.props.onAfterInsertRow} deleteRow={true} selectRow={this.props.rowSelectionProp}>
          <TableHeaderColumn isKey dataField={this.props.dataIdField} width="100" tdStyle={{backgroundColor: 'green'}}>Id</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataUserNameField}>{this.props.headerName}</TableHeaderColumn>
        </BootstrapTable>

      </div>
    )
  }
}

DisplayUserName.defaultProps={
  headerName:"Name",
  dataIdField:'id',
  dataUserNameField:'name',
  tableHeight:'290'
}

export default DisplayUserName;
