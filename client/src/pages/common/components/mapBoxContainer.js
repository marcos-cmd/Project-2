import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import testingLocations from './'
import API from '../../../utils/API';

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
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
            maxBounds: this.state.bounds
        });
        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

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
    render() {
        return (
            <div>
                <div className='sidebarStyle'>
                    {/* <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div> */}
                </div>
                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        )
    }
}

export default Application;
