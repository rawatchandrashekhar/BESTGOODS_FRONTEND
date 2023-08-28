import * as React from 'react';
import { TextField } from '@material-ui/core';
import { IconButton,InputAdornment } from '@material-ui/core';
import MailOutlineIcon from '@mui/icons-material/MailOutline'; 
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp'
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import YouTubeIcon from '@mui/icons-material/YouTube';


export default function Footer(props) {
  
  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="#">
        BestGoods All rights reserved to Numeric Infosystem Pvt Ltd
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

    return(
        <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
            <div style={{width:"100%",background:"#ecf0f1",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
            <div style={{paddingTop:130,paddingBottom:40,fontSize:35,fontWeight:"bold"}}>
              Contact Us
            </div>
            <div style={{width:"100%",display:"flex",flexDirection:"row",flexWrap:"wrap",alignItems:"center",justifyContent:"space-evenly"}}>
               <div style={{padding:40,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
               <span style={{fontWeight:"bold",paddingBottom:20}}>For Complaints</span>
               <div>E-mail: <a href='#' style={{color:"black"}}>help@portronics.com</a></div>
               <div>Phone: <a href='#' style={{color:"black"}}>(+91)9555-245-245</a></div>
               <div>Need Help : <a href='#' style={{color:"black"}}>Click here</a></div>
               </div>
               <div style={{padding:40,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
               <span style={{fontWeight:"bold",paddingBottom:20}}>FOR BUSINESS QUERIES</span>
               <div><a href='#' style={{color:"black"}}>sales@portronics.com</a></div>
               <div>Track Order : <a href='#' style={{color:"black"}}>Click here</a></div>  
               </div>
            </div>
            </div>
            <div style={{width:"100%",background:"#000000",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}> 
            <div style={{color:"white",paddingTop:60,paddingBottom:20,fontSize:30}}>Join the Club</div>
            <div style={{color:"white",paddingBottom:30,textAlign:"center"}}>Subscribe today to hear about our newest offers, new products, collaborations, everything Portronics - Directly to your inbox.</div>
            <TextField style={{marginBottom:60}}
            focused
            placeholder='Enter your email'
            inputProps={{style: {color: 'white',width:350,fontSize:20}}}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                     <MailOutlineIcon style={{color:"white"}}/>
                  </IconButton>
                </InputAdornment>
              ),
            }}
            />           
            </div>
            <div style={{width:"100%", display: 'flex',justifyContent: 'center',alignItems:"center",flexDirection:"column",background:"white"}}>

        <div style={{ display: 'flex', paddingTop: "70px", justifyContent: 'center' }}>
          <InstagramIcon style={{width: 30, height: 30, marginRight: 20 , border:"3px solid black",borderRadius:"50%",padding:10}} />
          <FacebookSharpIcon style={{ width: 30, height: 30, marginRight: 20, border:"3px solid black",borderRadius:"50%",padding:10 }} />
          <TwitterIcon style={{ width: 30, height: 30, marginRight: 20, border:"3px solid black",borderRadius:"50%",padding:10 }} />
          <PinterestIcon style={{ width: 30, height: 30, marginRight: 20, border:"3px solid black",borderRadius:"50%",padding:10 }} />
          <YouTubeIcon style={{ width: 30, height: 30, marginRight: 20, border:"3px solid black",borderRadius:"50%",padding:10 }} />
        </div>

        <div style={{textAlign:"center",padding:"25px 25px"}}>

          <a href="#" style={{ color: '#000', fontSize: '14px', marginRight: 20, letterSpacing: 1,textDecoration:"none" }}>Blogs</a>
          <a href="#" style={{ color: '#000', fontSize: '14px', marginRight: 20, letterSpacing: 1,textDecoration:"none" }}>Support</a>
          <a href="#" style={{ color: '#000', fontSize: '14px', marginRight: 20, letterSpacing: 1,textDecoration:"none" }}>Privacy Policy</a>
          <a href="#" style={{ color: '#000', fontSize: '14px', marginRight: 20, letterSpacing: 1,textDecoration:"none" }}>E-waste management</a>
          <a href="#" style={{ color: '#000', fontSize: '14px', marginRight: 20, letterSpacing: 1,textDecoration:"none" }}>Terms and Conditions</a>
          <a href="#" style={{ color: '#000', fontSize: '14px', marginRight: 20, letterSpacing: 1,textDecoration:"none" }}>CSR Policy</a>
          <a href="#" style={{ color: '#000', fontSize: '14px', marginRight: 20, letterSpacing: 1,textDecoration:"none" }}>Warranty,Return and Refund</a>
          <a href="#" style={{ color: '#000', fontSize: '14px', marginRight: 20, letterSpacing: 1,textDecoration:"none" }}>Track</a>
          <a href="#" style={{ color: '#000', fontSize: '14px', marginRight: 20, letterSpacing: 1,textDecoration:"none" }}>About US</a>
          <a href="#" style={{ color: '#000', fontSize: '14px', marginRight: 20, letterSpacing: 1,textDecoration:"none" }}>Become Partner</a>
          <a href="#" style={{ color: '#000', fontSize: '14px', marginRight: 20, letterSpacing: 1,textDecoration:"none" }}>Bronchure</a>

        </div>
         <div style={{ display: 'flex',alignItems:"center", justifyContent: 'center',flexWrap:"wrap" }}>
          <img src="airtel.png" style={{ width: 25, height: 25, paddingRight:25,paddingBottom:10}} />
          <img src="amex.png" style={{ width: 25, height: 25, paddingRight: 25,paddingBottom:10}} />
          <img src="freecharge.png" style={{ width: 25, height: 25, paddingRight: 25,paddingBottom:10}} />
          <img src="gpay.png" style={{ width: 25, height: 25, paddingRight: 25,paddingBottom:10}} />
          <img src="mastercard.png" style={{ width: 25, height: 25, paddingRight: 25,paddingBottom:10}} />
          <img src="mobikwik.png" style={{ width: 25, height: 25, paddingRight: 25,paddingBottom:10}} />
          <img src="netbanking.jpg" style={{ width: 25, height: 25, paddingRight: 25,paddingBottom:10}} />
          <img src="paytm.png" style={{ width: 25, height: 25, paddingRight: 25,paddingBottom:10}} />
          <img src="payzapp.png" style={{ width: 25, height: 25, paddingRight: 25,paddingBottom:10}} />
          <img src="rupay.png" style={{ width: 25, height: 25, paddingRight: 25,paddingBottom:10}} />
          <img src="visa.png" style={{ width: 25, height: 25, paddingRight: 25,paddingBottom:10}} />


        </div>
        <Copyright sx={{ pt: 3 }} style={{paddingBottom:"100px"}}/>
      </div> 
        </div>
    )
}