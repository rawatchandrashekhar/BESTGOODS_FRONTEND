import MaterialTable from "material-table";
import { makeStyles } from "@mui/styles";
import { useEffect,useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid,TextField,Button,Avatar } from "@mui/material";
import {Save,ClearAll,List,Edit, AddBox} from "@mui/icons-material"
import { getData,postData,postDataAndImage,ServerURL } from "../FetchNodeServices";
import Swal from "sweetalert2"
import Banners from "./Banners"

const useStyles = makeStyles({
  root:{
      display:'flex',
      justifyContent:'center',
      alignItem:'center',
  },
  subdivtable:{
      //display:'flex',
      justifyContent:'center',
      alignItem:'center',
      width:900,
      marginTop:20,
      padding:20,
      background:'#ecf0f1',
      borderRadius:5,
  },
  subdiv:{
    display:'flex',
    justifyContent:'center',
    alignItem:'center',
    width:600,
    marginTop:20,
    padding:20,
    background:'#ecf0f1',
    borderRadius:5,
},
inputstyle:{
  display:'none',
},
center:{
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
}
}); 
export default function DisplayAllBanners(props){
  const classes = useStyles(props);
  const [list,setList]=useState([])
  const [open, setOpen] =useState(false);
  const [bannerId,setBannerId]=useState("")
  const [description,setDescription]=useState("")
  const [priority,setPriority]=useState("")
  const [btnState, setBtnState] =useState(false);
  const [oldPicture,setOldPicture]=useState(" ")
  const [picture,setPicture]=useState({filename:"camera.jpg",bytes:""})
  const handlePicture=(event)=>{
    setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setBtnState(true)
  }
  const handleSubmit=async()=>{
    setOpen(false)
    var body={bannerId:bannerId,description:description,priority:priority}
    var result=await postData('banner/updatebannerdata',body)
    if(result)
      {
      Swal.fire({
        text: 'Banner Edited Successfully',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon:'success'
      })
     }
     else{
      Swal.fire({
        text: 'Fail to edit banner',
        imageUrl: 'logo.jpg',
        imageAlt: 'Custom image',
        icon:'error'
      })
     }
     fetchAllBanner()
  }

  const handleDelete=async(data)=>{
    Swal.fire({
      imageUrl: '/logo.jpg',
      title: `Do you want to delete?`,
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        result=await postData('banner/deletebanner',{bannerId:data.bannerid})
        if(result)
        {
          Swal.fire('Record Deleted Successfully....')
          fetchAllBanner();
        }
        else{
          Swal.fire('Fail to delete record....')
        }
      } else if (result.isDenied) {
        Swal.fire(`Banner is Safe`)
      }
    })
  }

  const handleEditPicture=async()=>{
    setBtnState(false)
    var formData=new FormData()
      formData.append('bannerId',bannerId)
      formData.append('image',picture.bytes)
      var result= await postDataAndImage('banner/bannereditpicture',formData)
     fetchAllBanner()
  }
  const fetchAllBanner=async()=>{
   var result=await getData("banner/displayallbanner")
   setList(result.data)
  }
  const handleClickOpen = (rowData) => {
    setBannerId(rowData.bannerid)
    setDescription(rowData.description)
    setPriority(rowData.priority)
    setOldPicture(rowData.image)
    setPicture({filename:`${ServerURL}/images/${rowData.image}`,bytes:""})
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel=()=>{
    setPicture({filename:`${ServerURL}/images/${oldPicture}`,bytes:""})
    setBtnState(false)
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
          {showBannerForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
    )
  }
  const showBannerForm=()=>{
    return(
      <div className={classes.root}>
         <div className={classes.subdiv}>
           <Grid container spacing={2}>
           <Grid item xs={12}>
             <Grid container spacing={1}>
               <Grid item xs={12}>
             <div style={{display:'flex',flexDirection:'row'}}>
               <div>
               <img src="category.png" width='35' height='35'/>
               </div>
               <div style={{fontSize:18,letterSpacing:2,fontWeight:800,padding:5}}>
                 Edit Banner
               </div>
               </div>
               </Grid>
             </Grid>
            </Grid>
              <Grid item xs={6}>
                <TextField value={description} onChange={(event)=>setDescription(event.target.value)} fullWidth variant="outlined" label="Description"/>
              </Grid>
              <Grid item xs={6}>
                <TextField value={priority} onChange={(event)=>setPriority(event.target.value)} fullWidth variant="outlined" label="Priority"/>
              </Grid>
              <Grid item xs={6}>
              <label htmlFor="contained-button-file">
                  <input onChange={(event)=>handlePicture(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type="file" />
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
              <Avatar alt="Picture" variant="rounded" src={picture.filename} />
              </Grid>
              <Grid item xs={6}>
                <Button onClick={()=>handleSubmit()} fullWidth variant="contained" startIcon={<Edit/>}>Edit</Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" startIcon={<ClearAll/>}>Reset</Button>
              </Grid>
           </Grid>
         </div>
      </div>
  )
  }
  useEffect(function(){
   fetchAllBanner()
  },[])
  const handleClick=()=>{
    //props.history.push({pathname:'/categories'})
    props.setComponent(<Banners setComponent={props.setComponent}/>)
  }
    return (
      <div className={classes.root}>
        <div className={classes.subdivtable}>
        <MaterialTable
          title={
            
          <div style={{display:'flex',flexDirection:'row',width:4500,alignItems:'flex-start'}}>
            <div style={{padding:5}}>
                <Button onClick={()=>handleClick()} startIcon={<AddBox/>} variant="contained">New Banner</Button>
              </div>
              <div style={{marginLeft:140,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>List of Categories</div>
            </div>}
          columns={[
            { title: 'Banner Id', field: 'bannerid' },
            { title: 'Description', field: 'description' },
            { title: 'Priority', field: 'priority' },
            { title: 'Image', field: 'image',
            render: rowData => <Avatar variant="rounded" alt="Banner" src={`${ServerURL}/images/${rowData.image}`} sx={{width: 56, height:56}}/>},
          ]}
          data={list}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Category',
              onClick: (event, rowData) =>handleClickOpen(rowData)
            },
            {
              icon: 'delete',
              tooltip: 'Delete Category',
              onClick: (event, rowData) =>handleDelete(rowData)
            }
          ]}
        />
        </div>
        {showDialog()}
      </div>
      )
}