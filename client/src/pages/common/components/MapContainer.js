import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import API from '../../../utils/API';
const mapStyles = {
  width: '90%',
  height: '90%'
};

export class MapContainer extends Component {
  state = {
    coords: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    address: "",

  };

  onMarkerClick = (props, marker, e) => {
    console.log('this is props', props);
    this.setState({
      selectedPlace: props.selectedPlace,
      activeMarker: marker,
      showingInfoWindow: true,
      address: props.address.address
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  async componentDidMount() {
    const coords = await this.loadAPI();
    // console.log('I am coords', coords);
    let positionArray = []
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
    this.setState({ coords: positionArray })

    console.log('Position Array', positionArray);
  };

  loadAPI = async () => {
    return await API.search()
  };

  render() {
    return (
      <Map google={this.props.google}
        onClick={this.onMapClicked}>
        <Marker onClick={this.onMarkerClick}
          name={'Current location'} />

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

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
            <h3>{this.state.address}</h3>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);
