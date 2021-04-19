import React from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMap = ({ latitude, longitude, zoom }) => {
  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: "Me Here"
    });

    return marker;
  };

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultZoom={zoom}
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      >
        {/* // TODO: Any some component to render inside map */}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
