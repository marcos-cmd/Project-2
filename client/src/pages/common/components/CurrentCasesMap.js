import React from 'react';
import mapboxgl from 'mapbox-gl';
import './TestSite.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

class CurrentCasesMap extends React.Component {
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
    // loadAPI = async () => {
    //     return await API.search()
    // };

    async componentDidMount() {
        // This function creates the map for the component to render later
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/marcos-cmd/ckic7a1gn1fnq19mlbinadamo',
            // center: [this.state.lng, this.state.lat],
            // zoom: this.state.zoom,
            // maxBounds: this.state.bounds
        });
        map.on('load', () => {
            map.getCanvas().style.cursor = 'default';
        })
        map.fitBounds([
            [-133.2421875, 16.972741],
            [-47.63671875, 52.696361]
        ]);
        const layers = [
            '0-10',
            '10-20',
            '20-50',
            '50-100',
            '100-200',
            '200-500',
            '500-1000',
            '1000+',
        ];
        const colors = [
            '#ffd149',
            '#ffa000',
            '#c67100',
            '#f05545',
            '#b71c1c',
            '#7f0000',
        ];
        // // create legend
        // for (i = 0; i < layers.length; i++) {
        //     var layer = layers[i];
        //     var color = colors[i];
        //     var item = document.createElement('div');
        //     var key = document.createElement('span');
        //     key.className = 'legend-key';
        //     key.style.backgroundColor = color;

        //     var value = document.createElement('span');
        //     value.innerHTML = layer;
        //     item.appendChild(key);
        //     item.appendChild(value);
        //     legend.appendChild(item);
        // };
        // change info window on hover
        // map.on('mousemove', function (e) {
        //     var states = map.queryRenderedFeatures(e.point, {
        //         layers: ['statedata']
        //     });

        //     if (states.length > 0) {
        //         document.getElementById('pd').innerHTML =
        //             '<h3><strong>' +
        //             states[0].properties.name +
        //             '</strong></h3><p><strong><em>' +
        //             states[0].properties.density +
        //             '</strong> people per square mile</em></p>';
        //     } else {
        //         document.getElementById('pd').innerHTML =
        //             '<p>Hover over a state!</p>';

        //     }
        // });

    }

    // The rendering of the following containers requires the css file, to render properly
    render() {
        return (
            <div>
                <h1>Current Cases</h1>
                <div className='sidebarStyle'>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                </div>
                <div class="map-overlay" id="legend">
                </div>
                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div >
        )
    }
}

export default CurrentCasesMap;
