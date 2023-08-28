import React,{useEffect,useState} from "react";
import {ShoppingCartOutlined} from '@mui/icons-material';
import {Avatar,Button} from '@mui/material';

export default function ShoppingCartComponent(props) {

     const [value,setValue]=useState(props.value)

     const handleMinus=()=>{
        var c=value-1
        if(c>=0)
        setValue(c)

        props.onChange(c)
     }

     const handlePlus=()=>{
        var c=value+1
        setValue(c)

        props.onChange(c)
     }

     const handleClick=()=>{
            var c=value+1
            setValue(c)

            props.onChange(c)
     }

      return(<div>
          {value==0?<Button style={{width:250,background:"#000",color:"#fff"}} onClick={()=>handleClick()} variant="contained" endIcon={<ShoppingCartOutlined />}>
  Add to cart
</Button>:
          <div style={{display:"flex",alignItems:"center"}}>
                 <Avatar onClick={()=>handleMinus()} sx={{fontSize:20,fontWeight:"bold",background:"#000",color:"#fff",marginRight:3 }} variant="rounded">
                     -
      </Avatar>
      <div style={{fontSize:20,fontWeight:"bold"}}>{value}</div>
      <Avatar onClick={()=>handlePlus()} sx={{fontSize:20,fontWeight:"bold",background:"#000",color:"#fff",marginLeft:3 }} variant="rounded">
                     +
      </Avatar>
          </div>
           }
          </div>
      )
}