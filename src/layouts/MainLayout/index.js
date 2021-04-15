import React from 'react'
import { Link, Redirect, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import routes from '../../routes';
import AppHeader from '../MainHeader';
import AppSidebar from '../MainSidebar';
import AppFooter from '../MainFooter';

const MainLayout = () => {
  /** Get the current route from location */
  const location = useLocation();
  const currentRoute = routes.find(rt => rt.path === location.pathname);
  console.log(useRouteMatch());
  return (
    <div className="wrapper">
      <AppHeader />

      <AppSidebar />

      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">

        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">{currentRoute ? currentRoute?.name : 'NotFound'}</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                  <li className="breadcrumb-item active">{currentRoute ? currentRoute?.name : 'NotFound'}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <section className="content">

          <Switch>
            {/* {!currentRoute && <Redirect to="/404" />} */}

            {routes.map((route, idx) => {
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => <route.component routes={route.routes} {...props} />}
                />
              ) : (null);
            })}
          </Switch>

        </section>

      </div>

      <AppFooter />

    </div>
  );
};

export default MainLayout;
