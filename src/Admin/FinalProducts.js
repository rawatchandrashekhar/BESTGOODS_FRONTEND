import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Button, Avatar, Radio } from "@mui/material";
import { Save, ClearAll, List, Add } from '@mui/icons-material';
import { getData, postDataAndImage,postData, postDataAndImageWithId } from "../FetchNodeServices";
import Swal from 'sweetalert2'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DisplayAllFinalProducts from "./DisplayAllFinalProducts";
import {DropzoneDialog} from 'material-ui-dropzone'

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
    width: 1000,
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

export default function FinalProducts(props) {
 
    const classes = useStyles(props);
    const [price,setPrice]=useState("")
    const [stock,setStock]=useState("")
    const [offerPrice,setOfferPrice]=useState("")
    const [description,setDescription]=useState("")
    const [productId, setProductId] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [subCategoryId, setSubCategoryId] = useState("")
    const [companyId, setCompanyId] = useState("")
    const [colorId,setColorId]=useState("")
    const [modelId,setModelId]=useState("")
    const [sizeId,setSizeId]=useState("")
    const [productStatus,setProductStatus]=useState("")
    const [listCategory, setListCategory] = useState([])
    const [listCompany, setListCompany] = useState([])
    const [listSubCategory, setListSubCategory] = useState([])
    const [listProduct, setListProduct] = useState([])
    const [listColor, setListColor] = useState([])
    const [listModel, setListModel] = useState([])
    const [listSize, setListSize] = useState([])
    const [picture, setPicture] = useState({ filename: "/camera.png", bytes: "" })
    const [dropZoneVisible,setDropZoneVisible]=useState(false)
    const [finalProductId,setFinalProductId]=useState("")

    const handlePicture = (event) => {
        setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
      }
    
      useEffect(function () {
        fetchAllCategories()
      }, [])
    
      const fetchAllCategories = async () => {
        var result = await getData("category/displayallcategory")
        setListCategory(result.data)
      }
    
      const fillCategory = () => {
        return listCategory.map((item) => {
          return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
      }
    
      const handleChangeCategory = (event) => {
        setCategoryId(event.target.value)
        fetchAllSubCategories(event.target.value)
      }
    
      const fetchAllCompanies = async (sid) => {
        var body={subcategoryid:sid}
        var result = await postData("product/displayallcompanybysubcategory",body)
        setListCompany(result.data)
      }
    
      const fillCompany = () => {
        return listCompany.map((item) => {
          return <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
        })
      }
    
      const handleChangeCompany = (event) => {
        setCompanyId(event.target.value)
        fetchAllProducts(event.target.value)
      }
    
      const fetchAllSubCategories = async (cid) => {
        var body={categoryid:cid}
        var result = await postData("subcategory/displayallsubcategorybycategory",body)
        setListSubCategory(result.data)
      }
    
      const fillSubCategory = () => {
        return listSubCategory.map((item) => {
          return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
      }
    
      const handleChangeSubCategory = (event) => {
        setSubCategoryId(event.target.value)
        fetchAllCompanies(event.target.value)
      }

      const fetchAllProducts = async (coid) => {
        var body={companyid:coid}
        var result = await postData("product/displayallproductbycompany",body)
        setListProduct(result.data)
      }
    
      const fillProduct = () => {
        return listProduct.map((item) => {
          return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
      }
    
      const handleChangeProduct = (event) => {
        setProductId(event.target.value)
        fetchAllColors(event.target.value)
        fetchAllModels(event.target.value)
      }

      const fetchAllColors = async (pid) => {
        var body={productid:pid}
        var result = await postData("color/displayallcolorbyproduct",body)
        setListColor(result.data)
      }
    
      const fillColor = () => {
        return listColor.map((item) => {
          return <MenuItem value={item.colorid}>{item.color}</MenuItem>
        })
      }
    
      const handleChangeColor = (event) => {
        setColorId(event.target.value)
      }

      const fetchAllModels = async (pid) => {
        var body={productid:pid}
        var result = await postData("model/displayallmodelbyproduct",body)
        setListModel(result.data)
      }
    
      const fillModel = () => {
        return listModel.map((item) => {
          return <MenuItem value={item.modelid}>{item.modelname}</MenuItem>
        })
      }
    
      const handleChangeModel = (event) => {
        setModelId(event.target.value)
      }

      const fetchAllSizes = async () => {
        var result = await getData("model/displayallmodel")
        setListSize(result.data)
      }
    
      const fillSize = () => {
        return listModel.map((item) => {
          return <MenuItem value={item.modelid}>{item.modelsize}</MenuItem>
        })
      }
    
      const handleChangeSize = (event) => {
        setSizeId(event.target.value)
      }
    
      const handleClick=()=>{
        //props.history.push({pathname:"/displayallfinalproducts"})
      props.setComponent(<DisplayAllFinalProducts setComponent={props.setComponent}/>)
      }

      const handleAddPicture=()=>{
          setDropZoneVisible(true)
      }

      const handleSave=async(files)=>{
          var formData=new FormData()
         formData.append("finalproductid",finalProductId)
         files.map((file,index)=>{
           formData.append("Image"+index,file)
         })
         var result=await postDataAndImage("finalproduct/savemorepictures",formData)
         alert(result)
      }

      const handleSubmit=async()=>{
        var formData=new FormData()
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subCategoryId)
        formData.append('companyid',companyId)
        formData.append('productid',productId)
        formData.append('colorid',colorId)
        formData.append('modelid',modelId)
        formData.append('sizeid',sizeId)
        formData.append('price',price)
        formData.append('stock',stock)
        formData.append('offerprice',offerPrice)
        formData.append('description',description)
        formData.append('icon',picture.bytes)
        formData.append('productstatus',productStatus)
        var result=await postDataAndImageWithId('finalproduct/finalproductsubmit',formData)
        if(result.result){
          setFinalProductId(result.finalproductid)
        Swal.fire({
          text: 'Final Product added succesfully',
          imageUrl: '/logo.jpg',
          imageAlt: 'Custom image',
          icon:'success',
        })
      }else{
        Swal.fire({
          text: 'Fail to submit final product',
          imageUrl: '/logo.jpg',
          imageAlt: 'Custom image',
          icon:'error',
        })
      }
      }

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
                        Final Product Interface
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={6} className={classes.center}>
                    <div>
                      <Button onClick={()=>handleClick()} startIcon={<List />} variant="contained">Final Product List</Button>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryId}
                    label="Category Id"
                    onChange={(event) => handleChangeCategory(event)}
                  >
                    {fillCategory()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
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
              <Grid item xs={3}>
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
              <Grid item xs={3}>
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
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Model Id</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={modelId}
                    label="Model Id"
                    onChange={(event) => handleChangeModel(event)}
                  >
                    {fillModel()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Size Id</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sizeId}
                    label="Size Id"
                    onChange={(event) => handleChangeSize(event)}
                  >
                   {fillSize()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Color Id</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={colorId}
                    label="Color Id"
                    onChange={(event) => handleChangeColor(event)}
                  >
                    {fillColor()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField onChange={(event) => setPrice(event.target.value)} fullWidth variant="outlined" label="Price" />
              </Grid>
              <Grid item xs={4}>
                <TextField onChange={(event) => setStock(event.target.value)} fullWidth variant="outlined" label="Stock" />
              </Grid>
              <Grid item xs={4}>
                <TextField onChange={(event) => setOfferPrice(event.target.value)} fullWidth variant="outlined" label="Offer Price" />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Product Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={productStatus}
                    label="Product Status"
                    onChange={(event) => setProductStatus(event.target.value)}
                  >
                    <MenuItem value="Trending">Trending</MenuItem>
                    <MenuItem value="New Arrival">New Arrival</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField onChange={(event) => setDescription(event.target.value)} fullWidth variant="outlined" label="Description" />
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
                <Avatar alt="Remy Sharp" variant="rounded" src={picture.filename} />
              </Grid>
              <Grid item xs={4}>
                <Button onClick={()=>handleSubmit()} fullWidth variant="contained" startIcon={<Save />}>Save</Button>
              </Grid>
              <Grid item xs={4}>
                <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
              </Grid>
              <Grid item xs={4}>
                <Button fullWidth variant="contained" onClick={()=>handleAddPicture()} startIcon={<Add />}>Add more pictures</Button>
              </Grid>
            </Grid>
            <DropzoneDialog
                    open={dropZoneVisible}
                    onSave={(files)=>handleSave(files)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    filesLimit={10}
                    onClose={()=>setDropZoneVisible(false)}
                />
          </div>
        </div>
      )
}