import React from "react";
import { CongratsType } from "./types";
import { Chip } from "@material-ui/core";

function Congrats({ success }: CongratsType) {
  if (success) {
    return (
      <div data-test="component-congrats">
        <span data-test="congrats-message">
          <Chip
            label="Congratulations! You guessed the world!"
            style={{ backgroundColor: "green" }}
          />
          Congratulations! You guessed the world!
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
}

export default Congrats;
