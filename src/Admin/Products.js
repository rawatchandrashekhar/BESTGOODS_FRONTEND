import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Button, Avatar, Radio } from "@mui/material";
import { Save, ClearAll, List } from '@mui/icons-material';
import { getData, postDataAndImage, postData } from "../FetchNodeServices";
import Swal from 'sweetalert2'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DisplayAllProducts from "./DisplayAllProducts";

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

export default function Products(props) {

  const classes = useStyles(props);
  const [productId, setProductId] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [subCategoryId, setSubCategoryId] = useState("")
  const [companyId, setCompanyId] = useState("")
  const [productName, setProductName] = useState("")
  const [description, setDescription] = useState("")
  const [continueOrDiscontinue, setContinueOrDiscontinue] = useState("")
  const [listCategory, setListCategory] = useState([])
  const [listCompany, setListCompany] = useState([])
  const [listSubCategory, setListSubCategory] = useState([])
  const [picture, setPicture] = useState({ filename: "/camera.png", bytes: "" })

  const handlePicture = (event) => {
    setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
  }

  const handleChangeStatus = (event) => {
    setContinueOrDiscontinue(event.target.value);
  };

  useEffect(function () {
    fetchAllCategories()
    fetchAllCompanies()
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

  const handleChange = (event) => {
    setCategoryId(event.target.value)
    fetchAllSubCategories(event.target.value)
  }

  const fetchAllCompanies = async () => {
    var result = await getData("company/displayallcompany")
    setListCompany(result.data)
  }

  const fillCompany = () => {
    return listCompany.map((item) => {
      return <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
    })
  }

  const handleChangeCompany = (event) => {
    setCompanyId(event.target.value)
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
  }

  const handleClick=()=>{
    //props.history.push({pathname:"/displayallproducts"})
  props.setComponent(<DisplayAllProducts setComponent={props.setComponent}/>)
  }

  const handleSubmit=async()=>{
    var formData=new FormData()
    formData.append('categoryid',categoryId)
    formData.append('subcategoryid',subCategoryId)
    formData.append('companyid',companyId)
    formData.append('productname',productName)
    formData.append('continueordiscontinue',continueOrDiscontinue)
    formData.append('icon',picture.bytes)
    formData.append('description',description)
    var result=await postDataAndImage('product/productsubmit',formData)
    if(result){
    Swal.fire({
      text: 'Product added succesfully',
      imageUrl: '/logo.jpg',
      imageAlt: 'Custom image',
      icon:'success',
    })
  }else{
    Swal.fire({
      text: 'Fail to submit product',
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
                    Product Interface
                  </div>
                </div>
              </Grid>
              <Grid item xs={6} className={classes.center}>
                <div>
                  <Button onClick={()=>handleClick()} startIcon={<List />} variant="contained">Product List</Button>
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
            <TextField onChange={(event) => setProductName(event.target.value)} fullWidth variant="outlined" label="Product name" />
          </Grid>
          <Grid item xs={12}>
            <TextField onChange={(event) => setDescription(event.target.value)} fullWidth variant="outlined" label="Description" />
          </Grid>
          <Grid item xs={12} className={classes.center}>
          <div>
      <Radio
        checked={continueOrDiscontinue === 'continue'}
        onChange={handleChangeStatus}
        value="continue"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
      /> Continue
      <Radio
        checked={continueOrDiscontinue === 'discontinue'}
        onChange={handleChangeStatus}
        value="discontinue"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'B' }}
      /> Dis-continue
    </div>
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