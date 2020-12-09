import React from 'react';
import mapboxgl from 'mapbox-gl';
import './TestSite.css';
import { red } from '@material-ui/core/colors';

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
            map.on('mousemove', function (e) {
                var states = map.queryRenderedFeatures(e.point, {
                    layers: ['covid-cases']
                });

                // if (states.length > 0) {
                //     document.getElementById('pd').innerHTML = '<h3><strong>' + states[0].properties.name + '</strong></h3><p><strong><em>' + states[0].properties.density + '</strong> people per square mile</em></p>';
                // } else {
                //     document.getElementById('pd').innerHTML = '<p>Hover over a state!</p>';
                // }
            });
            map.fitBounds([
                [-133.2421875, 16.972741],
                [-47.63671875, 52.696361]
            ]);

        })


    }

    // The rendering of the following containers requires the css file, to render properly
    render() {
        const legendKeys = [
            { id: 1, layer: '0-341', color: '#ffd149' },
            { id: 2, layer: '341-1015', color: '#ffa000' },
            { id: 3, layer: '1015-2000', color: '#c67100' },
            { id: 4, layer: '2000-3174', color: '#c74200' },
            { id: 5, layer: '3174-5911', color: '#f05545' },
            { id: 6, layer: '5911-13319', color: '#b71c1c' },
            { id: 7, layer: '13319-288045', color: '#7f0000' },
        ];
        return (
            <div>
                <h1>Current Cases</h1>
                <div ref={el => this.mapContainer = el} className='mapContainer'>
                </div>
                <div class="map-overlay" id="legend">
                    <h3></h3>
                    {legendKeys.map(key => (<div key={red}> <span style={{ backgroundColor: key.color }} className="legend-key" ></span><span>{key.layer}</span></div>))}

                </div>
                <div class="embed-container">
                    <iframe width="500" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" title="COVID-19" src="https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"></iframe>
                </div>
            </div >

        )
    }
}

export default CurrentCasesMap;
