import React, { useState } from "react";
import mapboxgl from "mapbox-gl";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "./TestSite.css";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

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
      location: false,
      submitted: false,
      nameValidation: false,
    };
    this.saveMarker = this.saveMarker.bind(this);
    this.deleteMarker = this.deleteMarker.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  saveMarker() {
    let newMarker = {
      name: this.state.value,
      lat: this.state.lat,
      lng: this.state.lng,
    };
    //if statement makes it so there has to be a value before submit is pushed
    if (this.state.value) {
      this.setState({ recentMarker: newMarker });
      // console.log(newMarker);
      this.setState({ markers: [...this.state.markers, newMarker] });
      console.log("these are markers", this.state.markers);
      //this makes the snackbar open
      this.setState({ location: this.state.value });
      // this clears out the input value
      this.setState({ value: "" });
    } else {
      this.setState({ nameValidation: true });
    }


  }

  submitLocations = () => {
    console.log("submitted");

    this.state.markers.map(async (marker) => {
      const name = marker.name;
      const latitude = marker.lat;
      const longitude = marker.lng;

      try {
        const res = await axios.post(
          "/api/locations",
          { name, latitude, longitude },
          { headers: { authorization: localStorage.getItem("token") } }
        );
        console.log("this is res", res);
        //clearing out arr after sending to database
        this.setState({ markers: [] });
        this.setState({ submitted: true });
      } catch (error) {
        throw new Error(error);
      }

    });
  };

  deleteMarker() {
    this.setState({
      coordinates: { lat: "", lng: "" },
    });
    let arr = this.state.markers;
    arr.pop();
    this.setState({ markers: arr });
  }
  handleClose(event, reason) {
    console.log(this.state);
    if (reason === "clickaway") {
      return;
    }
    this.setState({ location: false });
    this.setState({ submitted: false });
    this.setState({ nameValidation: false });
  }


  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [-100, 38.88],
      zoom: 2,

    });
    // This function controls the top sidebar, sharing the user's coordinates and zoom
    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
    const marker = new mapboxgl.Marker({
      color: '#b71c1c',
      draggable: true,
    })
      .setLngLat([-100, 38.88])
      .addTo(map);
    const onDragEnd = () => {
      const coordinates = marker.getLngLat();
      console.log(coordinates);
      this.setState({
        lat: coordinates.lat,
        lng: coordinates.lng,
      });
    };
    marker.on("dragend", onDragEnd);
  }

  // The rendering of the following containers requires the css file, to render properly
  render() {
    return (
      <div>
        <h2>ADD PLACES</h2>
        <div className="root">
          <form className="toolboxStyle">
            <input
              placeholder={"Location Name"}
              type="text"
              className="formStyle"
              value={this.state.value}
              onChange={this.handleChange}
              size="15"
            />
            <Button
              variant="outline"
              onClick={this.saveMarker}
              style={{
                margin: "0 1px",
                color: "#00c3ff",
                border: "1px solid #00c3ff",
              }}
            >
              Save marker
            </Button>
            <Button
              variant="outline"
              onClick={this.deleteMarker}
              style={{ margin: "0 5px", color: "red", border: "1px solid red" }}
            >
              Delete Last
            </Button>
            <div className="markers">
              <h3
                style={{
                  textAlign: "center",
                  color: "black",
                  textDecoration: "underline",
                }}
              >
                Current Markers
              </h3>
              <ol>
                {this.state.markers.map((i) => (
                  <li style={{ fontSize: "18px", color: "black", listStylePosition: 'inside' }}>{i.name}</li>
                ))}
              </ol>
            </div>
            <Button
              variant="outline"
              onClick={this.submitLocations}
              style={{
                margin: "0 5px",
                color: "green",
                border: "1px solid green",
              }}
            >
              Submit All
            </Button>

            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={this.state.location}
              autoHideDuration={1500}
              onClose={this.handleClose}
            >
              <Alert severity="success">Marker saved!</Alert>
            </Snackbar>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={this.state.submitted}
              autoHideDuration={1500}
              onClose={this.handleClose}
            >
              <Alert severity="success">All markers have been submitted.</Alert>
            </Snackbar>

            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={this.state.nameValidation}
              autoHideDuration={1500}
              onClose={this.handleClose}
            >
              <Alert severity="error">Please enter name.</Alert>
            </Snackbar>
          </form>
          <div
            ref={(el) => (this.mapContainer = el)}
            className="mapContainer"
            {...this.props}
            onClick={this.onMapClicked}
          />
        </div>
      </div>
    );
  }
}

export default AddPlacesMap;
