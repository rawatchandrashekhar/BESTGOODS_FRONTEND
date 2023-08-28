import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { getData, postData, ServerURL, postDataAndImage } from "../FetchNodeServices";
import { useSelector } from "react-redux"




import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header(props) {
  console.log("HEADER", props)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [categoryId, setCategoryId] = useState("")
  const [categoryList, setCategoryList] = useState([])
  const [listSubCategory, setListSubCategory] = useState([])

  var cart = useSelector(state => state.cart)
  var keys = Object.keys(cart)
  var cartitems=Object.values(cart)

  var totalamount=cartitems.reduce((a,b)=>getTotalAmount(a,b),0)
  function getTotalAmount(p1,p2){
     var price=p2.offerprice>0?p2.offerprice*p2.qty:p2.price*p2.qty
     return(price+p1)
  }

  var netamount=cartitems.reduce((a,b)=>getNetAmount(a,b),0)
  function getNetAmount(p1,p2){
     var price=p2.price*p2.qty
     return(price+p1)
  }

  var savings=cartitems.reduce((a,b)=>getSavings(a,b),0)
  function getSavings(p1,p2){
     var price=p2.offerprice>0?(p2.price-p2.offerprice)*p2.qty:0
     return(price+p1)
  }

  function handleProceed(){
    props.history.push({pathname:"/signin"})
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
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
 
      <div style={{padding:5,display:"flex",alignItems:"center",justifyContent:"center",width:390}}>
      <img
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            src="/logo.jpg"
            width="150"
          />
      </div>
      <div style={{padding:10,display:"flex",alignItems:"center",width:380}}>
        <span style={{fontWeight:"bold",fontSize:18}}>Cart Items({keys.length})</span>
        <span style={{fontWeight:"bold",fontSize:18,marginLeft:"auto"}}>Total: &#8377;{totalamount}</span>
      </div>

      <List>
        {cartitems.map((item, index) => (
          <ListItem button>
            <ListItemIcon>
              <img src={`${ServerURL}/images/${item.icon}`} style={{width:60,borderRadius:10}} />
            </ListItemIcon>
            <div style={{display:"flex",flexDirection:"column",padding:5,marginLeft:10}}>
            <ListItemText primary={item.productname} />
            <ListItemText primary={item.offerprice>0?<div style={{width:280,fontSize:18,fontWeight:500}}><s style={{fontSize:13,fontWeight:400}}>&#8377; {item.price}</s>{" "}&#8377;{item.offerprice} x {item.qty}<div style={{display:"flex",color:"darkgreen",fontSize:18,fontWeight:500}}>You Save &#8377;{(item.price-item.offerprice)*item.qty}<span style={{marginLeft:"auto",color:"black",fontWeight:"bold"}}> &#8377;{item.offerprice*item.qty}</span></div></div>:<><div style={{fontSize:18,fontWeight:500,width:280}}>&#8377;{item.price} x {item.qty}</div><div style={{display:"flex",fontSize:18,fontWeight:500}}>&nbsp;<span style={{marginLeft:"auto",color:"black",fontWeight:"bold"}}> &#8377;{item.price*item.qty}</span></div></>} />
            </div>
          </ListItem> 
        ))}
      </List>
      <Divider />

      <div style={{padding:10,display:"flex",alignItems:"center",width:380}}>
        <span style={{fontWeight:"bold",fontSize:18}}>Net Amount:</span>
        <span style={{fontWeight:"bold",fontSize:18,marginLeft:"auto"}}>&#8377;{netamount}</span>
      </div>

      <div style={{padding:10,display:"flex",alignItems:"center",width:380}}>
        <span style={{fontWeight:"bold",fontSize:18}}>Savings:</span>
        <span style={{fontWeight:"bold",fontSize:18,marginLeft:"auto"}}>&#8377;{savings}</span>
      </div>  

      <div style={{padding:10,display:"flex",alignItems:"center",width:380}}>
        <span style={{fontWeight:"bold",fontSize:18}}>Delivery Charges:</span>
        <span style={{fontWeight:"bold",fontSize:18,marginLeft:"auto"}}>&#8377;{0}</span>
      </div>

      <Divider />

      <div style={{padding:10,display:"flex",alignItems:"center",width:380}}>
        <span style={{fontWeight:"bold",fontSize:18}}>Final Amount:</span>
        <span style={{fontWeight:"bold",fontSize:18,marginLeft:"auto"}}>&#8377;{netamount-savings}</span>
      </div>

      <div style={{padding:10,display:"flex",alignItems:"center",width:380}}>
        <Button onClick={handleProceed} variant="contained" fullWidth style={{background:"black",color:"white",fontWeight:"bold",fontSize:18}}>Proceed</Button>
      </div>

    </Box>
  );
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////MY MENU/////////////////////////////////////////////////////////////////////////////////////////
  const [anchorElM, setAnchorElM] = React.useState(null);
  const mopen = Boolean(anchorElM);
  const handlemClick = (event) => {
    setCategoryId(event.currentTarget.value)
    setAnchorElM(event.currentTarget);
    fetchAllSubCategories(event.currentTarget.value)
  };
  const handlemClose = () => {
    setAnchorElM(null);
  };

  const handleMenuClick = (sid) => {
    props.history.push({ pathname: "/ProductList" }, { subcategoryid: sid })
  }

  function subMenu() {
    return (
      <div>
        <Menu
          anchorEl={anchorElM}
          open={mopen}
          onClose={handlemClose}
          onClick={handlemClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {listSubCategory.map((item) => {
            return (
              <MenuItem onClick={() => handleMenuClick(item.subcategoryid)}>
                <img src={`${ServerURL}/images/${item.icon}`} width="20" style={{ marginRight: 10 }} />
                {item.subcategoryname}
              </MenuItem>
            )
          })}
        </Menu>
      </div>
    );
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const fetchAllCategory = async () => {
    var result = await getData("category/displayallcategory")
    setCategoryList(result.data)
  }

  const fetchAllSubCategories = async (cid) => {
    var body = { categoryid: cid }
    var result = await postData("subcategory/displayallsubcategorybycategory", body)
    setListSubCategory(result.data)
  }

  useEffect(function () {
    fetchAllCategory()
  }, [])

  const mainMenu = () => {
    return categoryList.map((item, index) => {
      return (index <= 3 ? <Button value={item.categoryid} onClick={handlemClick} style={{ color: "#000", fontWeight: "bold", marginLeft: 30, fontSize: 18 }}>
        {item.categoryname}</Button> : <></>)
    })
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={keys.length} color="error">
            <ShoppingCart onClick={toggleDrawer('right', true)} />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: "#FFF" }} position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="default"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <img
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            src="/logo.jpg"
            width="150"
          />

          {mainMenu()}
          {subMenu()}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="default">
              <Badge badgeContent={keys.length} color="error">
                <ShoppingCart onClick={toggleDrawer('right', true)} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="default"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="default"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

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

    </Box>
  );
}
