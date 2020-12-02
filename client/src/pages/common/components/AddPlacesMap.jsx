import React from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapboxGl, { ZoomControl, Marker, Popup } from 'react-mapbox-gl';
import API from '../../../utils/API';
import 'mapbox-gl/dist/mapbox-gl.css';
// import './Maps.css';
import Button from '@material-ui/core/Button';

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_API_KEY
});
const mapStyle = {
    height: '100vh',
    width: '100vw'
}
const sidebarStyle = {
    display: "inline-block",
    position: "absolute",
    top: 0,
    left: 0,
    margin: "12px",
    backgroundcolor: "#404040",
    color: "#ffffff",
    zindex: 1,
    padding: "6px",
}
const Markers = props => (
    props.markers.map((marker, index) =>
        <Marker
        // {...props}
        // key={index}
        // title={marker.name}
        // name={index}
        // // position={{ lat: marker.lat, lng: marker.lng }}
        // onClick={props.onMarkerClick}
        />
    )
)
class AddPlacesMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            center: [-122.431297, 37.773972],
            bounds: [-122.517910874663, 37.6044780500533, -122.354995082683, 37.8324430069081],
            position: null,
            markers: [],
            // markerPosition: {},
            lng: -122.431297,
            lat: 37.773972,
            showingPopup: false,
            activeMarker: {},
            selectedPlace: {},
            // value: ""
        }
        this.onMapClicked = this.onMapClicked.bind(this);
    }
    // onSubmit(e) {
    //     e.preventDefault();
    // }

    // handleChange(event) {
    //     this.setState({ value: event.target.value });
    // }

    // saveMarker() {
    //     let newWayPoint = {
    //         name: this.state.value,
    //         // lat: this.state.markerPosition.lat,
    //         // lng: this.state.markerPosition.lng,
    //     };
    //     this.setState({ markers: [...this.state.markers, newWayPoint], });
    //     console.log('these are markers', this.state.markers);
    // };
    // Remember to filter out duplicate markers in final submit button function
    // Validation in form for the name of location
    // deleteMarker() {
    //     this.setState({
    //         // markerPosition: [0, 0]
    //     })
    //     let arr = this.state.markers
    //     arr.pop()
    //     this.setState({ markers: arr })
    // }

    onMapClicked(props, Map, e) {
        // console.log('hello')
        console.log(e.lngLat);
        this.setState({
            lng: e.lngLat.lng,
            lat: e.lngLat.lat,
        })

        // console.log('I am the marker position', this.state.markerPosition);
    }
    // onMarkerClick = (props, marker, e) => {
    //     console.log(props)
    //     this.setState({
    //         selectedPlace: props,
    //         activeMarker: marker,
    //         showingPopup: true
    //     });
    // }
    // onPopupClose = () => {
    //     // console.log('onPopupClose')
    //     this.setState({
    //         activeMarker: null,
    //         showingPopup: false
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
                <div>
                    <div className="sidebarStyle">
                        <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                    </div>
                </div>

                <div>
                    <Map style="mapbox://styles/mapbox/dark-v10"
                        containerStyle={mapStyle}
                        center={this.state.center}
                        maxBounds={this.state.bounds}
                        onClick={this.onMapClicked}
                    >
                        <ZoomControl />
                        {
                            this.state.markerPosition ?
                                <Marker position={{ lng: -122.431297, lat: 37.773972 }} draggable={true} name={'Current location'} />
                                : null
                        }
                        <Markers
                            onMarkerClick={this.onMarkerClick}
                            markers={this.state.markers}
                        />
                        {/* <Popup
                            marker={this.state.activeMarker}
                            onClose={this.onPopupClose}
                            visible={this.state.showingPopup}
                        >
                        </Popup> */}
                    </Map>
                </div>
            </div>


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
