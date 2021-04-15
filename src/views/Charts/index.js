import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

const Charts = (props) => {
    console.log(props);
    return (
        <Switch>
            {props.routes.map((route, idx) => (
                <Route key={idx} path={route.path} render={(props => <route.component {...props} />)} />
            ))}
        </Switch>
    );
};

export default Charts;
