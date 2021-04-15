import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Charts = (props) => {
    console.log(props);
    return (
        <Switch>
            {props.routes.map((route, idx) => (
                <Route key={idx} path={route.path} render={(props => <route.component {...props} />)} />
            ))}
            <Redirect to="/404" />
        </Switch>
    );
};

export default Charts;
