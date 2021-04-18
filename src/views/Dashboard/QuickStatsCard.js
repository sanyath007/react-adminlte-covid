import React from 'react';
import {  Link }  from 'react-router-dom';

const QuickStatsCard = ({ bg, stat, name, icon, url, ...rest }) => {
  return (
    <div className={`small-box ${bg}`}>
      <div className="inner">
        <h3>{stat}</h3>

        <p>{name}</p>
      </div>
      <div className="icon">
        <i className={`ion ${icon}`}></i>
      </div>
      <Link to={url} className="small-box-footer">
        More info
        <i className="fas fa-arrow-circle-right ml-1"></i>
      </Link>
    </div>
  );
};

export default QuickStatsCard;
