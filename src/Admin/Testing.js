import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Button, Avatar, Radio } from "@mui/material";
import { Save, ClearAll, List, Add } from '@mui/icons-material';
import { getData, postDataAndImage,postData, postDataAndImageWithId } from "../FetchNodeServices";
import Swal from 'sweetalert2'

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
    width: 700,
    background: "#ecf0f1",
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
  },

  inputStyle: {
    display: 'none',
  },

  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default function Testing(props) {
 
    const classes = useStyles(props);
    const [categoryName,setCategoryName]=useState("")
    const [subcategoryName,setSubcategoryName]=useState("")

    const handleSubmit=async()=>{
        var body={categoryname:categoryName,subcategoryname:subcategoryName}
        var result=await postData('testing/testingsubmit',body)
        if(result){
        Swal.fire({
          text: 'Testing added succesfully',
          imageUrl: '/logo.jpg',
          imageAlt: 'Custom image',
          icon:'success',
        })
      }else{
        Swal.fire({
          text: 'Fail to submit testing',
          imageUrl: '/logo.jpg',
          imageAlt: 'Custom image',
          icon:'error',
        })
      }
      }
    
    return(
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
                      Testing Interface
                      </div>
              </div>
            </Grid>
            <Grid item xs={6} className={classes.center}>
                    <div>
                     <Button startIcon={<List />} variant="contained">Testing List</Button>   
                     </div>   
                   </Grid>
                </Grid>
                </Grid>
          <Grid item xs={6}>
            <TextField onChange={(event)=>setCategoryName(event.target.value)} fullWidth variant="outlined" label="Category name" />
          </Grid>
          <Grid item xs={6}>
            <TextField onChange={(event)=>setSubcategoryName(event.target.value)} fullWidth variant="outlined" label="Sub-Category name" />
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