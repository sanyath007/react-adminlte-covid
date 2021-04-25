import React from 'react';
import { Link } from 'react-router-dom';
import LoggedInMenuItem from './LoggedInMenuItem';
import { useSelector } from 'react-redux';
import NotificationsMenuItem from './NotificationsMenuItem';
import MessagesMenuItem from './MessagesMenuItem';
import SearchFormMenu from './SearchFormMenu';

const MainHeader = () => {
  const { auth } = useSelector(state => state.auth);

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars"></i></a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/" className="nav-link">หน้าหลัก</Link>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/develper" className="nav-link">เกี่ยวกับผู้พัฒนา</Link>
        </li>
      </ul>

      {/* SEARCH FORM */}
      {/* <SearchFormMenu /> */}

      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Messages Dropdown Menu */}
        {/* <MessagesMenuItem /> */}

        {/* Notifications Dropdown Menu */}
        {/* <NotificationsMenuItem /> */}

        {/* User logged in */}
        {auth && <LoggedInMenuItem user={auth} />}

        {/* <li className="nav-item">
          <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
            <i className="fas fa-th-large"></i>
          </a>
        </li> */}
      </ul>
    </nav>
  );
};

export default MainHeader;
