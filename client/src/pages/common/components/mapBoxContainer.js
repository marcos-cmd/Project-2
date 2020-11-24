import React from 'react';
import ReactDom from 'react-dom';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = Process.env.REACT_APP_MAPBOX_API_KEY;

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2
        };
    }
    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
    }
}

ReactDOM.render(<Application />, document.getElementById('app'));
