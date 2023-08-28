import {useEffect,useState} from "react"
import MaterialTable from "material-table";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Button, Avatar } from "@mui/material";
import {ClearAll,List,Edit,AddCircle} from '@mui/icons-material';
import { getData,postData,ServerURL,postDataAndImage } from "../FetchNodeServices";
import Swal from 'sweetalert2'
import Categories from "./Categories"

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

export default function DisplayAllCategories(props){
  
  const classes = useStyles(props);
  const [list,setList]=useState([])
  const [open, setOpen] = useState(false);
  const [category,setCategory]=useState("")
  const [categoryId,setCategoryId]=useState("")
  const [btnState,setBtnState]=useState(false)
  const [oldPicture,setOldPicture]=useState("")
  const [picture,setPicture]=useState({filename:"/camera.png",bytes:""})

  const handlePicture=(event)=>{
      setPicture({filename:URL.createObjectURL(event.target.files[0]),
        bytes:event.target.files[0]})
        setBtnState(true)
  }

  const handleCancel=()=>{
    setBtnState(false)
    setPicture({filename:`${ServerURL}/images/${oldPicture}`,bytes:""})
  }

  const handleSubmit=async()=>{
      setOpen(false)
      var body={categoryId:categoryId,categoryName:category}
      var result=await postData("category/updatecategorydata",body)
      if(result){
        Swal.fire({
          text: 'Category edited succesfully',
          imageUrl: '/logo.jpg',
          imageAlt: 'Custom image',
          icon:'success',
        })
      }else{
        Swal.fire({
          text: 'Fail to edit category',
          imageUrl: '/logo.jpg',
          imageAlt: 'Custom image',
          icon:'error',
        })
      }
      fetchAllCategory()
  }

  const handleDelete=(data)=>{
    Swal.fire({
      imageUrl: '/logo.jpg',
      title: `Do you want to delete ${data.categoryname}?`,
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        result=await postData("category/deletecategory",{categoryid:data.categoryid})
        if(result){
          Swal.fire({
            text: 'Record Deleted Successfully',
            icon:'success',
          })
          fetchAllCategory()
        }else{
          Swal.fire({
            text: 'Fail to Delete Record',
            icon:'error',
          })
        }
      } else if (result.isDenied) {
        Swal.fire(`${data.categoryname} is safe`)
      }
    })
  }

  const handleEditPicture=async()=>{
    setBtnState(false)
    var formData=new FormData()
    formData.append('categoryId',categoryId)
    formData.append('icon',picture.bytes)
    var result=await postDataAndImage("category/categoryeditpicture",formData)
    fetchAllCategory()
}
  
  const fetchAllCategory=async()=>{
    var result=await getData("category/displayallcategory")
    setList(result.data)
  }

  useEffect(function(){
    fetchAllCategory()
  },[])

  const handleClickOpen = (rowData) => {
    setCategoryId(rowData.categoryid)
    setCategory(rowData.categoryname)
    setOldPicture(rowData.icon)
    setPicture({filename:`${ServerURL}/images/${rowData.icon}`,bytes:""})
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick=()=>{
    //props.history.push({pathname:"/categories"})
  props.setComponent(<Categories setComponent={props.setComponent}/>)
  }

  const showCategoryForm=()=>{
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
                        Edit Category
                        </div>
                </div>
              </Grid>
                  </Grid>
                  </Grid>
            <Grid item xs={12}>
              <TextField value={category} onChange={(event)=>setCategory(event.target.value)} fullWidth variant="outlined" label="Category name" />
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
          {showCategoryForm()}
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
          title={<div style={{width:500,display:"flex",alignItems:"center"}}>
              <div style={{padding:5}}>
              <Button onClick={()=>handleClick()} startIcon={<AddCircle />} variant="contained">Add Category</Button>
                </div>
                <div style={{marginLeft:120,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>
                  List of categories
                  </div>
          </div>}
          columns={[
            { title: 'Category ID', field: 'categoryid' },
            { title: 'Category Name', field: 'categoryname' },
            { title: 'Icon', field: 'icon',
            render: (rowData) =><Avatar
            alt="Category"
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
              tooltip: 'Edit Category',
              onClick: (event, rowData) => handleClickOpen(rowData) 
            }, {
              icon: 'delete',
              tooltip: 'Delete Category',
              onClick: (event, rowData) => handleDelete(rowData)
            }
          ]}
        />
        </div>
        {showDialog()}
        </div>
      )
}