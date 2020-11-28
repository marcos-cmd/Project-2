import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import API from '../../../utils/API';
import axios from 'axios';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

// const Markers = props => (
//     props.markers.map((marker, index) =>
//         <Marker
//             {...props}
//             key={index}
//             title={marker.name}
//             name={index}
//             position={{ lat: marker.lat, lng: marker.lng }}
//             onClick={props.onMarkerClick}
//         />
//     )
// );

class AddLocationMapBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -122.431297,
            lat: 37.773972,
            zoom: 12,
            bounds: [-122.517910874663, 37.6044780500533, -122.354995082683, 37.8324430069081],
            markers: [],
            markerPoint: { lat: "", lng: "" },
        };
    }

    // .bind the state here


    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
            maxBounds: this.state.bounds
        });



        map.on('click', (e) => {
            const coords = `lat: ${e.lngLat.lat} <br> lng: ${e.lngLat.lng}`;
            console.log(coords);
            new mapboxgl.Marker()
                .setLngLat(e.lngLat)
                .addTo(map);
        });

    }

    // saveMarker() {
    //     let newWayPoint = {
    //         name: this.state.value,
    //         lat: this.state.markerPosition.lat,
    //         lng: this.state.markerPosition.lng,
    //     };
    //     this.setState({ markers: [...this.state.markers, newWayPoint], });
    //     console.log('these are markers', this.state.markers);
    // };

    // Remember to filter out duplicate markers in final submit button function
    // Validation in form for the name of location

    // deleteMarker() {
    //     this.setState({
    //         markerPosition: { lat: "", lng: "" }
    //     })
    //     let arr = this.state.markers
    //     arr.pop()
    //     this.setState({ markers: arr })
    // }

    // onMapClicked(props, map, e) {
    //     // console.log('hello')
    //     if (this.state.showingInfoWindow)
    //         this.setState({
    //             activeMarker: null,
    //             showingInfoWindow: false
    //         });
    //     let location = { lat: 0, lng: 0 };
    //     location.lat = e.latLng.lat();
    //     location.lng = e.latLng.lng();

    //     this.setState({
    //         markerPosition: location
    //     })
    //     console.log('I am the marker position', this.state.markerPosition);
    // }

    // onMarkerClick = (props, marker, e) => {
    //     console.log(props)
    //     this.setState({
    //         selectedPlace: props,
    //         activeMarker: marker,
    //         showingInfoWindow: true
    //     });
    // }

    // onInfoWindowClose = () => {
    //     // console.log('onInfoWindowClose')
    //     this.setState({
    //         activeMarker: null,
    //         showingInfoWindow: false
    //     });
    // }

    // submitLocations = () => {
    //     this.state.markers.map(async marker => {
    //         const name = marker.name;
    //         const latitude = marker.lat;
    //         const longitude = marker.lng;

    //         try {
    //             const res = await axios.post('/api/locations', { name, latitude, longitude }, { headers: { authorization: localStorage.getItem('token') } })
    //             console.log('this is res', res);
    //         } catch (error) {
    //             throw new Error(error);
    //         }
    //     })

    // };

    render() {
        return (
            <div>
                <div className='sidebarStyle'>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                </div>
                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        )
    }
};

export default AddLocationMapBox;
