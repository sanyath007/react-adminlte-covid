import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const LeafletMap = ({ latitude, longitude, zoom }) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          Me here !!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
