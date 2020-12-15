import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './TestSite.css';
import { red } from '@material-ui/core/colors';
import covidData from './covidData.GeoJSON';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -122.431297,
            lat: 37.773972,
            zoom: 12,
            // bounds: [-122.517910874663, 37.6044780500533, -122.354995082683, 37.8324430069081],
            coords: [],
            stateData: [],
            features: []
        };
    }
    // // This function loads the API Request
    // loadAPI = async () => {
    //     return await API.search()
    // };



    async componentDidMount() {
        const getCaseCount = async () => {
            await fetch("https://disease.sh/v3/covid-19/nyt/states?lastdays=1")
                .then((response) => response.json())

                .then((data) => {
                    // console.log('this is data', data)
                    const caseCount = data.map((colony) => (
                        {
                            id: colony.fips,
                            state: colony.state,
                            cases: colony.cases,
                            deaths: colony.deaths,
                        }
                    ));
                    this.setState({ stateData: caseCount })
                    console.log('this is caseCount', caseCount);
                    // const notCovidData = JSON.parse(covidData);
                    // this.setState({ features: notCovidData });
                    // console.log('this is features', this.state.features);
                    console.log('this is covidData', covidData);
                });
        };
        getCaseCount();

        function fetchJSON(url) {
            return fetch(url)
                .then(function (response) {
                    return response;
                });
        }
        const data = fetchJSON('https://raw.githubusercontent.com/DiegoFurtt/Covid-19-Choropleth-Map/master/covidData.geojson')
            .then(function (data) { return data })
        console.log('this is data', data);


        const switchData = () => {
            for (let i = 0; i < this.state.stateData.length; i++) {
                for (let j = 0; j < this.state.features.length; j++) {
                    if (this.state.stateData[i].id === this.state.features[j].id) {
                        return this.state.features[j].properties.density === this.state.stateData[i].cases;
                    }
                }
            }
        }
        switchData();
        console.log('this is features', this.state.features);


        // This function creates the map for the component to render later
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/dark-v10',
            // center: [this.state.lng, this.state.lat],
            // zoom: this.state.zoom,
            // maxBounds: this.state.bounds
        });
        // This function controls the top sidebar, sharing the user's coordinates and zoom
        map.on('load', function () {
            map.addSource('covidCases', {
                'type': 'geojson',
                'data': covidData,
            });
            map.addLayer({
                'id': 'states',
                'type': 'fill',
                'source': 'covidCases',
                'layout': {},
                'paint': {
                    'fill-color': [
                        'step',
                        ['get', 'density'],
                        'green',
                        6270,
                        'orange',
                        8000,
                        'red'
                    ],
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        .8,
                        0.5
                    ]
                }
            });
        });

    }
    // The rendering of the following containers requires the css file, to render properly
    render() {
        return (
            <div>
                <h1>Current Cases</h1>
                <div className='sidebarStyle'>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                </div>
                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        )
    }
}

export default Application;
