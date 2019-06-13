import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"
import DataTable from './DataTable'

export default class MainForm extends Component{
  state={
    allContent:[],
    items:[],
    hasMore: true,
    alignColumn:{alignId:'right',alignAlbunId:'right'},
    selectedWidth:{albumWidth:'', idWidth:'', titleWidth:'auto', urlWidth:'auto', thumbnailWidth:'auto'}
  }
    
  componentDidMount(){
    this.getProductDetails()
  }

  getProductDetails=()=>{
    const productDetails = async ()=>{
      try{
        if(this.props.productUrl){
          const response = await fetch(this.props.productUrl)
          if (!response.ok) throw Error(response.statusText)

          const allProductData= await response.json()
          this.setState({allContent:allProductData},()=>{
            this.setState({items: this.state.allContent.slice(this.state.items.length, this.state.items.length + 20)}) 
          })
        }
      } catch(error){
        console.log(error)
      }
    }
    productDetails()
  }

  fetchMoreData = () => {
    const numberOfAppendRow=20;
    if (this.state.items.length >= this.state.allContent.length) {
      this.setState({ hasMore: false })
      return;
    }
    let newItems = this.state.allContent.slice(this.state.items.length, this.state.items.length + numberOfAppendRow)
    this.setState({items: [...this.state.items, ...newItems]})
  };

  onSelectAll=(isSelected, rows)=> {
    // console.log(isSelected); // console.log('row',row)
  }

  onRowSelect=(row, isSelected, e)=>{
    // console.log(isSelected); // console.log(e);
  }
  onRowClick=(row)=>{
    // console.log('row',row)
  }

  onChangeDataAlignment=(event)=>{
    event.persist();
    if(event.target.value === this.props.albumId){
      this.setState(()=>({alignColumn:{...this.state.alignColumn, alignId:event.target.checked ? this.props.rightAlign : this.props.leftAlign}}))
    }
    else if(event.target.value === this.props.id){
      this.setState(()=>({alignColumn:{...this.state.alignColumn, alignAlbunId:event.target.checked ? this.props.rightAlign : this.props.leftAlign}}))
    }
  }

  onChangeColumnWidth=(event)=>{
    const name= event.target.name
    event.persist();
    
    if(name === this.props.title){
      this.setState(()=>({selectedWidth:{...this.state.selectedWidth, titleWidth:event.target.value}}))
    }
    else if(name === this.props.url){
      this.setState(()=>({selectedWidth:{...this.state.selectedWidth, urlWidth:event.target.value}}))
    }
    else if(name === this.props.thumbnailUrl){
      this.setState(()=>({selectedWidth:{...this.state.selectedWidth, thumbnailWidth:event.target.value}}))
    }
  }

  getColumns=()=>{
    const allRows=this.state.items
    let headerNames=[]
    let colWidthName=Object.keys({...this.state.selectedWidth})
    let alignType=Object.keys({...this.state.alignColumn})
    
    if(allRows.length !== 0){
      Object.keys(allRows[0]).forEach((key,index)=>{
        if(isNaN(allRows[0][key]) && typeof allRows[0][key] !== 'number'){
          headerNames.push({headerLabel:key, numeric:false, width:{...this.state.selectedWidth}[colWidthName[index]]})
        }
        else{
          headerNames.push({headerLabel:key, numeric:true, alignment:{...this.state.alignColumn}[alignType[index]]})
        }
      })
    }
    return headerNames
  }

  render(){
    const handleRowSelection = {mode:'checkbox', clickToSelect: true, bgColor: this.props.color,  onSelect: this.onRowSelect, onSelectAll: this.onSelectAll, columnWidth: this.props.ColWidth}

    const onRowClick = {onRowClick: this.onRowClick}
    return(
      <div style={tableStyle}>
        <h1>React DataTable App</h1>
        <hr />
        <InfiniteScroll dataLength={this.state.items.length} next={this.fetchMoreData} hasMore={this.state.hasMore} />

        <DataTable rows={this.state.items} columns={this.getColumns()}
          onRowSelection={handleRowSelection} onRowClick={onRowClick} 
          dataAlign={this.state.alignColumn} onChangeAlignData={this.onChangeDataAlignment} 
          colWidth={this.state.selectedWidth} onChangeColWidth={this.onChangeColumnWidth} 
        />

      </div>
    )
  }
}

MainForm.propTypes = {
  productUrl: PropTypes.string.isRequired,
  color: PropTypes.string,
  rightAlign: PropTypes.string,
  leftAlign: PropTypes.string,
  ColWidth: PropTypes.string,
  thumbnailUrl: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  albumId: PropTypes.string
};

MainForm.defaultProps={
  productUrl:'https://jsonplaceholder.typicode.com/photos',
  albumId:'albumId',
  id:'id',
  title:'title',
  url:'url',
  thumbnailUrl:'thumbnailUrl',
  ColWidth:'70px',
  color:'lightblue',
  rightAlign:'right',
  leftAlign:'left'
}
const tableStyle={
  margin:10
};
