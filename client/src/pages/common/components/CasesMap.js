import React from 'react';
import mapboxgl from 'mapbox-gl';
import './TestSite.css';
import { red } from '@material-ui/core/colors';
import covidData from './covidData.GeoJSON';
import numeral from 'numeral';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

class CasesMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -122.431297,
            lat: 37.773972,
            zoom: 12,
            bounds: [[-180, 10],
            [-30, 75]],
            coords: [],
            stateData: [],
            features: [],
            hoverState: '',
            hoverStateCases: 0
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
            center: [-100, 38.88],
            zoom: 2,
            maxBounds: this.state.bounds
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
                        ['get', 'cases'],
                        'green',
                        5000,
                        '#ffd149',
                        10000,
                        '#ffa000',
                        50000,
                        '#c67100',
                        100000,
                        '#f05545',
                        200000,
                        '#c74200',
                        300000,
                        '#b71c1c',
                        500000,
                        '#7f0000',

                    ],
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        1,
                        0.5
                    ]
                }
            });
        });
        map.on('mousemove', (e) => {
            var thisColony = map.queryRenderedFeatures(e.point, {
                layers: ['states']
            });

            if (thisColony.length > 0) {
                this.setState({ hoverState: thisColony[0].properties.name });
                this.setState({ hoverStateCases: thisColony[0].properties.cases });
            }
        });
        map.getCanvas().style.cursor = 'default';
        var hoveredStateId = null;
        // When the user moves their mouse over the state-fill layer, we'll update the
        // feature state for the feature under the mouse.
        map.on('mousemove', 'states', function (e) {
            if (e.features.length > 0) {
                if (hoveredStateId) {
                    map.setFeatureState(
                        { source: 'covidCases', id: hoveredStateId },
                        { hover: false }
                    );
                }
                hoveredStateId = e.features[0].id;
                map.setFeatureState(
                    { source: 'covidCases', id: hoveredStateId },
                    { hover: true }
                );
            }
        });

        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        map.on('mouseleave', 'states', function () {
            if (hoveredStateId) {
                map.setFeatureState(
                    { source: 'covidCases', id: hoveredStateId },
                    { hover: false }
                );
            }
            hoveredStateId = null;
        });

    }
    // The rendering of the following containers requires the css file, to render properly
    render() {
        const legendKeys = [
            { id: 1, layer: '5,000', color: '#ffd149' },
            { id: 2, layer: '10,000', color: '#ffa000' },
            { id: 3, layer: '50,000', color: '#c67100' },
            { id: 4, layer: '100,000', color: '#f05545' },
            { id: 5, layer: '200,000', color: '#c74200' },
            { id: 6, layer: '30,0000', color: '#b71c1c' },
            { id: 7, layer: '500,000', color: '#7f0000' },
        ];
        return (
            <div>
                <h1>Choropleth Map</h1>
                <div ref={el => this.mapContainer = el} className='mapContainer' />
                <div class='map-overlay' id='features'><h2>State's Cases</h2><div id='pd'><p>Hover over a state!</p><h3>{this.state.hoverState}</h3><h4>{numeral(this.state.hoverStateCases).format("0,0")} Cases</h4></div></div>
                <div class="map-overlay" id="legend">
                    <h3></h3>
                    {legendKeys.map(key => (<div key={red}> <span style={{ backgroundColor: key.color }} className="legend-key" ></span><span>{key.layer}</span></div>))}

                </div>
            </div>
        )
    }
}

export default CasesMap;
