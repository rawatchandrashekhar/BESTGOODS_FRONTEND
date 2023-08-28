import React,{useState} from "react";
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Button, Avatar } from "@mui/material";
import {Save,ClearAll,List} from '@mui/icons-material';
import { postData,ServerURL,postDataAndImage } from "../FetchNodeServices";
import Swal from 'sweetalert2'
import { Country, State, City }  from 'country-state-city';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DisplayAllCompanies from "./DisplayAllCompanies";

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

  export default function Companies(props) {
    const classes = useStyles(props);
    const [companyName,setCompanyName]=useState("")
    const [contactPerson,setContactPerson]=useState("")
    const [mobileNo,setMobileNo]=useState("")
    const [emailId,setEmailId]=useState("")
    const [addressOne,setAddressOne]=useState("")
    const [addressTwo,setAddressTwo]=useState("")
    const [country,setCountry]=useState("")
    const [state,setState]=useState("")
    const [city,setCity]=useState("")
    const [zipcode,setZipcode]=useState("")
    const [description,setDescription]=useState("")
    const [picture,setPicture]=useState({filename:"/camera.png",bytes:""})

    const handlePicture=(event)=>{
        setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const fillCountry=()=>{
      return Country.getAllCountries().map((item)=>{
        return <MenuItem value={item.isoCode}>{item.name}</MenuItem>
     })
    }

    const handleCountry=(event)=>{
      setCountry(event.target.value)
      fillState()
    }

    const fillState=()=>{
      return State.getStatesOfCountry(country).map((item)=>{
        return <MenuItem value={item.isoCode}>{item.name}</MenuItem>
     })
    }

    const handleState=(event)=>{
      setState(event.target.value)
      fillCity()
    }

    const fillCity=()=>{
      return City.getCitiesOfState(country,state).map((item)=>{
        return <MenuItem value={item.name}>{item.name}</MenuItem>
     })
    }

    const handleSubmit=async()=>{
        var formData=new FormData()
        formData.append('companyname',companyName)
        formData.append('icon',picture.bytes)
        formData.append('contactperson',contactPerson)
        formData.append('mobileno',mobileNo)
        formData.append('emailid',emailId)
        formData.append('addressone',addressOne)
        formData.append('addresstwo',addressTwo)
        formData.append('country',country)
        formData.append('state',state)
        formData.append('city',city)
        formData.append('zipcode',zipcode)
        formData.append('description',description)
        var result=await postDataAndImage('company/companysubmit',formData)
        if(result){
        Swal.fire({
          text: 'Company added succesfully',
          imageUrl: '/logo.jpg',
          imageAlt: 'Custom image',
          icon:'success',
        })
      }else{
        Swal.fire({
          text: 'Fail to submit company',
          imageUrl: '/logo.jpg',
          imageAlt: 'Custom image',
          icon:'error',
        })
      }
      }

      const handleClick=()=>{
        //props.history.push({pathname:"/displayallcompanies"})
      props.setComponent(<DisplayAllCompanies setComponent={props.setComponent}/>)
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
                          Company Interface
                          </div>
                  </div>
                </Grid>
                <Grid item xs={6} className={classes.center}>
                        <div>
                         <Button onClick={()=>handleClick()} startIcon={<List />} variant="contained">Company List</Button>   
                         </div>   
                       </Grid>
                    </Grid>
                    </Grid>
              <Grid item xs={6}>
                <TextField onChange={(event)=>setCompanyName(event.target.value)} fullWidth variant="outlined" label="Company Name" />
              </Grid>
              <Grid item xs={6}>
                <TextField onChange={(event)=>setContactPerson(event.target.value)} fullWidth variant="outlined" label="Contact Person" />
              </Grid>
              <Grid item xs={6}>
                <TextField onChange={(event)=>setMobileNo(event.target.value)} fullWidth variant="outlined" label="Mobile No." />
              </Grid>
              <Grid item xs={6}>
                <TextField onChange={(event)=>setEmailId(event.target.value)} fullWidth variant="outlined" label="Email Id" />
              </Grid>
              <Grid item xs={6}>
                <TextField onChange={(event)=>setAddressOne(event.target.value)} fullWidth variant="outlined" label="Company Address Line One" />
              </Grid>
              <Grid item xs={6}>
                <TextField onChange={(event)=>setAddressTwo(event.target.value)} fullWidth variant="outlined" label="Company Address Line Two" />
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          label="Country"
          onChange={(event)=>handleCountry(event)}
        >
          {fillCountry()}
        </Select>
      </FormControl>
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state}
          label="State"
          onChange={(event)=>handleState(event)}
        >
          {fillState()}
        </Select>
      </FormControl>
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="City"
          onChange={(event)=>setCity(event.target.value)}
        >
          {fillCity()}
        </Select>
      </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField onChange={(event)=>setZipcode(event.target.value)} fullWidth variant="outlined" label="ZIP Code" />
              </Grid>
              <Grid item xs={12}>
                <TextField onChange={(event)=>setDescription(event.target.value)} fullWidth variant="outlined" label="Description" />
              </Grid>
              <Grid item xs={6}>
                <label htmlFor="contained-button-file">
                  <input onChange={(event)=>handlePicture(event)} className={classes.inputStyle} accept="image/*" id="contained-button-file" multiple type="file" />
                  <Button fullWidth variant="contained" component="span">
                    Upload Logo
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