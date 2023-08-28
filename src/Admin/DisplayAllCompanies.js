import {useEffect,useState} from "react"
import MaterialTable from "material-table";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Button, Avatar } from "@mui/material";
import {Save,ClearAll,AddCircle} from '@mui/icons-material';
import { getData,postData,ServerURL,postDataAndImage } from "../FetchNodeServices";
import Swal from 'sweetalert2'
import { Country, State, City }  from 'country-state-city';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Companies from "./Companies"

const useStyles = makeStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  
    subdivtable: {
      // display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 1100,
      background: "#ecf0f1",
      marginTop: 20,
      padding: 20,
      borderRadius:10,    
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
  
  export default function DisplayAllCompanies(props){

    const classes = useStyles(props);
    const [list,setList]=useState([])
    const [open, setOpen] = useState(false);
    const [companyId,setCompanyId]=useState("")
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
    const [btnState,setBtnState]=useState(false)
    const [oldPicture,setOldPicture]=useState("")

    const fetchAllCompany=async()=>{
        var result=await getData("company/displayallcompany")
        setList(result.data)
      }
      
      useEffect(function(){
        fetchAllCompany()
      },[])

    const handleClick=()=>{
        //props.history.push({pathname:"/companies"})
      props.setComponent(<Companies setComponent={props.setComponent}/>)
      }

    const handleClickOpen=(rowData)=>{
      setCompanyId(rowData.companyid)
      setCompanyName(rowData.companyname)
      setContactPerson(rowData.contactperson)
      setMobileNo(rowData.mobileno)
      setEmailId(rowData.emailid)
      setAddressOne(rowData.addressone)
      setAddressTwo(rowData.addresstwo)
      setCountry(rowData.country)
      setState(rowData.state)
      setCity(rowData.city)
      setZipcode(rowData.zipcode)
      setDescription(rowData.description)
      setOldPicture(rowData.icon)
      setPicture({filename:`${ServerURL}/images/${rowData.icon}`,bytes:""})
      fillCountry()
      fillState()
      fillCity()
      setOpen(true);
    }

    const handleClose = () => {
      setOpen(false);
    };

    const handlePicture=(event)=>{
      setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      setBtnState(true)
    }

    const handleCancel=()=>{
      setBtnState(false)
      setPicture({filename:`${ServerURL}/images/${oldPicture}`,bytes:""})
    }

    const handleEditPicture=async()=>{
      setBtnState(false)
      var formData=new FormData()
      formData.append('companyId',companyId)
      formData.append('icon',picture.bytes)
      var result=await postDataAndImage("company/companyeditpicture",formData)
      fetchAllCompany()
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

  const handleDelete=(data)=>{
    Swal.fire({
      imageUrl: '/logo.jpg',
      title: `Do you want to delete ${data.companyname}?`,
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        result=await postData("company/deletecompany",{companyid:data.companyid})
        if(result){
          Swal.fire({
            text: 'Record Deleted Successfully',
            icon:'success',
          })
          fetchAllCompany()
        }else{
          Swal.fire({
            text: 'Fail to Delete Record',
            icon:'error',
          })
        }
      } else if (result.isDenied) {
        Swal.fire(`${data.companyname} is safe`)
      }
    })
  }

    const handleSubmit=async()=>{
      setOpen(false)
      var body={companyId:companyId,companyName:companyName,contactPerson:contactPerson,mobileNo:mobileNo,emailId:emailId,addressOne:addressOne,addressTwo:addressTwo,country:country,state:state,city:city,zipcode:zipcode,description:description}
      var result=await postData("company/updatecompanydata",body)
      if(result){
        Swal.fire({
          text: 'Company edited succesfully',
          imageUrl: '/logo.jpg',
          imageAlt: 'Custom image',
          icon:'success',
        })
      }else{
        Swal.fire({
          text: 'Fail to edit company',
          imageUrl: '/logo.jpg',
          imageAlt: 'Custom image',
          icon:'error',
        })
      }
      fetchAllCompany()
  }

    const showCompanyForm=()=>{
      return (
        <div className={classes.root}>
          <div className={classes.subdiv}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <Grid container spacing={1}> 
                   <Grid item xs={12}>
                <div style={{display:"flex",justifyContent:'center',alignItems:'center'}}>
                      <div>
                        <img src="/Category.png" width='50' />
                        </div>
                        <div style={{fontSize:20,fontWeight:800,letterSpacing:1,marginLeft:10}}>
                          Edit Company
                          </div>
                  </div>
                </Grid>
                    </Grid>
                    </Grid>
                    <Grid item xs={6}>
                <TextField value={companyName} onChange={(event)=>setCompanyName(event.target.value)} fullWidth variant="outlined" label="Company name" />
              </Grid>
              <Grid item xs={6}>
                <TextField value={contactPerson} onChange={(event)=>setContactPerson(event.target.value)} fullWidth variant="outlined" label="Contact person" />
              </Grid>
              <Grid item xs={6}>
                <TextField value={mobileNo} onChange={(event)=>setMobileNo(event.target.value)} fullWidth variant="outlined" label="Mobile no." />
              </Grid>
              <Grid item xs={6}>
                <TextField value={emailId} onChange={(event)=>setEmailId(event.target.value)} fullWidth variant="outlined" label="Email id" />
              </Grid>
              <Grid item xs={6}>
                <TextField value={addressOne} onChange={(event)=>setAddressOne(event.target.value)} fullWidth variant="outlined" label="Address one" />
              </Grid>
              <Grid item xs={6}>
                <TextField value={addressTwo} onChange={(event)=>setAddressTwo(event.target.value)} fullWidth variant="outlined" label="Address two" />
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
                <TextField value={zipcode} onChange={(event)=>setZipcode(event.target.value)} fullWidth variant="outlined" label="ZIP Code" />
              </Grid>
              <Grid item xs={12}>
                <TextField value={description} onChange={(event)=>setDescription(event.target.value)} fullWidth variant="outlined" label="Description" />
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
              {btnState?<span>
                <Button onClick={()=>handleEditPicture()}>Save</Button>
                <Button onClick={()=>handleCancel()}>Cancel</Button>
                </span>:<></>}
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

    const showDialog=()=>{
      return(
        <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            {showCompanyForm()}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
      )
    }

    return (
        <div className={classes.root}>
          <div className={classes.subdivtable}>
          <MaterialTable
            title={<div style={{width:700,display:"flex",alignItems:"center"}}>
            <div style={{padding:5}}>
            <Button onClick={()=>handleClick()} startIcon={<AddCircle />} variant="contained">Add Company</Button>
              </div>
              <div style={{marginLeft:120,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>
                List of companies
                </div>
        </div>}
            columns={[
              { title: 'Company ID', field: 'companyid' },
              { title: 'Company Name', field: 'companyname' },
              { title: 'Contact Person', render : rowData => <div><div>{rowData.contactperson}</div><div>{rowData.mobileno}</div><div>{rowData.emailid}</div></div> },
              { title: 'Address', render : rowData => <div><div>{rowData.addressone}</div><div>{rowData.addresstwo}</div></div> },
              { title: 'Country', render: rowData => <div>{Country.getCountryByCode(rowData.country).name},{State.getStateByCodeAndCountry(rowData.state,rowData.country).name}<div>{rowData.city}</div><div>{rowData.zipcode}</div></div> },
              { title: 'Description', field: 'description'},
              { title: 'Icon', field: 'icon',
              render: rowData =><Avatar
              alt="Company"
              variant="rounded"
              src={`${ServerURL}/images/${rowData.icon}`}
              sx={{ width: 56, height: 56 }}
            />
            },
            ]}
            data={list}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Company',
                onClick: (event, rowData) => handleClickOpen(rowData)
              }, {
                icon: 'delete',
                tooltip: 'Delete Company',
                onClick: (event, rowData) => handleDelete(rowData)
              }
            ]}
          />
          </div>
          {showDialog()}
          </div>
        )
  }
  