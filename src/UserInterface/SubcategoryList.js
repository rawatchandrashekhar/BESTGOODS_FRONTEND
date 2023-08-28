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
    const [subcategoryList,setSubcategoryList]=useState([])

    const fetchAllSubcategoryList=async()=>{
        var body={categoryid:props.location.state.categoryid}
        var result=await postData("subcategory/displayallsubcategorybycategory",body)
        setSubcategoryList(result.data)
      }

      const showSubcategories=()=>{
        return subcategoryList.map((item)=>{
          return( <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:100}}>
          <Paper elevation={2} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:300,height:341,background:"#fff",margin:10,padding:5}}> 
          <div onClick={() => handleClickSubcategory(item.subcategoryid)} style={{padding:5,display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
            <img src={`${ServerURL}/images/${item.icon}`} style={{width:200,height:200}} />
            </div>
        <div style={{padding:5,textAlign:"center",fontSize:25,fontWeight:"bold"}}>
      <div>{item.subcategoryname}</div>
      </div>
      </Paper>
      </div>
        )})
      }

      const handleClickSubcategory=(sid)=>{
        props.history.push({ pathname: "/productlist" }, { subcategoryid: sid })
      }

      useEffect(function(){
          fetchAllSubcategoryList()              
        },[])

    return(<div className={classes.root}>
        <Header history={props.history}/>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",flexWrap:"wrap",padding:10}}>
        {showSubcategories()}
        </div>
        <Footer />
        </div>)
}