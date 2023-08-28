import React,{useEffect,useState} from "react";
import Header from "./Header"
import { makeStyles } from '@mui/styles';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {getData,ServerURL,postData} from "../FetchNodeServices"
import Paper from '@mui/material/Paper';
import Footer from "./Footer"
import ShoppingCartComponent from "./ShoppingCartComponent";
import {useDispatch} from "react-redux"
import SideBar from "./SideBar"

const useStyles = makeStyles({
  root: {
    background:"#ecf0f1"
  }
})

var settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 3000
};

export default function ProductList(props) {
    const classes = useStyles();
    const [productList,setProductList]=useState([])
    const [qty,setQty]=useState(0)
    const [refresh,setRefresh]=useState(false)
    const [subbannerList,setSubbannerList]=useState([])

    var dispatch=useDispatch()
    
  const fetchAllSubbannerBySubcategoryId=async()=>{
    var body={subcategoryid:props.location.state.subcategoryid}
    var result=await postData("subbanner/displayallsubbannerbysubcategoryid",body)
    setSubbannerList(result.data)
  }

  const showSlider=()=>{
    return subbannerList.map((item)=>{
      return <div><img src={`${ServerURL}/images/${item.images}`} style={{width:"100%"}} /></div>
    })
  }

  const fetchAllProductList=async()=>{
    var body={subcategoryid:props.location.state.subcategoryid}
    var result=await postData("finalproduct/displayallfinalproductbysubcategoryid",body)
    setProductList(result.data)
  }

  const handleQtyChange=(value,item)=>{

    if(value>0){
    // alert(JSON.stringify(item))
    item['qty']=value
    // alert(JSON.stringify(item))
    // alert(value)
    setQty(value)
    dispatch({type:"ADD_ITEM",payload:[item.finalproductid,item]})
    }else{
      dispatch({type:"REMOVE_ITEM",payload:[item.finalproductid,item]})
    }
    setRefresh(!refresh)
  }

    const showProducts=()=>{
        return productList.map((item)=>{
          return( <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
          <Paper elevation={2} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:300,height:341,background:"#fff",margin:10,padding:5}}> 
          <div style={{textAlign:"center",fontSize:18,fontWeight:600,padding:5}}>
          {item.companyname} {item.productname}
          </div>
          <div style={{padding:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
            <img src={`${ServerURL}/images/${item.icon}`} style={{width:150,height:150}} />
            </div>
        
        <div style={{padding:5,textAlign:"center",fontSize:18,fontWeight:400}}>
      <div>{item.modelname}</div>
      </div>
      <div style={{textAlign:"center"}}>
      {item.offerprice>0?<div style={{fontSize:18,fontWeight:500}}>&#8377; {item.offerprice} <s style={{fontSize:10,fontWeight:400}}>&#8377; {item.price}</s><div style={{color:"darkgreen",fontSize:18,fontWeight:500}}>You Save &#8377; {item.price-item.offerprice}</div></div>:<><div style={{fontSize:18,fontWeight:500}}>&#8377; {item.price}</div><div>&nbsp;</div></>}
      </div>
      <div style={{padding:10}}>
      <ShoppingCartComponent value={qty} onChange={(value)=>handleQtyChange(value,item)} />
      </div>
      </Paper>
      </div>
        )})
      }

      useEffect(function(){
      fetchAllProductList()
      fetchAllSubbannerBySubcategoryId()     
      },[])

      return(<div className={classes.root}>
        <Header history={props.history}/>
        <div style={{marginTop:65}}>
        <Slider {...settings} >
       {showSlider()}       
      </Slider>
      </div>
        <div style={{display:"flex",marginTop:10}}>
          <div style={{padding:10}}>
            <SideBar />
          </div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",flexWrap:"wrap",padding:10}}>
        {showProducts()}
        </div>
        </div>
        <Footer />
        </div>
 )
}  