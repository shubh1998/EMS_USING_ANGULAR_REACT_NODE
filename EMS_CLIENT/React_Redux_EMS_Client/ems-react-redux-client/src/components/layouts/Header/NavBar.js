import { AppBar, makeStyles, Paper, Toolbar, Typography, useMediaQuery } from '@material-ui/core'
import Footer from '../Footer/Footer'
// import NavBarUsingMenus from './NavBarTypesForMobileView/NavBarUsingMenus'
import NavbarForDesktopView from './NavbarForDesktopView/NavbarForDesktopView'
import NavBarUsingDrawer from './NavBarTypesForMobileView/NavBarUsingDrawer'

const useStyle = makeStyles((theme)=>({
    marginLeftAuto: {
        marginLeft: "auto",
    }
}))

const NavBar = ( { children } ) => {
    const classes = useStyle();
    const isMobileView = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
     <Paper style={{height: "100vh"}}>
         <AppBar position="static">
            <Toolbar>
            <Typography variant="h6">
                Employee Management System
            </Typography>
            <div className={classes.marginLeftAuto}>
                {
                    isMobileView ? 
                    (
                        // Using Menu tag Create Responsive Navbar Options
                        // <NavBarUsingMenus />

                        // Using Drawer Create Responsive Navbar Options
                        <NavBarUsingDrawer />
                    )
                    :
                    (
                      <NavbarForDesktopView />  
                    )
                }
            </div>
            </Toolbar>
        </AppBar>

        { children }
        
        <Footer />
     </Paper>
    )
}

export default NavBar;
