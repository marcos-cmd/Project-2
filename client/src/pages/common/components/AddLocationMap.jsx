import React, { Component } from 'react';
import Map, { Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import axios from 'axios';

const style = {
    width: '100%',
    height: '800px',
    position: 'relative',
    display: 'flex',
    'marginLeft': 'auto',
    'marginRight': 'auto'
}
const formStyle = {
    padding: '10px',
    fontSize: '1.3rem'
}

const styles = theme => ({
    buttonColor: {
        color: "green"
    }
});

const Markers = props => (
    props.markers.map((marker, index) =>
        <Marker
            {...props}
            key={index}
            title={marker.name}
            name={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={props.onMarkerClick}
        />
    )
);

// This componenet displays a map, form to save new markers, and markers that have user inputs
class Contents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            position: null,
            markers: [],
            markerPosition: { lat: "", lng: "" },
            initialCenter: { lat: 37.772745280512865, lng: -122.45085014991028 },
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            value: ""
        }

        // .bind(this) explanation:
        // Left of = refers to saveMarker()
        // Left "this" refers to Contents
        // Results in saveMarker() always referring to Contents when using "this"
        // This helps us access state properly no matter the context of where we call saveMarker()
        this.saveMarker = this.saveMarker.bind(this);
        this.deleteMarker = this.deleteMarker.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // Another way to achieve above results is to use 
        // an => function in the prop of the function where it is called
    }

    onSubmit(e) {
        e.preventDefault();
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    saveMarker() {
        let newWayPoint = {
            name: this.state.value,
            lat: this.state.markerPosition.lat,
            lng: this.state.markerPosition.lng,
        };
        this.setState({ markers: [...this.state.markers, newWayPoint], });
        console.log('these are markers', this.state.markers);
    };
    // Remember to filter out duplicate markers in final submit button function
    // Validation in form for the name of location
    deleteMarker() {
        this.setState({
            markerPosition: { lat: "", lng: "" }
        })
        let arr = this.state.markers
        arr.pop()
        this.setState({ markers: arr })
    }

    onMapClicked(props, map, e) {
        // console.log('hello')
        if (this.state.showingInfoWindow)
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
        let location = { lat: 0, lng: 0 };
        location.lat = e.latLng.lat();
        location.lng = e.latLng.lng();

        this.setState({
            markerPosition: location
        })
        console.log('I am the marker position', this.state.markerPosition);
    }
    onMarkerClick = (props, marker, e) => {
        console.log(props)
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
    onInfoWindowClose = () => {
        // console.log('onInfoWindowClose')
        this.setState({
            activeMarker: null,
            showingInfoWindow: false
        });
    }

    submitLocations = () => {
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

    render() {
        const { classes } = this.props;
        const { position } = this.state;
        const containerStyle = { position: 'relative' }
        return (
            <div>
                <div className="wrapper">
                    <form>
                        <input
                            placeholder={"Name this Location"}
                            type="text"
                            style={formStyle}
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </form>
                    <div>
                        <div>Lat: {this.state.markerPosition.lat}</div>
                        <div>Lng: {this.state.markerPosition.lng}</div>
                    </div>
                    <Button variant="contained" color="primary" onClick={this.saveMarker}>Save marker</Button>
                    <Button variant="contained" color="secondary" onClick={this.deleteMarker}>delete</Button>
                    <ThemeProvider >
                        <Button variant="contained" className={classes.buttonColor} onClick={this.submitLocations}>Submit All Locations</Button>
                    </ThemeProvider>

                </div>

                <div>
                    <Map
                        {...this.props}
                        initialCenter={this.state.initialCenter}
                        center={position}
                        centerAroundCurrentLocation={false}
                        containerStyle={containerStyle}
                        zoom={13.5}
                        style={style}
                        google={this.props.google}
                        onClick={this.onMapClicked}
                    >
                        {
                            this.state.markerPosition ?
                                <Marker position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }} name={'Current location'} />
                                : null
                        }
                        <Markers
                            onMarkerClick={this.onMarkerClick}
                            markers={this.state.markers}
                        />
                        <InfoWindow
                            marker={this.state.activeMarker}
                            onClose={this.onInfoWindowClose}
                            visible={this.state.showingInfoWindow}
                        >
                            <h1>hello from marker number {this.state.selectedPlace.name}</h1>
                        </InfoWindow>
                    </Map>
                </div>
            </div>
        );
    }
}
const AddLocationMap = props => (
    <Map className="map" google={props.google} visible={false}>
        <Contents {...props} />
    </Map>
);

const GoogleWrapperComponent = GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(AddLocationMap);

export default withStyles(styles, { withTheme: true })(GoogleWrapperComponent);


