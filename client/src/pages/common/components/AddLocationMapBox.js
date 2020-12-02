import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import API from '../../../utils/API';


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

const popupHtml =
    `<div>
        <form>
            <input
                placeholder={"Name this location"}
                type="text"
                value={value}
                onChange={}>
            </input>
        </form>
        <button onClick={}>
            Save Marker
        </button>
    </div>`

const AddLocationMapBox = () => {
    const [map, setMap] = useState(null);
    const [currentMarkers, setCurrentMarkers] = useState(null);
    const [value, setValue] = useState(null);
    const mapContainer = useRef(null);
    // const currentMarkers = [];

    // function handleChange({
    //     setValue()
    // });

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

        // Create the map
        const initializeMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/dark-v10',
                center: [-122.431297, 37.773972],
                zoom: 12,
                maxBounds: [-122.517910874663, 37.6044780500533, -122.354995082683, 37.8324430069081],
            });
            map.on('load', () => {
                setMap(map);
                map.resize();
            });
            map.on('click', (e) => {
                // const coords = `lat: ${e.lngLat.lat} <br> lng: ${e.lngLat.lng}`;
                // console.log(coords);
                const popup = new mapboxgl.Popup()
                    .setHTML(popupHtml)
                const newMarker = new mapboxgl.Marker({
                    draggable: true
                })
                    .setLngLat(e.lngLat)
                    .setPopup(popup)
                    .addTo(map);

            });
        };

        if (!map) initializeMap({ setMap, mapContainer });

        // const addNewMarker = ({ setCurrentMarkers, currentMarkers }) => {

        // Marker.on('dragend', (e) => {
        //     setCurrentMarkers(currentMarkers.push(newMarker));
        // });
        // });
        // if (!newMarker) addNewMarker({ setMarker, currentMarkers });
    }, [map]);




    return (
        <div>
            <div className='sidebarStyle'>
                <div>
                    This is the Legend
                </div>
                {/* <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div> */}
            </div>
            <div ref={el => (mapContainer.current = el)} className='mapContainer' />
        </div>
    )
}
export default AddLocationMapBox;

// class AddLocationMapBox extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             lng: ,
//             lat: ,
//             zoom: ,
//             bounds: 
//             markers: [],
//             markerPoint: { lat: "", lng: "" },
//         };
//     }

//     // .bind the state here




//         // Create new marker when you click the map

//         marker.on('click', () => {

//         })




//     // saveMarker() {
//     //     let newWayPoint = {
//     //         name: this.state.value,
//     //         lat: this.state.markerPosition.lat,
//     //         lng: this.state.markerPosition.lng,
//     //     };
//     //     this.setState({ markers: [...this.state.markers, newWayPoint], });
//     //     console.log('these are markers', this.state.markers);
//     // };

//     // Remember to filter out duplicate markers in final submit button function
//     // Validation in form for the name of location

//     // deleteMarker() {
//     //     this.setState({
//     //         markerPosition: { lat: "", lng: "" }
//     //     })
//     //     let arr = this.state.markers
//     //     arr.pop()
//     //     this.setState({ markers: arr })
//     // }

//     // onMapClicked(props, map, e) {
//     //     // console.log('hello')
//     //     if (this.state.showingInfoWindow)
//     //         this.setState({
//     //             activeMarker: null,
//     //             showingInfoWindow: false
//     //         });
//     //     let location = { lat: 0, lng: 0 };
//     //     location.lat = e.latLng.lat();
//     //     location.lng = e.latLng.lng();

//     //     this.setState({
//     //         markerPosition: location
//     //     })
//     //     console.log('I am the marker position', this.state.markerPosition);
//     // }

//     // onMarkerClick = (props, marker, e) => {
//     //     console.log(props)
//     //     this.setState({
//     //         selectedPlace: props,
//     //         activeMarker: marker,
//     //         showingInfoWindow: true
//     //     });
//     // }

//     // onInfoWindowClose = () => {
//     //     // console.log('onInfoWindowClose')
//     //     this.setState({
//     //         activeMarker: null,
//     //         showingInfoWindow: false
//     //     });
//     // }

//     // submitLocations = () => {
//     //     this.state.markers.map(async marker => {
//     //         const name = marker.name;
//     //         const latitude = marker.lat;
//     //         const longitude = marker.lng;

//     //         try {
//     //             const res = await axios.post('/api/locations', { name, latitude, longitude }, { headers: { authorization: localStorage.getItem('token') } })
//     //             console.log('this is res', res);
//     //         } catch (error) {
//     //             throw new Error(error);
//     //         }
//     //     })

//     // };

//     render() {
//         return 
//     }
// };

// export default AddLocationMapBox;
