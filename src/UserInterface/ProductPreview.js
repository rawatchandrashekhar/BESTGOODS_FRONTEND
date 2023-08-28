import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { Save, ClearAll, List, AccountCircle, Send,LocalOffer } from '@mui/icons-material';
import { postData, ServerURL, postDataAndImage } from "../FetchNodeServices";
import Swal from 'sweetalert2'
import InputAdornment from '@mui/material/InputAdornment';
import Header from "./Header";
import Footer from "./Footer";
import Rating from '@mui/material/Rating';
import ShoppingCartComponent from "./ShoppingCartComponent"
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

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

export default function ProductPreview(props) {

  const classes = useStyles(props);
  const [value, setValue] = React.useState(0);
  const [colorNameRed,setColorNameRed]=useState(false)
  const [colorNameBlue,setColorNameBlue]=useState(false)
  const [colorNameBlack,setColorNameBlack]=useState(false)
  const [open, setOpen] = React.useState(false);

  function handleRedColorChange(){
    setColorNameRed(true)
    setColorNameBlue(false)
    setColorNameBlack(false)
  }

  function handleBlueColorChange(){
    setColorNameBlue(true)
    setColorNameRed(false)
    setColorNameBlack(false)
  }

  function handleBlackColorChange(){
    setColorNameBlack(true)
    setColorNameBlue(false)
    setColorNameRed(false)
  }


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

  function handleClickOpen(){
    setOpen(true);
  };
  function handleClose(){
    setOpen(false);
  };

  function dialogBox(){
    return(<div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <b>Terms & Conditions</b>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
        <ul type="disc">
        <li>Get 5% upto Rs.100 Cashback on portronics!</li>
        <li>No min. amount required to avail the offer Use code: No code required to avail the offer</li>
        <li>Offer valid from 13th Jul (3:30 pm) to 30th Sept-2021</li>
        <li>Offer valid once per user per (calendar) month</li>
        <li>Cashback will be auto-credited to customer's MobiKwik wallet within 24 hours</li>
        <li>If the order is cancelled or left undelivered at Portronics's end, Portronics (not MobiKwik) will initiate a refund</li>
        <li>In case of partial refunds/cancellations, refund amount will be adjusted with the cashback received on initial payment</li>
        <li>Full cashback will be rolled back in case of a full refundAfter the refund is initiated, amount will be credited back to wallet within 7-10 days</li>
        <li>Both MobiKwik & Portronics reserves the right to discontinue the offer without any prior notice</li>
        </ul>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>)
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", padding: 30 }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center",flexDirection:"column" }} >
        <div><img src="/preview_smartwatch.jpg" style={{ paddingLeft: 30, paddingRight: 30 }} /></div>
        <div style={{display:"flex"}}>
        <div><img src="/bluesmartwatch.jpg" style={{ width:150,height:150 }} /></div>
        <div><img src="/pinksmartwatch.jpg" style={{ width:150,height:150 }} /></div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontWeight: "bold", fontSize: 30 }}>SoundDrum 1</div>
        <div style={{ display: "flex", flexDirection: "row", paddingTop: 15, paddingBottom: 15 }}><Rating name="read-only" value={value} readOnly /><font size="4" style={{ paddingLeft: 5 }}>Write Review</font></div>
        <div style={{ fontSize: 30, fontWeight: 400 }}>&#8377; {"1,349.00"} <s style={{ fontSize: 20, fontWeight: 400 }}>&#8377; {"1,999.00"}</s></div>
        <div style={{paddingTop:10,paddingBottom:10}}>Tax included.</div>
        <div style={{display:"flex",alignItems:"center" ,fontSize:13}}>Or 3 interest-free payments of ₹450 with  <img src="/zest-logo-name-info.svg" width={90} style={{paddingLeft:10}} /></div>
        <div style={{display:"flex", paddingTop: 15, paddingBottom: 15}}>
        <div onClick={handleRedColorChange} style={{cursor:"pointer", borderRadius:"50%",background:"red",width:35,height:35,marginRight:10}}></div>
        <div onClick={handleBlueColorChange} style={{cursor:"pointer",borderRadius:"50%",background:"blue",width:35,height:35,marginRight:10}}></div>
        <div onClick={handleBlackColorChange} style={{cursor:"pointer",borderRadius:"50%",background:"black",width:35,height:35}}></div>
        </div>
        {colorNameRed?<div style={{paddingBottom: 15}}>Color — Red</div>:<div></div>}
        {colorNameBlue?<div style={{paddingBottom: 15}}>Color — Blue</div>:<div></div>}
        {colorNameBlack?<div style={{paddingBottom: 15}}>Color — Black</div>:<div></div>}
        {/* <div><ShoppingCartComponent /></div> */}
        <div style={{paddingBottom:25,paddingTop:15}}><LocalOffer style={{color:"green"}}/> <font size="4" style={{fontWeight:"bold",paddingLeft:5}}>Offers Available</font></div>
        <Grid style={{display:"flex",alignItems:"center",border:"1px solid #dfe6e9",padding:15}}><img src="/mo.png" style={{width:90}} /><font style={{paddingLeft:30,paddingRight:280,fontSize:13}}>Get upto 5% cashback</font><Button onClick={handleClickOpen}>*T&C</Button></Grid>
      </div>
      {dialogBox()}
    </div>
  )
}
