import React from "react";
import { TextField, Button } from "@material-ui/core";
import { InputType } from "./types";

function Input({
  success,
  secretWord,
}: InputType) {
  const [currentGuess, setCurrentGuess] = React.useState("");

  if (success) {
    return <div data-test="component-input" />;
  }

  return (
    <div data-test="component-input">
      <form action="">
        <TextField
          label="type a word"
          data-test="input-box"
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <Button
          data-test="submit-button"
          variant="contained"
          color="primary"
          onClick={(event) => {
            event.preventDefault();
            setCurrentGuess("");
          }}
        >
          Search
        </Button>
      </form>
    </div>
  );
}

export default Input;
