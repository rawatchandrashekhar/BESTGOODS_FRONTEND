import React,{useState} from "react";
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Button, Avatar } from "@mui/material";
import {Save,ClearAll,List} from '@mui/icons-material';
import { postData,ServerURL,postDataAndImage } from "../FetchNodeServices";
import Swal from 'sweetalert2'
import DisplayAllCategories from "./DisplayAllCategories";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  subdiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 600,
    background: "#ecf0f1",
    marginTop: 20,
    padding: 20,
    borderRadius:10,    
  },

  inputStyle: {
    display: 'none',
  },

  center:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },

});

export default function Categories(props) {
  const classes = useStyles(props);
  const [category,setCategory]=useState("")
  const [picture,setPicture]=useState({filename:"/camera.png",bytes:""})

  const handlePicture=(event)=>{
      setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
  }

  // const handleSubmit=async()=>{
  //   var body={categoryname:category,picture:picture.filename}
  //   var result=await postData('category/categorysubmit',body)
  // }

  const handleSubmit=async()=>{
    var formData=new FormData()
    formData.append('categoryname',category)
    formData.append('icon',picture.bytes)
    var result=await postDataAndImage('category/categorysubmit',formData)
    if(result){
    Swal.fire({
      text: 'Category added succesfully',
      imageUrl: '/logo.jpg',
      imageAlt: 'Custom image',
      icon:'success',
    })
  }else{
    Swal.fire({
      text: 'Fail to submit category',
      imageUrl: '/logo.jpg',
      imageAlt: 'Custom image',
      icon:'error',
    })
  }
  }

  const handleClick=()=>{
    //props.history.push({pathname:'/displayallcategories'})
  props.setComponent(<DisplayAllCategories setComponent={props.setComponent}/>)
  }

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <Grid container spacing={1}> 
               <Grid item xs={6}>
            <div style={{display:"flex",justifyContent:'center',alignItems:'center'}}>
                  <div>
                    <img src="/Category.png" width='50' />
                    </div>
                    <div style={{fontSize:20,fontWeight:800,letterSpacing:1,marginLeft:10}}>
                      Category Interface
                      </div>
              </div>
            </Grid>
            <Grid item xs={6} className={classes.center}>
                    <div>
                     <Button onClick={()=>handleClick()} startIcon={<List />} variant="contained">Category List</Button>   
                     </div>   
                   </Grid>
                </Grid>
                </Grid>
          <Grid item xs={12}>
            <TextField onChange={(event)=>setCategory(event.target.value)} fullWidth variant="outlined" label="Category name" />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="contained-button-file">
              <input onChange={(event)=>handlePicture(event)} className={classes.inputStyle} accept="image/*" id="contained-button-file" multiple type="file" />
              <Button fullWidth variant="contained" component="span">
                Upload
              </Button>
            </label>
          </Grid>
          <Grid item xs={6} className={classes.center}>
          <Avatar alt="Remy Sharp" variant="rounded" src={picture.filename} />
            </Grid>
            <Grid item xs={6}>
               <Button onClick={()=>handleSubmit()} fullWidth variant="contained" startIcon={<Save/>}>Save</Button>
              </Grid>
              <Grid item xs={6}>
               <Button fullWidth variant="contained" startIcon={<ClearAll/>}>Reset</Button>
              </Grid>
        </Grid>
      </div>
    </div>
  )
}