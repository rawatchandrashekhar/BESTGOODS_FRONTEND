import {useEffect,useState} from "react"
import MaterialTable from "material-table";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Button, Avatar, Radio } from "@mui/material";
import {Save,ClearAll,AddCircle} from '@mui/icons-material';
import { getData,postData,ServerURL,postDataAndImage } from "../FetchNodeServices";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2'
import Colors from "./Colors"

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
  
  export default function DisplayAllColors(props){

    const classes = useStyles(props);
    const [colorId,setColorId]=useState("")
    const [productId, setProductId] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [subCategoryId, setSubCategoryId] = useState("")
    const [companyId, setCompanyId] = useState("")
    const [color,setColor]=useState("")
    const [listCategory, setListCategory] = useState([])
    const [listCompany, setListCompany] = useState([])
    const [listSubCategory, setListSubCategory] = useState([])
    const [listProduct, setListProduct] = useState([])
    const [list,setList]=useState([])
    const [open, setOpen] = useState(false);
    const [btnState,setBtnState]=useState(false)
    const [oldPicture,setOldPicture]=useState("")
    const [picture, setPicture] = useState({ filename: "/camera.png", bytes: "" })

    const handlePicture=(event)=>{
      setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      setBtnState(true)
  }

    const fetchAllColor=async()=>{
        var result=await getData("color/displayallcolor")
        setList(result.data)
      }

      useEffect(function(){
        fetchAllColor()
        fetchAllCategories()
        fetchAllCompanies()
        fetchAllSubCategories()
        fetchAllProducts()
      },[])

      const handleClick=()=>{
        //props.history.push({pathname:"/colors"})
      props.setComponent(<Colors setComponent={props.setComponent}/>)
      }
    
      const fetchAllCategories = async () => {
        var result = await getData("category/displayallcategory")
        setListCategory(result.data)
      }
    
      const fillCategory = () => {
        return listCategory.map((item) => {
          return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
      }
    
      const handleChange = (event) => {
        setCategoryId(event.target.value)
      }
    
      const fetchAllCompanies = async () => {
        var result = await getData("product/displayallproduct")
        setListCompany(result.data)
      }
    
      const fillCompany = () => {
        return listCompany.map((item) => {
          if(subCategoryId==item.subcategoryid){
          return <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
          }
        })
      }
    
      const handleChangeCompany = (event) => {
        setCompanyId(event.target.value)
      }
    
      const fetchAllSubCategories = async () => {
        var result = await getData("subcategory/displayallsubcategory")
        setListSubCategory(result.data)
      }
    
      const fillSubCategory = () => {
        return listSubCategory.map((item) => {
          if(categoryId==item.categoryid)
          {
          return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
          }
        })
      }
    
      const handleChangeSubCategory = (event) => {
        setSubCategoryId(event.target.value)
      }

      const fetchAllProducts = async () => {
        var result = await getData("product/displayallproduct")
        setListProduct(result.data)
      }
    
      const fillProduct = () => {
        return listProduct.map((item) => {
            if(companyId==item.companyid){
          return <MenuItem value={item.productid}>{item.productname}</MenuItem>
            }
        })
      }
    
      const handleChangeProduct = (event) => {
        setProductId(event.target.value)
      }

      const handleClose = () => {
        setOpen(false);
      };

      const handleClickOpen = (rowData) => {
        setColorId(rowData.colorid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setCompanyId(rowData.companyid)
        setProductId(rowData.productid)
        setColor(rowData.color)
        setOldPicture(rowData.icon)
        setPicture({filename:`${ServerURL}/images/${rowData.icon}`,bytes:""})
        fillCategory()
        fillSubCategory()
        fillCompany()
        fillProduct()
        setOpen(true);
      };

      const handleEditPicture=async()=>{
        setBtnState(false)
        var formData=new FormData()
        formData.append('colorId',colorId)
        formData.append('icon',picture.bytes)
        var result=await postDataAndImage("color/coloreditpicture",formData)
        fetchAllColor()
     }

     const handleCancel=()=>{
      setBtnState(false)
      setPicture({filename:`${ServerURL}/images/${oldPicture}`,bytes:""})
    }

      const handleSubmit=async()=>{
        setOpen(false)
        var body={colorId:colorId,categoryId:categoryId,subCategoryId:subCategoryId,companyId:companyId,productId:productId,color:color}
        var result=await postData("color/updatecolordata",body)
        if(result){
          Swal.fire({
            text: 'Color edited succesfully',
            imageUrl: '/logo.jpg',
            imageAlt: 'Custom image',
            icon:'success',
          })
        }else{
          Swal.fire({
            text: 'Fail to edit color',
            imageUrl: '/logo.jpg',
            imageAlt: 'Custom image',
            icon:'error',
          })
        }
        fetchAllColor()
    }

      const handleDelete=(data)=>{
        Swal.fire({
          imageUrl: '/logo.jpg',
          title: `Do you want to delete ${data.color}?`,
          showDenyButton: true,
          confirmButtonText: 'Delete',
          denyButtonText: `Don't Delete`,
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            result=await postData("color/deletecolor",{colorid:data.colorid})
            if(result){
              Swal.fire({
                text: 'Record Deleted Successfully',
                icon:'success',
              })
              fetchAllColor()
            }else{
              Swal.fire({
                text: 'Fail to Delete Record',
                icon:'error',
              })
            }
          } else if (result.isDenied) {
            Swal.fire(`${data.color} is safe`)
          }
        })
      }

      const showColorForm=()=>{
        return (
          <div className={classes.root}>
          <div className={classes.subdiv}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                      <div>
                        <img src="/Category.png" width='50' />
                      </div>
                      <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: 1, marginLeft: 10 }}>
                        Edit Color
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
                    value={categoryId}
                    label="Category Id"
                    onChange={(event) => handleChange(event)}
                  >
                    {fillCategory()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sub-Category Id</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={subCategoryId}
                    label="Sub-Category Id"
                    onChange={(event) => handleChangeSubCategory(event)}
                  >
                    {fillSubCategory()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Company Id</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={companyId}
                    label="Company Id"
                    onChange={(event) => handleChangeCompany(event)}
                  >
                    {fillCompany()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Product Id</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={productId}
                    label="Product Id"
                    onChange={(event) => handleChangeProduct(event)}
                  >
                    {fillProduct()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField value={color} onChange={(event) => setColor(event.target.value)} fullWidth variant="outlined" label="Color Name" />
              </Grid>
              <Grid item xs={6}>
                <label htmlFor="contained-button-file">
                  <input onChange={(event) => handlePicture(event)} className={classes.inputStyle} accept="image/*" id="contained-button-file" multiple type="file" />
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
                <Button onClick={()=>handleSubmit()} fullWidth variant="contained" startIcon={<Save />}>Save</Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
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
              {showColorForm()}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
        )
      }

    return(
        <div className={classes.root}>
    <div className={classes.subdivtable}>
    <MaterialTable
      title={<div style={{width:700,display:"flex",alignItems:"center"}}>
      <div style={{padding:5}}>
      <Button onClick={()=>handleClick()} startIcon={<AddCircle />} variant="contained">Add Color</Button>
        </div>
        <div style={{marginLeft:120,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>
          List of colors
          </div>
  </div>}
      columns={[
        { title: 'Color Id', field: 'colorid' },  
        { title: 'Category ID', render: rowData =>(<div>{rowData.categoryid},{rowData.categoryname}</div>) },
        { title: 'Sub-Category ID', render: rowData =>(<div>{rowData.subcategoryid},{rowData.subcategoryname}</div>) },
        { title: 'Company ID', render: rowData =>(<div>{rowData.companyid},{rowData.companyname}</div>) },
        { title: 'Product ID', render: rowData =>(<div>{rowData.productid},{rowData.productname}</div>)},
        { title: 'Color Name', field: 'color' },
        { title: 'Icon', field: 'icon',
        render: (rowData) =><Avatar
        alt="Color"
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
          tooltip: 'Edit Color',
          onClick: (event, rowData) => handleClickOpen(rowData)
        }, {
          icon: 'delete',
          tooltip: 'Delete Color',
          onClick: (event, rowData) => handleDelete(rowData)
        }
      ]}
    />
    </div>
    {showDialog()}
    </div>
    )

  }