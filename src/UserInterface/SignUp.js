import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { Save, ClearAll, List, AccountCircle, Send,PersonAdd } from '@mui/icons-material';
import { postData, ServerURL, postDataAndImage } from "../FetchNodeServices";
import Swal from 'sweetalert2'
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Header from "./Header";
import Footer from "./Footer";

const useStyles = makeStyles({
  root: {
    background: "#ecf0f1",
    paddingTop: 150,
    paddingLeft: 30,
    paddingRight: 30
  },

  subdiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
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

export default function SignIn(props) {
  
  const classes = useStyles(props);
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [emailid,setEmailid]=useState("")
  const [mobileno,setMobileno]=useState("+91"+props.history.location.state.mobileno)

  const handleSubmit=async()=>{
    if(cValues.password===values.password){
    var body={mobileno:mobileno,emailid:emailid,firstname:firstName,lastname:lastName,password:values.password}
     var result=await postData("users/insertuser",body)
    }else{
       alert("Password/Confirm Password doesn't match")
    }
  }
  
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [cValues, setCValues] = React.useState({
    amount: '',
    cpassword: '',
    weight: '',
    weightRange: '',
    showCPassword: false,
  });

  const handleCChange = (prop) => (event) => {
    setCValues({ ...cValues, [prop]: event.target.value });
  };

  const handleClickShowCPassword = () => {
    setCValues({
      ...cValues,
      showCPassword: !cValues.showCPassword,
    });
  };

  const handleMouseDownCPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className={classes.root}>
        <Header history={props.history} />
        <div className={classes.subdiv}>
          <div>
            <img src="/signup.jpg" style={{ borderRadius: 10,width:"55vmax",height:"35vmax"}} />
          </div>
          <div style={{ marginLeft: 20, padding: 20, border: "2px solid #666666", borderRadius: 10 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ marginBottom: 15 }}>
              <div>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div style={{ fontSize: 35, fontWeight: "bold" }}>
                      Sign Up
                  </div>
                  <div>
                      <PersonAdd style={{ fontSize: 40 }} />
                  </div>
                  </div>
                  <div style={{fontWeight:500,paddingBottom:10}}>
                      Please enter your details.
                  </div>
              </div>
              <Divider />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Your First Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={(event)=>setFirstName(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Your Last Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={(event)=>setLastName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Your Email-id"
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={(event)=>setEmailid(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
              <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" size="small">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            fullWidth
            size="small"
          />
        </FormControl>
        <div style={{fontSize:12,fontWeight:500,width:310}}>
          Use 8 or more characters with a mix of letters & numbers 
        </div>
              </Grid>
              <Grid item xs={6}>
              <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" size="small">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={cValues.showCPassword ? 'text' : 'password'}
            value={cValues.password}
            onChange={handleCChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowCPassword}
                  onMouseDown={handleMouseDownCPassword}
                  edge="end"
                >
                  {cValues.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
            fullWidth
            size="small"
          />
        </FormControl>
              </Grid>
              <Grid item xs={12} style={{fontWeight:"bold",fontSize:20}}>
                Verify
              </Grid>
              <Grid item xs={12}>
               <div style={{display:"flex",justifyContent:"space-between"}}>
                 <div style={{fontSize:12}}>
                  We have sent 4 digit OTP on <font style={{fontWeight:"bold"}}>{mobileno}</font> 
                 </div>
                 <div style={{fontSize:12,color:"red"}}>
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
                />
                <div style={{fontSize:12,color:"red",display:"flex",justifyContent:"flex-end"}}>
                  Resend OTP
                </div>
              </Grid>
              <Grid item xs={12} style={{ marginBottom: 10 }}>
                <Button onClick={handleSubmit} variant="contained" fullWidth style={{ color: "white", background: "black",fontWeight:"bold" }}>Verify</Button>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center", marginBottom: 10,paddingLeft:100,paddingRight:100 }}>
                By continuing you agree to our <font style={{ color: "red" }}>Terms of service </font>
                and <font style={{ color: "red" }}>Privacy & Legal Policy.</font>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}