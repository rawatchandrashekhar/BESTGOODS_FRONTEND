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

  const fetchAllSubbanners=async()=>{
    var result=await getData("subbanner/displayallsubbanner")
    setList(result.data)
  }

  useEffect(function(){
    fetchAllSubbanners()
  },[])

  return(
    <div className={classes.root}>
    <div className={classes.subdivtable}>
    <MaterialTable
      title={<div style={{width:500,display:"flex",alignItems:"center"}}>
          <div style={{padding:5}}>
          <Button startIcon={<AddCircle />} variant="contained">Add Subbanner</Button>
            </div>
            <div style={{marginLeft:120,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>
              List of Subbanner
              </div>
      </div>}
      columns={[
        { title: 'Sub-banner more pictures ID', field: 'subbannermorepicturesid' },
        { title: 'Sub-banner ID', field: 'subbannerid' },
        { title: 'Category ID', render: rowData =>(<div>{rowData.categoryid}</div>)},
        { title: 'Sub-category ID', render: rowData =>(<div>{rowData.subcategoryid}</div>)},
        { title: 'Images', field: 'images',
        render: (rowData) =><Avatar
        alt="Sub-banner"
        variant="rounded"
        src={`${ServerURL}/images/${rowData.images}`}
        sx={{ width: 56, height: 56 }}
      />
      },
      ]}
      data={list}
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit Sub-banner',
          onClick: (event, rowData) => alert(event) 
        }, {
          icon: 'delete',
          tooltip: 'Delete Sub-banner',
          onClick: (event, rowData) => alert(event) 
        }
      ]}
    />
    </div>
    </div>
  )
}