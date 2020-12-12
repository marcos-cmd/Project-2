import React from 'react';
import mapboxgl from 'mapbox-gl';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './TestSite.css';


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY

class AddPlacesMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // change to latitude and longitude
            lng: -122.431297,
            lat: 37.773972,
            markers: [],
            recentMarker: {},
            coordinates: { lat: "", lng: "" },
            value: "",
        };
        this.saveMarker = this.saveMarker.bind(this);
        this.deleteMarker = this.deleteMarker.bind(this);
        // this.onMarkerClick = this.onMarkerClick.bind(this);
        // this.onMapClicked = this.onMapClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    saveMarker() {
        let newMarker = {
            name: this.state.value,
            lat: this.state.lat,
            lng: this.state.lng,
        };
        this.setState({ recentMarker: newMarker });
        // console.log(newMarker);
        this.setState({ markers: [...this.state.markers, newMarker], });
        console.log('these are markers', this.state.markers);
    };

    submitLocations = () => {
        console.log('submitted');
        this.state.markers.map(async marker => {
            const name = marker.name;
            const latitude = marker.lat;
            const longitude = marker.lng;

            try {
                const res = await axios.post('/api/locations', { name, latitude, longitude }, { headers: { authorization: localStorage.getItem('token') } })
                console.log('this is res', res);
            } catch (error) {
                throw new Error(error);
            }
        })

    };

    // Remember to filter out duplicate markers in final submit button function
    // Validation in form for the name of location

    deleteMarker() {
        this.setState({
            coordinates: { lat: "", lng: "" }
        })
        let arr = this.state.markers
        arr.pop()
        this.setState({ markers: arr })
    }

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

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [-122.431297, 37.773972],
            zoom: 12,
            maxBounds: [-122.517910874663, 37.6044780500533, -122.354995082683, 37.8324430069081],
        });
        // This function controls the top sidebar, sharing the user's coordinates and zoom
        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
        const marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([-122.431297, 37.773972])
            .addTo(map);
        const onDragEnd = () => {
            const coordinates = marker.getLngLat();
            console.log(coordinates);
            this.setState({
                lat: coordinates.lat,
                lng: coordinates.lng
            })

        }
        marker.on('dragend', onDragEnd);
        const addMarker = () => {
            this.state.newMarker = new mapboxgl.Marker({
                draggable: true
            })
                .setLngLat([this.state.newMarker.lng, this.state.newMarker.lat])
                .addTo(map);
        }

    }

    // The rendering of the following containers requires the css file, to render properly
    render() {
        return (
            <div>
                <h2>ADD PLACES</h2>
                {/* <div className='sidebarStyle'>
                </div> */}
                {/* <div > */}
                    <form className='toolboxStyle' >
                        <input
                            placeholder={"Name this Location"}
                            type="text"
                            className="formStyle"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                         <Button variant="contained" color="primary" onClick={this.saveMarker} style={{margin: '0 10px'}}>Save marker</Button>
                         <Button variant="contained" color="secondary" onClick={this.deleteMarker} style={{margin: '0 10px'}}>delete</Button>
                         <Button variant="contained" color="purple" onClick={this.submitLocations} style={{margin: '0 10px'}}>Submit All Locations</Button>
                    </form>
                    {/* <br />
                     <div>Longitude: {this.state.lng} | Latitude: {this.state.lat}</div> 
                    <br /> */}
                   
                {/* </div> */}
                <div
                    ref={el => this.mapContainer = el}
                    className='mapContainer'
                    {...this.props}
                    onClick={this.onMapClicked} />
            </div>
        )
    }
};



export default AddPlacesMap;
