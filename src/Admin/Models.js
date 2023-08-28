import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Button, Avatar, Radio } from "@mui/material";
import { Save, ClearAll, List } from '@mui/icons-material';
import { getData, postDataAndImage,postData } from "../FetchNodeServices";
import Swal from 'sweetalert2'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DisplayAllModels from "./DisplayAllModels";

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

export default function Models(props) {
    const classes = useStyles(props);
    const [modelId, setModelId] = useState("")
    const [modelName,setModelName]=useState("")
    const [modelSize,setModelSize]=useState("")
    const [modelWeight,setModelWeight]=useState("")
    const [productId, setProductId] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [subCategoryId, setSubCategoryId] = useState("")
    const [companyId, setCompanyId] = useState("")
    const [listCategory, setListCategory] = useState([])
    const [listCompany, setListCompany] = useState([])
    const [listSubCategory, setListSubCategory] = useState([])
    const [listProduct, setListProduct] = useState([])
    const [picture, setPicture] = useState({ filename: "/camera.png", bytes: "" })

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
      }
    
      const handleClick=()=>{
        //props.history.push({pathname:"/displayallmodels"})
      props.setComponent(<DisplayAllModels setComponent={props.setComponent}/>)
      }

      const handleSubmit=async()=>{
        var formData=new FormData()
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subCategoryId)
        formData.append('companyid',companyId)
        formData.append('productid',productId)
        formData.append('modelname',modelName)
        formData.append('modelsize',modelSize)
        formData.append('modelweight',modelWeight)
        formData.append('icon',picture.bytes)
        var result=await postDataAndImage('model/modelsubmit',formData)
        if(result){
        Swal.fire({
          text: 'Model added succesfully',
          imageUrl: '/logo.jpg',
          imageAlt: 'Custom image',
          icon:'success',
        })
      }else{
        Swal.fire({
          text: 'Fail to submit model',
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
                        Model Interface
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={6} className={classes.center}>
                    <div>
                      <Button onClick={()=>handleClick()} startIcon={<List />} variant="contained">Model List</Button>
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
                    onChange={(event) => handleChangeCategory(event)}
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
                <TextField onChange={(event) => setModelName(event.target.value)} fullWidth variant="outlined" label="Model Name" />
              </Grid>
              <Grid item xs={6}>
                <TextField onChange={(event) => setModelSize(event.target.value)} fullWidth variant="outlined" label="Model Size" />
              </Grid>
              <Grid item xs={6}>
                <TextField onChange={(event) => setModelWeight(event.target.value)} fullWidth variant="outlined" label="Model Weight" />
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