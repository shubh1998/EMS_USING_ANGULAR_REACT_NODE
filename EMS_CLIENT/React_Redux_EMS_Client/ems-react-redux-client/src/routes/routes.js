import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routerList";
import RouteValidator from "./RouteValidator";

const CustomRoutes = () => (
  <Fragment>
    <Switch>
      {routes.map(({ path, key, ...props }) => (
        <Route
          path={path}
          key={key}
          exact={true}
          render={() => <RouteValidator path={path} {...props} />}
        />
      ))}
    </Switch>
  </Fragment>
);

export default CustomRoutes;
