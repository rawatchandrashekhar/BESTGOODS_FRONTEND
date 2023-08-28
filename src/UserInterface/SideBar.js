import React, { useEffect, useState, createRef } from "react";
import { makeStyles } from "@mui/styles";
import { getData } from "../FetchNodeServices";
import { Paper, Divider, Box,Checkbox } from "@mui/material";
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { KeyboardArrowUp } from "@mui/icons-material";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function SideBar(props) {
    const [value1, setValue1] = useState([1500, 5000]);
    const [value, setValue] = useState(false);
    const [value2, setValue2] = useState(false);
    const [value3, setValue3] = useState(false);
    const [state, setState] = useState(false)
    const [state1, setState1] = useState(false)
    const [state2, setState2] = useState(false)
    const [listCompany, setListCompany] = useState([])

    const fetchAllCompanies = async () => {
        var result = await getData('company/displayallcompany')
        setListCompany(result.data)
    }

    useEffect(function () {
        fetchAllCompanies()
    }, [])

    function subMenu() {
        return (
            <div>
                <RadioGroup
                    aria-label="Discount"
                    defaultValue="discount"
                    name="radio-buttons-group"
                >
                    {listCompany.map((item) => {
                        return (
                            <FormControlLabel value={item.companyname} control={<Radio />} label={item.companyname} />
                        )
                    })}
                </RadioGroup>
            </div>
        );
    }

    const minDistance = 10;
    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };
    const handleClick = () => {
        setValue(!value)
        setState(!state)
    }
    const handleClick1 = () => {
        setValue2(!value2)
        setState1(!state1)
    }
    const handleClick2= () => {
        setValue3(!value3)
        setState2(!state2)
    }
    const handleArrowClick = () => {
        setValue3(!value3)
        setState2(!state2)
        fetchAllCompanies()
    }
    return (

        <div style={{position: '-webkit-sticky',position:'sticky',top:100,left:10,bottom:0,right:0,zIndex:5}}>
            <Paper style={{ background: '#fff', width: 250, height: 'auto' }} elevation={2}>
                <div style={{ fontWeight: 'bold', height: 30, padding: 10, letterSpacing: 1 }}>
                    Filters
                </div>
                <Divider />
                <div style={{padding: 10 }}>
                    <Slider
                        getAriaLabel={() => 'Minimum distance'}
                        value={value1}
                        onChange={handleChange1}
                        valueLabelDisplay="auto"
                        disableSwap
                        min={1000}
                        max={10000}
                    />
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <div style={{fontSize:12}}>Min<br />1000</div>
                        <div style={{ marginLeft: 150,fontSize:12}}>Max<br />10000</div>
                    </div>
                </div>
                <Divider />
                <div style={{ padding: 10 }}>
                    <FormControl component="fieldset">
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <FormLabel component="legend" style={{ fontWeight: 'bold',fontSize:15 }}>Sort By</FormLabel>
                            {state ? <KeyboardArrowUp style={{ marginLeft: 135 }} onClick={() => handleClick()} /> : <KeyboardArrowDownIcon style={{ marginLeft: 135 }} onClick={() => handleClick()} />}
                        </div>
                        {value ? <div>
                            <RadioGroup
                                aria-label="Sort By"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="ltoh" control={<Radio />} label="Low to High" />
                                <FormControlLabel value="htol" control={<Radio />} label="High to Low" />
                                <FormControlLabel value="oton" control={<Radio />} label="Oldest to Newest" />
                                <FormControlLabel value="ntoo" control={<Radio />} label="Newest to Oldest" />
                            </RadioGroup></div> : null
                        }
                    </FormControl>
                </div>
                <Divider />
                <div style={{ padding: 10 }}>
                    <FormControl component="fieldset">
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <FormLabel component="legend" style={{ fontWeight: 'bold',fontSize:15 }}>Discount</FormLabel>
                            {state1 ? <KeyboardArrowUp style={{ marginLeft: 125 }} onClick={() => handleClick1()} /> : <KeyboardArrowDownIcon style={{ marginLeft: 125 }} onClick={() => handleClick1()} />}
                        </div>
                        {value2 ? <div>
                            <RadioGroup
                                aria-label="Discount"
                                defaultValue="discount"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="40" control={<Radio />} label="40% or more" />
                                <FormControlLabel value="30" control={<Radio />} label="30% or more" />
                                <FormControlLabel value="20" control={<Radio />} label="20% or more" />
                                <FormControlLabel value="10" control={<Radio />} label="10% or more" />
                            </RadioGroup></div> : null
                        }
                    </FormControl>
                </div>
                <Divider />
                <div style={{ padding: 10 }}>
                    <FormControl component="fieldset">
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <FormLabel component="legend" style={{ fontWeight: 'bold',fontSize:15 }}>Companies</FormLabel>
                            {state2 ? <KeyboardArrowUp style={{ marginLeft: 108 }} onClick={() => handleArrowClick()} /> : <KeyboardArrowDownIcon style={{ marginLeft: 108 }} onClick={() => handleClick2()} />}
                        </div>
                        {value3 ? <div>{subMenu()}</div> : null}
                    </FormControl>
                </div>
                <Divider />
                <div >
                   <div style={{ fontWeight: 'bold',padding: 10, letterSpacing: 1,fontSize:15 }}>Availability</div>
                   <Checkbox {...label} />In Stock
                </div>
            </Paper>
        </div>

    )
}