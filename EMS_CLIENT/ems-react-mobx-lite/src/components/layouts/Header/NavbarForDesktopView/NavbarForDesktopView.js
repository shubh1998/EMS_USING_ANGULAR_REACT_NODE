import { Button, makeStyles } from '@material-ui/core';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { navBarOptionsWhenUserLoggedIn, navBarOptionsWithoutLogIn } from "../NavbarOptions"
import { useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useAppStoreContext } from '../../../../store-config/hooks/useAppStoreContext';
import { logoutRequest } from '../../../../utils/services/user.service';

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

export const NavbarForDesktopView = observer(() => {
    const classes = useStyle();
    const { login } = useAppStoreContext()
    const history = useHistory()
    const handleClick = () => {
        const result = logoutRequest()
        if(result){
            login.setLoggedIn(false)
            localStorage.clear();
            history.push('/')
        }
    }

    return (
        <Fragment>
            {
                login.loggedIn ? 
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
})
