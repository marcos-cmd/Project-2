import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import RoomIcon from "@material-ui/icons/Room";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

export default function MainListItems(props) {
  const username = localStorage.getItem("username");
  console.log("Params", username);
  return (
    <div>
      <ListItem
        component={Link}
        className="navLink"
        to={`/Profile/${username}`}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home/Current Cases" style={{color: 'black'}}/>
      </ListItem>
      <ListItem
        component={Link}
        className="navLink"
        activeStyle={{ color: "red" }}
        to={`/Profile/${username}/add-places`}
      >
        <ListItemIcon className="addLocations">
          <AddCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Add Visited Places" style={{color: 'black'}} />
      </ListItem>
      <ListItem
        className="navLink"
        to={`/Profile/${username}/testsite`}
        component={Link}
      >
        <ListItemIcon className="testingSites">
          <RoomIcon />
        </ListItemIcon>
        <ListItemText primary="View Testing Sites" style={{color: 'black'}}/>
      </ListItem>
      <ListItem
        component={Link}
        className="navLink"
        to={`/Profile/${username}/covid+locations`}
      >
        <ListItemIcon className="covidLocations">
          <BeenhereIcon />
        </ListItemIcon>
        <ListItemText primary="View Infected Places" style={{color: 'black'}}/>
      </ListItem>
    </div>
  );
}
