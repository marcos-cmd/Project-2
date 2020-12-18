import React, { useState, useEffect } from "react";
import ReactJoyride from "react-joyride";

const Tour = () => {
  const [joyride, setJoyride] = useState({
    run: false,
    steps: [
      {
        title: "Welcome to your Profile",
        target: "*",
        placement: "center",
        content: (
          <div>
            <h4>Getting Started</h4>
            <p>
              Follow this tour to find out all that you can do with our site. Go
              ahead and skip if this isn't your thing!
            </p>
          </div>
        ),
        disableBeacon: true,
      },
      {
        title: "Did you get tested for Covid?",
        target: ".makeStyles-resultForm-19",
        content:
          "Great! Let's track your results, and you can view them later. You can submit those here.",
      },
      {
        title: "Tested positive?",
        target: ".addLocations",
        content:
          "Go ahead and add locations you have been so others can avoid those spots. Don't worry user's can't see who submitted this information"
      },
      {
        title: "Symptoms? Find somewhere to get tested.",
        target: ".testingSites",
        content:
          "Here you can find the closest location. View their hours, phone number, and even their website to make the quickest appointment. ",
      },
      {
        title: "View Covid Hotspots",
        target: ".covidLocations",
        content:
          "Going somewhere today? Check here first to see if Covid has been present where you plan on going.",
      },
      {
        title: "Forgot what these icons mean?",
        target: ".menuIcon",
        content:
          "Click here to expand the sidebar, and see what each button does.",
      },
    ],
  });

  return (
    <React.Fragment>
      <div style={{ marginLeft: "10%", marginRight: "auto" }}>
        <button
          onClick={() => {
            setJoyride({ ...joyride, run: !joyride.run });
          }}
          style={{
            backgroundColor: "transparent",
            color: "#FF0344",
            border: "none",
            borderRight: "1px solid #FF0344",
            fontSize: "16px",
            padding: "5px 10px",
            cursor: "pointer",
            // borderRadius: "10px",
          }}
        >
          TOUR
        </button>
      </div>
      <ReactJoyride
        steps={joyride.steps}
        run={joyride.run}
        continuous
        showProgress
        showSkipButton
      />
    </React.Fragment>
  );
};

export default Tour;
