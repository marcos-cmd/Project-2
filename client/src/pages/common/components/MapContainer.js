import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import API from '../../../utils/API';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';


const mapStyles = {

  width: '50%',
  height: '50%'
};

// This component is a map that displays Covid testing locations
export class MapContainer extends Component {
  state = {
    coords: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    address: "",
  };
  // This function sets the state so that an info window will display after the marker click
  onMarkerClick = (props, marker, e) => {
    console.log('this is props', props);
    this.setState({
      selectedPlace: props.selectedPlace,
      activeMarker: marker,
      showingInfoWindow: true,
      address: props.address.address
    });
  }
  // This function sets the state so that an info window will stop displaying after the map click
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
    return await API.search()
  };
  // The API request pulls coords from SF Database
  // Coords represent testing locations in SF
  // This function sets the coords into state
  async componentDidMount() {
    const coords = await this.loadAPI();
    // console.log('I am coords', coords);
    let positionArray = []
    // positionArray will become the empty array 'coords', 
    // which is waiting empty in state at this point
    coords.map(coordinate => positionArray.push(
      {
        lat: coordinate.point[1],
        lng: coordinate.point[0],
        id: coordinate.id,
        address: coordinate.address,
        name: coordinate.name,
        activeMarker: null,
        showingInfoWindow: false
      }));
    // this line sets position array as the array 'coords' in our state
    this.setState({ coords: positionArray })
  };



  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* // This map displays SF */}
        <Map google={this.props.google}
          onClick={this.onMapClicked}
          style={mapStyles}>

          {/* This function maps the coords array into individual markers on the map */}
          {this.state?.coords?.map((coord, index) => {
            // console.log('this is coord', coord);
            return <Marker
              key={index}
              onClick={this.onMarkerClick}
              position={{ lat: coord.lat, lng: coord.lng }}
              id={{ id: coord.id }}
              selectedPlace={{ name: coord.name }}
              address={{ address: coord.address }}>
            </Marker>
          })}
          {/* This Info Window displays the name and address of the selected testing site */}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
              <h3>{this.state.address}</h3>
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);
