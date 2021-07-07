import React, { FunctionComponent } from "react";
import { TextField, Button } from "@material-ui/core";
import { InputType } from "./types";
import languageContext from "./contexts/languageContext";
import { getStringByLanguage } from "./helpers/strings";
import { useSuccess } from "./contexts/successContext";

const Input: FunctionComponent<InputType> = () => {
  const language = React.useContext(languageContext);
  const [success, setSuccess] = useSuccess();
  const [currentGuess, setCurrentGuess] = React.useState("");

  if (success) {
    return <div data-test="component-input" />;
  }

  return (
    <div data-test="component-input">
      <form action="">
        <TextField
          label="type a word"
          inputProps={{
            "data-test": "input-box",
          }}
          placeholder={getStringByLanguage(language, "guessInputPlaceholder")}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            event.preventDefault();
            setCurrentGuess("");
          }}
        >
          <div data-test="submit-button">
            {getStringByLanguage(language, "submit")}
          </div>
        </Button>
      </form>
    </div>
  );
};

export default Input;
