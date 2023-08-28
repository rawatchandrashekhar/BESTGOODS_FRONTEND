import React,{useEffect, useState} from "react";
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Button, Avatar } from "@mui/material";
import {Save,ClearAll,List} from '@mui/icons-material';
import { getData,ServerURL,postDataAndImage } from "../FetchNodeServices";
import Swal from 'sweetalert2'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DisplayAllSubCategories from "./DisplayAllSubCategories";

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

export default function SubCategories(props) {
  const classes = useStyles(props);
  const [subCategory,setSubCategory]=useState("")
  const [categoryID,setCategoryID]=useState("")
  const [description,setDescription]=useState("")
  const [picture,setPicture]=useState({filename:"/camera.png",bytes:""})
  const [listCategory,setListCategory]=useState([])

  useEffect(function(){
    fetchAllCategories()
  },[])

  const fetchAllCategories=async()=>{
     var result=await getData("category/displayallcategory")
     setListCategory(result.data)
  }

  const fillCategory=()=>{
      return listCategory.map((item)=>{
         return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      })
  }

  const handlePicture=(event)=>{
      setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
  }

  const handleSubmit=async()=>{
    var formData=new FormData()
    formData.append('subcategoryname',subCategory)
    formData.append('icon',picture.bytes)
    formData.append('categoryid',categoryID)
    formData.append('description',description)
    var result=await postDataAndImage('subcategory/subcategorysubmit',formData)
    if(result){
    Swal.fire({
      text: 'Sub-Category added succesfully',
      imageUrl: '/logo.jpg',
      imageAlt: 'Custom image',
      icon:'success',
    })
  }else{
    Swal.fire({
      text: 'Fail to submit sub-category',
      imageUrl: '/logo.jpg',
      imageAlt: 'Custom image',
      icon:'error',
    })
  }
  }

  const handleClick=()=>{
    //props.history.push({pathname:"/displayallsubcategories"})
  props.setComponent(<DisplayAllSubCategories setComponent={props.setComponent}/>)
  }

  const handleChange=(event)=>{
    setCategoryID(event.target.value)
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
                      Sub-Category Interface
                      </div>
              </div>
            </Grid>
            <Grid item xs={6} className={classes.center}>
                    <div>
                     <Button onClick={()=>handleClick()} startIcon={<List />} variant="contained">Sub-Category List</Button>   
                     </div>   
                   </Grid>
                </Grid>
                </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryID}
          label="Category Id"
          onChange={(event)=>handleChange(event)}
        >
          {fillCategory()}
        </Select>
      </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField onChange={(event)=>setSubCategory(event.target.value)} fullWidth variant="outlined" label="Sub-Category name" />
          </Grid>
          <Grid item xs={12}>
            <TextField onChange={(event)=>setDescription(event.target.value)} fullWidth variant="outlined" label="Description" />
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