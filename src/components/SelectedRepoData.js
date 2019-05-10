import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import '../css/selectedRepoTable.css'

class SelectedRepoData extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    const repoData = this.props.location.state.eachSelectedRepoData
    let allSelectedData=[]
    for(var prop in repoData){
      if(!(typeof(repoData[prop])==='object')){
        let arrayItem=[]
        arrayItem.push(prop)
        arrayItem.push(repoData[prop])
        allSelectedData.push(arrayItem)
      }
    }

    return(
      <div style={{margin:25}}>
      <span><Link to='/gitDashBoard'>Go back to DashBoard</Link></span>
        <h2>Repo Summary</h2>
        <table  style={tableStyle}>
          <tbody>
            <tr>
              <th id="t01">Field</th>
              <th id="t01">Description</th>
            </tr>
            {allSelectedData.map((item,index)=>{
              const [ keyItem, valueItem ] = item
              return(
                <tr key={index}>
                  <th style={ tableDateAndHeaderStyle}>{keyItem}</th>
                  <td style={ tableDateAndHeaderStyle}>{valueItem}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <span style={{float:'right', marginBottom:20, marginTop:20}}><Link to='/gitDashBoard'>Go back to DashBoard</Link></span>
      </div>

    )
  }
}
const tableStyle= {
  fontFamily: 'arial, sans-serif',
  borderCollapse: 'collapse',
  width: '100%'
}

const tableDateAndHeaderStyle= {
  border: '1px solid #dddddd',
  textAlign: 'left',
  padding: '8px'
}
export default SelectedRepoData;
