import { Divider, IconButton, Menu, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import { Fragment } from 'react'
import { useHistory } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu'
import { NavbarOptions, navBarOptionsWhenUserLoggedIn, navBarOptionsWithoutLogIn } from "../NavbarOptions"
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../../../redux-thunk/thunk/User';

const NavBarUsingMenus = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoggedInStatus = useSelector(state => state.userReducer.isLoggedin)   

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = (route) => {
        setAnchorEl(null);
         if (route === "/logout") {
            dispatch(userLogout())
            history.push("/");
         } else {
           history.push(route);
         }
    };

    return (
        <Fragment>
            <IconButton 
                 edge="start" 
                 color="inherit" 
                 aria-label="menu"
                 onClick={ handleMenu }
             >
                 <MenuIcon />
             </IconButton>
             <Menu
                 id="menu-appbar"
                 anchorEl={anchorEl}
                 anchorOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                 }}
                 transformOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                 }}
                 open={open}
                 onClose={() => setAnchorEl(null)}
             >
                 {
                     isLoggedInStatus ?
                     navBarOptionsWhenUserLoggedIn.map(menuOptions => (
                         <div key={ menuOptions.key }>
                             <MenuItem onClick={() => handleClose(menuOptions.path) }>{ menuOptions.label }</MenuItem>
                             <Divider/>
                         </div>
                     )) :
                     navBarOptionsWithoutLogIn.map(menuOptions => (
                         <div key={ menuOptions.key }>
                             <MenuItem onClick={() => handleClose(menuOptions.path) }>{ menuOptions.label }</MenuItem>
                             <Divider/>
                         </div>
                     ))
                 }
             </Menu>
         </Fragment>
    )
}

export default NavBarUsingMenus