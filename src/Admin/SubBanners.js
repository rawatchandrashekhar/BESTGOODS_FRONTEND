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

export default function SubBanners(props) {
 
    const classes = useStyles(props);
    const [subbannerId,setSubbannerId]=useState("")
    const [categoryId, setCategoryId] = useState("")
    const [subCategoryId, setSubCategoryId] = useState("")
    const [listCategory, setListCategory] = useState([])
    const [listSubCategory, setListSubCategory] = useState([])
    const [dropZoneVisible,setDropZoneVisible]=useState(false)
    
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

     const handleAddPicture=()=>{
        setDropZoneVisible(true)
    }

    const handleSave=async(files)=>{
        var formData=new FormData()
       formData.append("subbannerid",subbannerId)
       formData.append("categoryid",categoryId)
       formData.append("subcategoryid",subCategoryId)
       files.map((file,index)=>{
         formData.append("Image"+index,file)
       })
       var result=await postDataAndImageWithId("subbanner/subbannersubmit",formData)
      if(result){
        setSubbannerId(result.subbannerid)
      Swal.fire({
        text: 'Sub-banners added succesfully',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon:'success',
      })
    }else{
      Swal.fire({
        text: 'Fail to submit sub-banners',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon:'error',
      })
    }
    setDropZoneVisible(false)
    }

    // const handleSubmit=async()=>{
    //     var body={categoryid:categoryId,subcategoryid:subCategoryId}
    //     var result=await postData('subbanner/subbannersubmit',body)
    //     if(result.result){
    //       setSubbannerId(result.subbannerid)
    //     Swal.fire({
    //       text: 'Sub-banner added succesfully',
    //       imageUrl: '/logo.jpg',
    //       imageAlt: 'Custom image',
    //       icon:'success',
    //     })
    //   }else{
    //     Swal.fire({
    //       text: 'Fail to submit sub-banner',
    //       imageUrl: '/logo.jpg',
    //       imageAlt: 'Custom image',
    //       icon:'error',
    //     })
    //   }
    //   }

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
                        Sub-banner Interface
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={6} className={classes.center}>
                    <div>
                      <Button startIcon={<List />} variant="contained">Sub-banner List</Button>
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
              <Button fullWidth variant="contained" onClick={()=>handleAddPicture()} startIcon={<Add />}>Add more banners</Button>
              </Grid>
              <Grid item xs={6}>
              <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
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