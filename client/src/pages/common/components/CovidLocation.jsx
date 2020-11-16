import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import API from '../../../utils/API';
import { makeStyles } from '@material-ui/core/styles';

const mapStyles = {
  width: '50%',
  height: '50%',
  position: 'relative'

};


// This component is a map that displays locations users have inserted into our database
export class CovidLocation extends Component {
  state = {
    markers: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  // This function sets the state so that an info window will display after the marker click
  onMarkerClick = (props, marker, e) => {
    // console.log('this is props', props);
    this.setState({
      selectedPlace: props.selectedPlace,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  // This function sets the state so that an info window will stop display after the map click
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  // This function loads the API Request 
  loadAPI = async () => {
    return await API.newMarkers()
  };

  // The API request pulls markers from the database
  // The markers represent the places users have been
  // This function sets the markers into state
  async componentDidMount() {
    const markers = await this.loadAPI();
    console.log('I am markers', markers);
    this.setState({ markers })
  };

  render() {
    return (
      <div>
        {/* // This map displays San Francisco */}
        <Map google={this.props.google}
          onClick={this.onMapClicked}
          style={mapStyles}>

          {/* This function maps the markers in our database to display individual markers */}
          {this.state?.markers?.map((marker, index) => {
            console.log('this is marker', marker);
            return <Marker
              key={index}
              onClick={this.onMarkerClick}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              selectedPlace={{ name: marker.name }}
            >
            </Marker>
          })}
          {/* This info Window displays the name of the place a user has been */}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
              {/* <h3>{this.state.address}</h3> */}
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(CovidLocation);
