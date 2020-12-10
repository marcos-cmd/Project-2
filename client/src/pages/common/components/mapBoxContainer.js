import React from 'react';
import mapboxgl from 'mapbox-gl';
import API from '../../../utils/API';
import './TestSite.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -122.431297,
            lat: 37.773972,
            zoom: 12,
            bounds: [-122.517910874663, 37.6044780500533, -122.354995082683, 37.8324430069081],
            coords: [],
        };
    }
    // This function loads the API Request
    loadAPI = async () => {
        return await API.search()
    };

    async componentDidMount() {
        // This function creates the map for the component to render later
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
            maxBounds: this.state.bounds
        });
        // This function controls the top sidebar, sharing the user's coordinates and zoom
        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
        // this line saves the API request into coords
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
                link: coordinate.cta_link,
            }));

        // this line sets position array as the array 'coords' in our state
        this.setState({ coords: positionArray })

        // this function creates the markers and the popups 
        const createMarker = () => {
            this.state.coords.map((coord, index) => {
                console.log();
                const popup = new mapboxgl.Popup()
                    .setHTML(`<div><h1>${coord.name}</h1><br /><h2>${coord.address}</h2><br/><p>${coord.link}</p></div>`)
                const marker = new mapboxgl.Marker()
                    .setLngLat([coord.lng, coord.lat])
                    .setPopup(popup)
                    .addTo(map);
            });
        };
        createMarker();
    };
    // The rendering of the following containers requires the css file, to render properly
    render() {
        return (
            <div>
              <h1>Testing Sites</h1>
                <div className='sidebarStyle'>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                </div>
                <div ref={el => this.mapContainer = el} className='mapContainer'  />
            </div>
        )
    }
}

export default Application;
