import React from 'react';
import GoogleMap from '../../components/GoogleMap';

const MapCard = ({ name, ...rest }) => {
  return (
    <div className="card bg-gradient-primary">
      <div className="card-header border-0">
        <h3 className="card-title">
          <i className="fas fa-map-marker-alt mr-1"></i>
          {name}
        </h3>
        <div className="card-tools">
          <button 
            type="button"
            className="btn btn-primary btn-sm"
            data-card-widget="collapse"
            data-toggle="tooltip"
            title="Collapse"
          >
            <i className="fas fa-minus"></i>
          </button>
        </div>
      </div>
      <div className="card-body">
        <GoogleMap latitude={14.952984} longitude={102.164583} zoom={16} />
      </div>
    </div>
  );
};

export default MapCard;
