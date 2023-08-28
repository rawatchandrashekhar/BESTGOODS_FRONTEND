import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { Save, ClearAll, List, AccountCircle, Send } from '@mui/icons-material';
import { postData, ServerURL, postDataAndImage } from "../FetchNodeServices";
import Swal from 'sweetalert2'
import InputAdornment from '@mui/material/InputAdornment';
import Header from "./Header";
import Footer from "./Footer";
import {useDispatch} from "react-redux"

const useStyles = makeStyles({
  root: {
    background: "#ecf0f1",
    paddingTop: 150,
    paddingLeft: 100,
    paddingRight: 100
  },

  subdiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "100%"
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

export default function SignIn(props) {

  const classes = useStyles(props);
  const [mobileno,setMobileno]=useState("")
  const [visible,setVisible]=useState(false)
  const [generateOtp,setGenerateOtp]=useState("")
  const [userInputOtp,setUserInputOtp]=useState("")
  const [userData,setUserData]=useState([])

  var dispatch=useDispatch()

  const otpGenerator=()=>{
    var v=["0","1","2","3","4","5","6","7","8","9"]
    var otp=""
    for(var i=1;i<=4;i++){
      otp+=v[parseInt((Math.random()*9))]
    }
    return otp
  }

  function handleCheckOtp(){
    if(generateOtp===userInputOtp){
      dispatch({type:"ADD_USER",payload:[mobileno,userData]})
      props.history.push({pathname:"/ordersummary"})
      // alert("Correct OTP")
    }else{
      alert("Incorrect OTP")
    }
  }
  
  const handleCheckUser=async()=>{
        var result=await postData("users/checkuserbymobileno",{mobileno:"+91"+mobileno})
        if(result.result){
       setVisible(true)
       var otp=otpGenerator()
       alert(otp)
       setGenerateOtp(otp)
       setUserData(result.data)
        }else{
          props.history.push({pathname:"/signup"},{mobileno:mobileno})
        }
  }


  return (
    <div>
      <div className={classes.root}>
        <Header history={props.history} />
        <div className={classes.subdiv}>
          <div>
            <img src="/signin.jpeg" style={{ borderRadius: 10, width: "54vmax", height: "auto" }} />
          </div>
          <div style={{ marginLeft: 20, padding: 20, border: "2px solid #666666", borderRadius: 10, width: "48vmax", height: "auto" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className={classes.center} style={{ border: "4px solid black", borderRadius: "50%" }}>
                <AccountCircle style={{ fontSize: 60 }} />
              </div>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ marginBottom: 15 }}>
                <div style={{ fontSize: 35, fontWeight: "bold" }}>
                  Sign in
                </div>
                <div style={{ color: "#666666" }}>
                  Sign in to access your Orders, Offers and Wishlist.
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                onChangeCapture={(event)=>setMobileno(event.target.value)}
                value={mobileno}
                  label="Enter Your Mobile no."
                  id="outlined-start-adornment"
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">+91 | </InputAdornment>,
                    endAdornment: <InputAdornment position="end">
                      <span onClick={()=>setMobileno(" ")} style={{color:"red",cursor:"pointer"}}>Change</span>
                      </InputAdornment>
                  }}
                />
              </Grid>
              <Grid item xs={12} style={{ marginBottom: 10 }}>
                <Button onClick={handleCheckUser} endIcon={<Send />} variant="contained" fullWidth style={{ color: "white", background: "black",fontWeight:"bold" }}>Send</Button>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center", marginBottom: 10 }}>
                By continuing you agree to our <font style={{ color: "red" }}>Terms of service </font>
                and <font style={{ color: "red" }}>Privacy & Legal Policy.</font>
              </Grid>
              {visible?<>
              <Grid item xs={12}>
               <div style={{display:"flex",justifyContent:"space-between"}}>
                 <div style={{fontSize:12}}>
                  We have sent 4 digit OTP on <font style={{fontWeight:"bold"}}>{mobileno}</font> 
                 </div>
                 <div onClick={()=>setMobileno(" ")} style={{fontSize:12,color:"red",cursor:"pointer"}}>
                 Change
                 </div>
               </div>
              </Grid>
              <Grid item xs={10}>
              <TextField
                  label="Enter OTP"
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={(event)=>setUserInputOtp(event.target.value)}
                />
                <div style={{fontSize:12,color:"red",display:"flex",justifyContent:"flex-end"}}>
                  Resend OTP
                </div>
              </Grid>
              <Grid item xs={12} style={{ marginBottom: 10 }}>
                <Button onClick={handleCheckOtp} endIcon={<Send />} variant="contained" fullWidth style={{ color: "white", background: "black",fontWeight:"bold" }}>Verify</Button>
              </Grid>
              </>:<></>}
            </Grid>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}