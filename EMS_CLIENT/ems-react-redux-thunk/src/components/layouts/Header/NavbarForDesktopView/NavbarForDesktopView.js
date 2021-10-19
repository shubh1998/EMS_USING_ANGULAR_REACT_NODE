import { Button, makeStyles } from '@material-ui/core';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { navBarOptionsWhenUserLoggedIn, navBarOptionsWithoutLogIn } from "../NavbarOptions"
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../../../redux-thunk/thunk/User';

const useStyle = makeStyles((theme) => ({
  inActiveOption: {
    color: theme.palette.common.white,
    textDecoration: "none",
    paddingLeft: 10,
  },
  activeOption: {
    color: "yellow !important",
    paddingLeft: "10px !important",
  },
  'a:hover': {
      color: "yellow !important",
  }
}));

const NavbarForDesktopView = () => {
    const classes = useStyle();
    const dispatch = useDispatch()

    const isLoggedInStatus = useSelector(state => state.userReducer.isLoggedin)
    
    const history = useHistory()
    const handleClick = () => {
        dispatch(userLogout())
        history.push('/')
    }

    return (
        <Fragment>
            {
                isLoggedInStatus ? 
                navBarOptionsWhenUserLoggedIn.map(route => (
                   <Fragment key={route.key}>
                        {
                            route.path === '/logout' ?
                                <Button key={route.key} color="inherit" size="medium" variant="outlined" onClick={handleClick} style={{marginLeft: '10px'}}>
                                    { route.label }
                                </Button>
                            :
                                <NavLink to={ `${route.path}` } className={classes.inActiveOption} activeClassName={classes.activeOption} exact key={route.key}>
                                    <Button color="inherit" size="medium" variant="outlined">
                                        { route.label }
                                    </Button>
                                </NavLink>
                        }
                   </Fragment>
                ))
                :
                navBarOptionsWithoutLogIn.map(route => (
                    <NavLink to={ `${route.path}` } className={classes.inActiveOption} activeClassName={classes.activeOption} exact key={route.key}>
                        <Button color="inherit" size="medium" variant="outlined">
                            { route.label }
                        </Button>
                    </NavLink>
                ))
            }
        </Fragment>
    )
}

export default NavbarForDesktopView
