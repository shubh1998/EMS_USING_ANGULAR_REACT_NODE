import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/layouts/Header/NavBar';

const RouteValidator = ({hasNavbar, component: Component }) => {
    
    if (hasNavbar) {
        return (
            <Fragment>
                <NavBar>
                    <Component />
                </NavBar>
            </Fragment>
        );
    }
    return <Component />
}

RouteValidator.propTypes = {
  component: PropTypes.func.isRequired,
  hasNavbar: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
}

export default RouteValidator
