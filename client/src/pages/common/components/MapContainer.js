import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '90%',
  height: '90%'
};

export class MapContainer extends Component {

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={13.58}
        style={mapStyles}
        initialCenter={
          {
            // Center on San Francisco
            lat: 37.771350,
            lng: -122.4285544
          }
        }
      >
      </ Map>
    );
    }
  }

export default GoogleApiWrapper({
  // This needs to be hidden before uploading to github
  apiKey: 'AIzaSyB0NkbKq8751dknGj-uANE-XYHGMBzqY2o'
})(MapContainer);