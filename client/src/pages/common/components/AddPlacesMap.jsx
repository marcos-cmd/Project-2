import React from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import API from '../../../utils/API';
import 'mapbox-gl/dist/mapbox-gl.css';
// import './Maps.css';
import Button from '@material-ui/core/Button';

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_API_KEY
});
class AddPlacesMap extends React.Component {

    render() {
        return (
            <Map style="mapbox://styles/mapbox/streets-v8"
                containerStyle={{
                    height: '100vh',
                    width: '100vw'
                }} />
        )

    }
}


// class AddPlacesMap extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             lng: -122.431297,
//             lat: 37.773972,
//             markers: [],
//             markerPosition: { lat: "", lng: "" },
//             activeMarker: {},
//             selectedPlace: {},
//             value: "",
//         };
//     }

// handleChange(event) {
//     this.setState({ value: event.target.value })
// }

// saveMarker() {
//     let newWayPoint = {
//         name: this.state.value,
//         lat: this.state.lat,
//         lng: this.state.lng,
//     };
//     this.setState({ markers: [...this.state.markers, newWayPoint], });
//     // console.log('these are markers', this.state.markers);
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

// this function creates the markers and the popups 
// onMapClicked((props, map, e) => {
//     if (this.state.showingInfoWindow)
//         this.setState({
//             activeMarker: null,
//             showingInfoWindow: false
//         })
//     let location = { lat: 0, lng: 0 };
//     location.lat = e.latLng.lat();
//     location.lng = e.latLng.lng();
//     const popup = new mapboxgl.Popup()
//     // .setHTML(`<div><h1>${coord.name}</h1><br /><h2>${coord.address}</h2><br/><p>${coord.link}</p></div>`)
//     const marker = new mapboxgl.Marker()
//         .setLngLat([location.lng, location.lat])
//         .setPopup(popup)
//         .addTo(map);
// });


// componentDidMount() {
//     // This function creates the map for the component to render later
//     map = new mapboxgl.Map({
//         container: this.mapContainer,
//         style: 'mapbox://styles/mapbox/dark-v10',
//         center: [-122.431297, 37.773972],
//         zoom: 12,
//         maxBounds: [-122.517910874663, 37.6044780500533, -122.354995082683, 37.8324430069081],
//     });

// This function controls the top sidebar, sharing the user's coordinates and zoom
// map.on('move', () => {
//     this.setState({
//         lng: map.getCenter().lng.toFixed(4),
//         lat: map.getCenter().lat.toFixed(4),
//         zoom: map.getZoom().toFixed(2)
//     });
// });
// };
// // The rendering of the following containers requires the css file, to render properly
// render() {
//     return (
//         <div>

{/* <div className='sidebarStyle'>
            </div>
            <div className='toolboxStyle'>
                <form>
                    <input
                        placeholder={"Name this Location"}
                        type="text"
                        className="formStyle"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </form>
                <br />
                <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                <br />
                <Button variant="contained" color="primary" onClick={this.saveMarker}>Save marker</Button>
                <Button variant="contained" color="secondary" onClick={this.deleteMarker}>delete</Button>
                <Button variant="contained" color="purple" onClick={this.submitLocations}>Submit All Locations</Button>
            </div> */}
{/* <div
                ref={el => this.mapContainer = el}
                className='mapContainer'
                {...this.props}
//                 onClick={this.onMapClicked} /> */}
//         </div>
//     )
// }
// };



export default AddPlacesMap;
