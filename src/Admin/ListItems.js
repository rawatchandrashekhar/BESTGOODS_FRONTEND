import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Divider from '@mui/material/Divider';
import DisplayAllCategories from "./DisplayAllCategories"
import DisplayAllSubCategories from "./DisplayAllSubCategories"
import DisplayAllCompanies from "./DisplayAllCompanies"
import DisplayAllProducts from "./DisplayAllProducts"
import DisplayAllModels from "./DisplayAllModels"
import DisplayAllColors from "./DisplayAllColors"
import DisplayAllFinalProducts from "./DisplayAllFinalProducts"
import DisplayAllBanners from './DisplayAllBanners';

export default function ListItems(props){ 

const handleClick=(view)=>{
  props.setComponent(view)
}

return(
  <div>
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" onClick={()=>handleClick(<DisplayAllCategories setComponent={props.setComponent}/>)}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Sub-Categories" onClick={()=>handleClick(<DisplayAllSubCategories setComponent={props.setComponent}/>)}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Companies" onClick={()=>handleClick(<DisplayAllCompanies setComponent={props.setComponent}/>)}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Products" onClick={()=>handleClick(<DisplayAllProducts setComponent={props.setComponent}/>)}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Models" onClick={()=>handleClick(<DisplayAllModels setComponent={props.setComponent}/>)}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Colors" onClick={()=>handleClick(<DisplayAllColors setComponent={props.setComponent}/>)}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Final Products" onClick={()=>handleClick(<DisplayAllFinalProducts setComponent={props.setComponent}/>)}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Banners" onClick={()=>handleClick(<DisplayAllBanners setComponent={props.setComponent}/>)}/>
    </ListItem>
  </div>
<Divider/>
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
  </div>
)
}