import {useEffect,useState} from "react"
import MaterialTable from "material-table";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Button, Avatar } from "@mui/material";
import {Save,ClearAll,AddCircle} from '@mui/icons-material';
import { getData,postData,ServerURL,postDataAndImage } from "../FetchNodeServices";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2'
import SubCategories from "./SubCategories"

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
    width: 1000,
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

export default function DisplayAllSubCategories(props){

  const classes = useStyles(props);
  const [list,setList]=useState([])
  const [open, setOpen] = useState(false);
  const [subCategory,setSubCategory]=useState("")
  const [categoryID,setCategoryID]=useState("")
  const [description,setDescription]=useState("")
  const [subCategoryId,setSubCategoryId]=useState("")
  const [picture,setPicture]=useState({filename:"/camera.png",bytes:""})
  const [subBtnState,setSubBtnState]=useState(false)
  const [oldPicture,setOldPicture]=useState("")
  const [listCategory,setListCategory]=useState([])

  const handlePicture=(event)=>{
      setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      setSubBtnState(true)
  }

  const handleSubmit=async()=>{
      setOpen(false)
      var body={subCategoryId:subCategoryId,categoryId:categoryID,subCategoryName:subCategory,description:description}
      var result=await postData("subcategory/updatesubcategorydata",body)
      if(result){
        Swal.fire({
          text: 'Sub-Category edited succesfully',
          imageUrl: '/logo.jpg',
          imageAlt: 'Custom image',
          icon:'success',
        })
      }else{
        Swal.fire({
          text: 'Fail to edit sub-category',
          imageUrl: '/logo.jpg',
          imageAlt: 'Custom image',
          icon:'error',
        })
      }
      fetchAllSubCategory()
  }
  
  const fetchAllSubCategory=async()=>{
    var result=await getData("subcategory/displayallsubcategory")
    setList(result.data)
  }

  const handleChange=(event)=>{
    setCategoryID(event.target.value)
  }
  
  useEffect(function(){
    fetchAllSubCategory()
    fetchAllCategories()
  },[])

  const handleCancel=()=>{
    setSubBtnState(false)
    setPicture({filename:`${ServerURL}/images/${oldPicture}`,bytes:""})
  }

  const fetchAllCategories=async()=>{
    var result=await getData("category/displayallcategory")
    setListCategory(result.data)
 }

 const fillCategory=()=>{
     return listCategory.map((item)=>{
        return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
     })
 }

  const handleEditPicture=async()=>{
    setSubBtnState(false)
    var formData=new FormData()
    formData.append('subCategoryId',subCategoryId)
    formData.append('icon',picture.bytes)
    var result=await postDataAndImage("subcategory/subcategoryeditpicture",formData)
    fetchAllSubCategory()
}

  const handleClickOpen = (rowData) => {
    fillCategory()
    setCategoryID(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setSubCategory(rowData.subcategoryname)
    setDescription(rowData.description)
    setOldPicture(rowData.icon)
    setPicture({filename:`${ServerURL}/images/${rowData.icon}`,bytes:""})
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick=()=>{
    //props.history.push({pathname:"/subcategories"})
  props.setComponent(<SubCategories setComponent={props.setComponent}/>)
  }

  const handleDelete=(data)=>{
    Swal.fire({
      imageUrl: '/logo.jpg',
      title: `Do you want to delete ${data.subcategoryname}?`,
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        result=await postData("subcategory/deletesubcategory",{subcategoryid:data.subcategoryid})
        if(result){
          Swal.fire({
            text: 'Record Deleted Successfully',
            icon:'success',
          })
          fetchAllSubCategory()
        }else{
          Swal.fire({
            text: 'Fail to Delete Record',
            icon:'error',
          })
        }
      } else if (result.isDenied) {
        Swal.fire(`${data.subcategoryname} is safe`)
      }
    })
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
          {showSubCategoryForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
    )
  }

  const showSubCategoryForm=()=>{
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
                        Edit Sub-Category
                        </div>
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
              <TextField value={subCategory} onChange={(event)=>setSubCategory(event.target.value)} fullWidth variant="outlined" label="Sub-Category name" />
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
            {subBtnState?<span>
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
  
  return (
      <div className={classes.root}>
        <div className={classes.subdivtable}>
        <MaterialTable
          title={<div style={{width:700,display:"flex",alignItems:"center"}}>
          <div style={{padding:5}}>
          <Button onClick={()=>handleClick()} startIcon={<AddCircle />} variant="contained">Add Sub-Category</Button>
            </div>
            <div style={{marginLeft:120,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>
              List of sub-categories
              </div>
      </div>}
          columns={[
            { title: 'Category ID', render: (rowData) => (<div>{rowData.categoryid},{rowData.categoryname}</div>) },
            { title: 'Sub-Category ID', field: 'subcategoryid' },
            { title: 'Sub-Category Name', field: 'subcategoryname' },
            { title: 'Description', field: 'description'},
            { title: 'Icon', field: 'icon',
            render: (rowData) =><Avatar
            alt="Sub-Category"
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
              tooltip: 'Edit Sub-Category',
              onClick: (event, rowData) => handleClickOpen(rowData)
            }, {
              icon: 'delete',
              tooltip: 'Delete Sub-Category',
              onClick: (event, rowData) => handleDelete(rowData)
            }
          ]}
        />
        </div>
        {showDialog()}
        </div>
      )
}