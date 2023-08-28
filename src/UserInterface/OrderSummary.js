import React, { useEffect, useState } from 'react';
import { makeStyles } from "@mui/styles";
import { Grid, TextField, Button, Paper, Box } from '@mui/material';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import BackpackIcon from '@mui/icons-material/Backpack';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import PaymentIcon from '@mui/icons-material/Payment';
import AddIcon from '@mui/icons-material/Add';
import ToggleButton from '@mui/material/ToggleButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Drawer from '@mui/material/Drawer';
import Checkbox from '@mui/material/Checkbox';
import Header from "./Header";
import Footer from "./Footer";
import { postData, ServerURL } from '../FetchNodeServices';
import { useSelector,useDispatch } from "react-redux"
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Add from '@mui/icons-material/Add';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const useStyles = makeStyles({
    root: {
        background: '#ecf0f1',
        marginTop: 75
    },
    divided: {
        display: 'flex',
        alignItems: 'center',
    },
    divider: {
        flexGrow: 1,
        borderBottom: '1px solid grey',
        margin: 5,
    }
})

export default function OrderSummary(props) {

    const classes = useStyles();
    const [addressStatus, setAddressStatus] = useState({ status: false, data: [] })
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [getMobileno,setMobileno]=useState("")
    const [addressOne,setAddressOne]=useState("")
    const [addressTwo,setAddressTwo]=useState("")
    const [states,setStates]=useState("")
    const [city,setCity]=useState("")
    const [zipcode,setZipcode]=useState("")

    var dispatch=useDispatch()

    var user = useSelector(state => state.user)
    var userData = Object.values(user)[0]
    var cart = useSelector(state => state.cart)
    var keys = Object.keys(cart)
    var cartitems = Object.values(cart)

    var totalamount = cartitems.reduce((a, b) => getTotalAmount(a, b), 0)
    function getTotalAmount(p1, p2) {
        var price = p2.offerprice > 0 ? p2.offerprice * p2.qty : p2.price * p2.qty
        return (price + p1)
    }

    var netamount = cartitems.reduce((a, b) => getNetAmount(a, b), 0)
    function getNetAmount(p1, p2) {
        var price = p2.price * p2.qty
        return (price + p1)
    }

    var savings = cartitems.reduce((a, b) => getSavings(a, b), 0)
    function getSavings(p1, p2) {
        var price = p2.offerprice > 0 ? (p2.price - p2.offerprice) * p2.qty : 0
        return (price + p1)
    }

    const checkAddress = async () => {
        var result = await postData("users/checkuseraddress", { mobileno: userData.mobileno })
        setAddressStatus({ status: result.result, data: result.data })
        if(!result.result){
            setMobileno(userData.mobileno)
            setFirstName(userData.firstname)
            setLastName(userData.lastname)
        }
    }

    useEffect(function () {
        checkAddress()
    }, [])

    const handleAddress=async()=>{
       var body={mobileno:getMobileno,addressone:addressOne,addresstwo:addressTwo,state:states,city:city,zipcode:zipcode,firstname:firstName,lastname:lastName,usermobileno:userData.mobileno}
       var result=await postData("users/addnewaddress",body)
       alert(result)
       checkAddress()
    }

    const handleSetAddress=(item)=>{
        dispatch({type:"ADD_DA",payload:[item.mobileno,item]})
        toast.success("Selected!",{
            position:"top-center"
        });
    }

    const fetchAddress=()=>{
        return addressStatus.data.map((item)=>{
        return (<div style={{width: '100%',display:"flex",flexDirection:"column"}}>
            <Button onClick={()=>handleSetAddress(item)} style={{ background: '#ecf0f1', padding: 20,margin:5,color:"black"}}>
                                    <div style={{ display: 'flex',flexDirection:"column",background: '#ecf0f1',flexWrap:"wrap" }}>
                                        <div style={{fontSize:20,fontWeight:"bold"}}>{item.mobileno}</div>
                                        <div><b>{item.firstname} {item.lastname}</b></div>
                                        <div><b>{item.addressone}, {item.addresstwo}<br />{item.state}, {item.city}<br/>{item.zipcode}</b></div>
                                    </div>
                                </Button>
                                <ToastContainer />
                                </div>)
                            })
    }

    ////////////////////////////////////////////////////DRAWER////////////////////////////////////////////////////////////
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
        >

            <div style={{ padding: 5, display: "flex", alignItems: "center", justifyContent: "center", width: 390 }}>
                <img
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                    src="/logo.jpg"
                    width="150"
                />
            </div>
            <div style={{ padding: 10, display: "flex", alignItems: "center", width: 380 }}>
                <span style={{ fontWeight: "bold", fontSize: 18 }}>{userData.firstname} {userData.lastname}</span>
            </div>

            <div style={{ padding: 10, display: "flex",flexDirection:"column", alignItems: "center", width: 380 }}>
            <Grid container spacing={2} >
            <Grid item xs={12}>
                 <TextField size="small" value={getMobileno} label="Mobile No." variant="outlined" fullWidth onChange={(event)=>setMobileno(event.target.value)} />
               </Grid>
            <Grid item xs={12}>
                 <TextField size="small" value={firstName} label="First Name" variant="outlined" fullWidth onChange={(event)=>setFirstName(event.target.value)} />
               </Grid>
               <Grid item xs={12}>
                 <TextField size="small" value={lastName} label="Last Name" variant="outlined" fullWidth onChange={(event)=>setLastName(event.target.value)} />
               </Grid>
               <Grid item xs={12}>
                 <TextField size="small" label="Address Line One" variant="outlined" fullWidth onChange={(event)=>setAddressOne(event.target.value)} />
               </Grid>
               <Grid item xs={12}>
                 <TextField size="small" label="Address Line Two" variant="outlined" fullWidth onChange={(event)=>setAddressTwo(event.target.value)} />
               </Grid>
               <Grid item xs={12}>
                 <TextField size="small" label="State" variant="outlined" fullWidth onChange={(event)=>setStates(event.target.value)} />
               </Grid>
               <Grid item xs={12}>
                 <TextField size="small" label="City" variant="outlined" fullWidth onChange={(event)=>setCity(event.target.value)} />
               </Grid>
               <Grid item xs={12}>
                 <TextField size="small" label="Zipcode" variant="outlined" fullWidth onChange={(event)=>setZipcode(event.target.value)} />
               </Grid>
            </Grid>

            <List>

            </List>
            <Divider />

            <div style={{ padding: 10, display: "flex", alignItems: "center", width: 380 }}>
                <Button variant="contained" fullWidth style={{ background: "black", color: "white", fontWeight: "bold", fontSize: 18 }} onClick={(event)=>handleAddress(event.target.value)}>Save New Address</Button>
            </div>
</div>
        </Box>
    );
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleMakePayment=()=>{
     props.history.push({pathname:"/paymentgateway"})   
    }

    return (
        <div className={classes.root}>
            <Header history={props.history} />
            <Grid container spacing={1} style={{ display: 'flex', flexDirection: 'row', padding: 40, paddingLeft: 100, paddingRight: 100 }}>
                <Grid item xs={7} style={{ alignItems: 'left' }}>
                    <div style={{ fontWeight: 'bold', fontSize: 30 }}>Order Summary</div>
                    <Grid container spacing={1} style={{ display: 'flex', flexDirection: 'column' }}>
                        <Grid item xs={12} style={{ background: '#fff', borderRadius: 10, marginTop: 30, width: '80%', padding: 10 }}>
                            <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Select Delivery Address</div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                {addressStatus.status ?<> 
                                    <div style={{ paddingBottom: 10, display: 'flex', alignItems: 'center', width: "100%" }}>
                                        <Button onClick={toggleDrawer('right', true)} variant="contained" fullWidth style={{ background: 'black', color: '#FFF', fontWeight: 'bold', fontSize: 18 }}>Add More Address</Button>
                                    </div>
                                {fetchAddress()} 
                                </>: <><Radio checked ></Radio><Button onClick={toggleDrawer('right', true)} startIcon={<Add />} style={{ width: "50%", background: 'black', color: '#FFF', fontWeight: 'bold', fontSize: 18 }}>Add New Address</Button></>}
                            </div>
                        </Grid>
                        <Grid item xs={12} style={{ background: '#fff', borderRadius: 10, marginTop: 30, width: '80%', padding: 10 }}>
                            <div style={{ padding: 10, display: "flex", alignItems: "center"}}>
                                <span style={{ fontWeight: "bold", fontSize: 18 }}>Cart Items({keys.length})</span>
                                <span style={{ fontWeight: "bold", fontSize: 18, marginLeft: "auto" }}>Total: &#8377;{totalamount}</span>
                            </div>
                            <Divider />
                            <List>
                                {cartitems.map((item, index) => (
                                    <ListItem button>
                                        <ListItemIcon>
                                            <img src={`${ServerURL}/images/${item.icon}`} style={{ width: 60, borderRadius: 10 }} />
                                        </ListItemIcon>
                                        <div style={{width:"100%", display: "flex", flexDirection: "column", padding: 5, marginLeft: 10 }}>
                                            <ListItemText primary={item.productname} />
                                            <ListItemText primary={item.offerprice > 0 ? <div style={{ width: "100%", fontSize: 18, fontWeight: 500 }}><s style={{ fontSize: 13, fontWeight: 400 }}>&#8377; {item.price}</s>{" "}&#8377;{item.offerprice} x {item.qty}<div style={{ display: "flex", color: "darkgreen", fontSize: 18, fontWeight: 500 }}>You Save &#8377;{(item.price - item.offerprice) * item.qty}<span style={{ marginLeft: "auto", color: "black", fontWeight: "bold" }}> &#8377;{item.offerprice * item.qty}</span></div></div> : <><div style={{ fontSize: 18, fontWeight: 500, width: 280 }}>&#8377;{item.price} x {item.qty}</div><div style={{ display: "flex", fontSize: 18, fontWeight: 500 }}>&nbsp;<span style={{ marginLeft: "auto", color: "black", fontWeight: "bold" }}> &#8377;{item.price * item.qty}</span></div></>} />
                                        </div>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5} >
                    <div className={classes.divided}>
                        <div style={{ display: 'flex', flexDirection: 'row', padding: 10 }}><ShoppingCart style={{ color: 'blue' }} /><div style={{ fontSize: 12, padding: 5 }} >Your Cart</div></div>
                        <span className={classes.divider}></span>
                        <div style={{ display: 'flex', flexDirection: 'row', padding: 10 }}><BackpackIcon style={{ color: 'blue' }} /><div style={{ fontSize: 12, padding: 5 }} >Order Summary</div></div>
                        <span className={classes.divider}></span>
                        <div style={{ display: 'flex', flexDirection: 'row', padding: 10 }}><PaymentIcon /><div style={{ fontSize: 12, padding: 5 }} >Payment</div></div>
                    </div>
                    <Grid container spacing={1} style={{ display: 'flex', flexDirection: 'column' }}>
                        <Grid item xs={12} style={{ marginBottom: 20 }} >
                            <Divider />
                        </Grid>
                        <Grid item xs={12} style={{ background: '#fff', borderRadius: 10, padding: 20 }}>
                            <div style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>Payment Details</div>
                            <div style={{ padding: 10, display: 'flex', alignItems: 'center', width: "95%" }}>
                                <span style={{ fontWeight: 'bold', fontSize: 18 }}>Net Amount:</span>
                                <span style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 'auto' }}>&#8377;{netamount}</span>
                            </div>
                            <div style={{ padding: 10, display: 'flex', alignItems: 'center', width: "95%" }}>
                                <span style={{ fontWeight: 'bold', fontSize: 18 }}>Savings:</span>
                                <span style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 'auto' }}>&#8377;{savings}</span>
                            </div>
                            <div style={{ padding: 10, display: 'flex', alignItems: 'center', width: "95%" }}>
                                <span style={{ fontWeight: 'bold', fontSize: 18 }}>Delivery Charges:</span>
                                <span style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 'auto' }}>&#8377;{0}</span>
                            </div>
                            <Divider />
                            <div style={{ padding: 10, display: 'flex', alignItems: 'center', width: "95%" }}>
                                <span style={{ fontWeight: 'bold', fontSize: 18 }}>Final Amount:</span>
                                <span style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 'auto' }}>&#8377;{netamount-savings}</span>
                            </div>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: "flex-end" }}>
                            <div style={{ padding: 10, width: "60%" }}>
                                <Button onClick={()=>handleMakePayment()} variant="contained" fullWidth style={{ background: 'black', color: '#FFF', fontWeight: 'bold', fontSize: 18 }}>Make Payment</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Footer />

            <div>
                <React.Fragment key={'right'}>
                    <SwipeableDrawer
                        anchor={'right'}
                        open={state['right']}
                        onClose={toggleDrawer('right', false)}
                        onOpen={toggleDrawer('right', true)}
                    >
                        {list('right')}
                    </SwipeableDrawer>
                </React.Fragment>
            </div>

        </div>
    )
}