import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import PropTypes from 'prop-types'

export default class DataTable extends Component{
  constructor(props) {
    super(props)
  }

  isUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch (ex) {
      return false;  
    }
  }

  anchorAndImageFormatter=(cell, row)=>{
    let tag
    if(this.isUrl(cell))
      tag="<figure><Image style={{width=80, height=80 }} src='"+cell+"' responsive alt='No display'/><figcaption><a href='"+cell+"'>"+cell+"</a></figcaption></figure>"
    else
      tag=cell

    return tag;
  }

  render(){
    return(
      <div>
        <BootstrapTable data={this.props.rows} striped hover scrollTop={'Bottom'} 
        hover={true} selectRow={this.props.onRowSelection} options={this.props.onRowClick} keyField={this.props.idField}>

        {this.props.columns.map((item, index)=>{
          if(item.numeric){
            return(
              <TableHeaderColumn key={index} dataField={item.headerLabel} dataAlign={item.alignment} 
              headerAlign={this.props.centerAlign} >
              {item.headerLabel.toUpperCase()}
              <div><input type="checkbox" value={item.headerLabel} onChange={this.props.onChangeAlignData} /></div>
    
              </TableHeaderColumn>
            )
          }
          else{
            return(
              <TableHeaderColumn key={index} dataField={item.headerLabel} headerAlign={this.props.centerAlign} 
              dataFormat={this.anchorAndImageFormatter} width={item.width} 
              dataAlign={this.props.centerAlign} >
                
              {item.headerLabel.toUpperCase()}
              <span style={dropDownStyle}>
                <select name={item.headerLabel} value={item.width} onChange={this.props.onChangeColWidth}>
                  <option value={this.props.smallWidth}>{this.props.smallWidth}</option>
                  <option value={this.props.mediumWidth}>{this.props.mediumWidth}</option>
                  <option value={this.props.autoWidth}>{this.props.autoWidth}</option>
                </select>
              </span>
              </TableHeaderColumn>
            )
          }
        })
        }

        </BootstrapTable>
      </div>
    )
  }
}

DataTable.defaultProps={
  idField:'id',
  centerAlign:'center',
  smallWidth:'100px',
  mediumWidth:'10%',
  autoWidth:'auto'
}
const dropDownStyle={
  float: 'right'
};
DataTable.propTypes = {
  rows: PropTypes.array,
  // onRowSelection: PropTypes.func,
  // onRowClick: PropTypes.func,
  centerAlign: PropTypes.string,
  onChangeAlignData: PropTypes.func,
  columns:PropTypes.array,
  smallWidth: PropTypes.string,
  mediumWidth: PropTypes.string,
  autoWidth: PropTypes.string,
};


