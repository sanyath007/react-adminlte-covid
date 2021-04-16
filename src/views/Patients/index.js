import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

const Patients = (props) => {
  const { url } = useRouteMatch();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">

          <Switch>
            {props.routes.map((route, idx) => {
              console.log(`${url}${route.path}`);
              return (
                <Route key={idx} exact path={`${url}${route.path}`} render={(props => <route.component {...props} />)} />
              )
            })}
            <Redirect to="/404" />
          </Switch>

        </div>
      </div>
    </div>
  );
};

export default Patients;
