import React,{useEffect,useState,createRef} from "react";
import Header from "./Header"
import { makeStyles } from '@mui/styles';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {getData,ServerURL,postData} from "../FetchNodeServices"
import Paper from '@mui/material/Paper';
import Footer from "./Footer"
import {ArrowBackIos,ArrowForwardIos} from '@mui/icons-material';
import { Button } from "@mui/material";

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

  var csettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    arrows:false,
    autoplay: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplaySpeed: 3000
  };


export default function Home(props) {
  console.log("HOME",props)
  const classes = useStyles();
  const [listBanner,setListBanner]=useState([])
  const [listCategory,setListCategory]=useState([])
  const [listSubCategory,setListSubCategory]=useState([])
  const [trendingList,setTrendingList]=useState([])

  var cSlider=createRef()

  const fetchAllBanners=async()=>{
    var result=await getData("banner/displayallbanner")
    setListBanner(result.data)
  }

  const fetchAllCategory=async()=>{
    var result=await getData("category/displayallcategory")
    setListCategory(result.data)
  }

  const fetchAllSubCategory=async()=>{
    var result=await getData("subcategory/displayallsubcategory")
    setListSubCategory(result.data)
  }

  const fetchAllTrending=async()=>{
    var result=await getData("finalproduct/displayallfinalproducttrending")
    setTrendingList(result.data)
  }

  useEffect(function(){
    fetchAllBanners()
    fetchAllCategory()
    fetchAllSubCategory()
    fetchAllTrending()
  },[])

  const showSlider=()=>{
    return listBanner.map((item)=>{
      return <div><img src={`${ServerURL}/images/${item.image}`} style={{width:"100%"}} /></div>
    })
  }

  const showCategory=()=>{
    return listCategory.map((item)=>{
      return(<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}> 
      <div onClick={() => handleClickCategory(item.categoryid)} style={{padding:5,display:"flex",justifyContent:"center",alignItems:"center",width:140,height:140,borderRadius:"50%",background:"#fff",margin:20,cursor:"pointer"}}>
        <img src={`${ServerURL}/images/${item.icon}`} style={{width:100,height:100}} />
        </div>
        <div style={{textAlign:"center",fontSize:"18",fontWeight:"bold"}}>
      {item.categoryname}
    </div>
    </div>
    )})
  }

  const handleClickCategory=(cid)=>{
    props.history.push({ pathname: "/subcategorylist" }, { categoryid: cid })
  }

  const showSubCategory=()=>{
    return listSubCategory.map((item)=>{
      return(<Paper onClick={() => handleClickSubcategory(item.subcategoryid)} elevation={2} style={{cursor:"pointer", display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:400,height:401,background:"#fff",margin:10,padding:5}}> 
      <div style={{fontSize:28,fontWeight:"bold",paddingTop:50}}>
      {item.subcategoryname}
    </div>
    <div style={{fontSize:16,fontWeight:600,padding:5}}>
      {item.description}
    </div>
    <div style={{fontSize:12,fontWeight:"bold",color:"red",paddingTop:25}}>
      {"View All >"}
    </div>
      <div style={{padding:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
        <img src={`${ServerURL}/images/${item.icon}`} style={{width:250,height:250}} />
        </div>
    </Paper>
    )})
  }

  const handleClickSubcategory=(sid)=>{
    props.history.push({ pathname: "/productlist" }, { subcategoryid: sid })
  }

  const showTrending=()=>{
    return trendingList.map((item)=>{
      return( <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <Paper elevation={2} style={{cursor:"pointer", display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:300,height:301,background:"#fff",margin:10,padding:5}}> 
      <div style={{padding:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
        <img src={`${ServerURL}/images/${item.icon}`} style={{width:150,height:150}} />
        </div>
    </Paper>
    <div style={{fontSize:18,fontWeight:400}}>
    {item.productname}
  </div>
  {item.offerprice>0?<div style={{fontSize:26,fontWeight:500,paddingTop:18}}>&#8377; {item.offerprice} <s style={{fontSize:15,fontWeight:400}}>&#8377; {item.price}</s></div>:<div style={{fontSize:26,fontWeight:500,paddingTop:18}}>&#8377; {item.price}</div>}
  </div>
    )})
  }

  const handleBack=()=>{
    cSlider.current.slickPrev()
  }

  const handleForward=()=>{
    cSlider.current.slickNext()
  }

    return(<div className={classes.root}>
        <Header history={props.history}/>
        <div style={{marginTop:65}}>
        <Slider {...settings} >
       {showSlider()}       
      </Slider>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <ArrowBackIos onClick={()=>handleBack()} style={{cursor:"pointer",fontSize:30}}/>
      <div style={{width:"75%",padding:20}}>
      <Slider ref={cSlider} {...csettings}>
      {showCategory()}
      </Slider>
      </div>
      <ArrowForwardIos onClick={()=>handleForward()} style={{cursor:"pointer",fontSize:30}}/>
      </div>
      <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",flexWrap:"wrap",padding:10}}>
      {showSubCategory()}
      </div>
      <div style={{paddingTop:80,paddingBottom:10,fontSize:40,fontWeight:"bold",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",flexWrap:"wrap"}}>
      Trending Products
      </div>
      <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",flexWrap:"wrap",padding:10}}>
      {showTrending()}
      </div>
      <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",paddingTop:35}}>
       <div style={{textAlign:"center",background:"#000",color:"#FFF",padding:"10px 20px",display:"inline-block",margin:"4px 2px",cursor:"pointer",borderRadius:"19px"}}>
         {"View all"}
         </div>     
      </div>
      <Footer />
      </div>
    </div>)
}