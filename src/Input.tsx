import React, { FunctionComponent } from "react";
import { TextField, Button } from "@material-ui/core";
import { InputType } from "./types";
import languageContext from "./contexts/languageContext";
import { getStringByLanguage } from "./helpers/strings";
import { useSuccess } from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";
import { getLetterMatchCount } from "./helpers";

const Input: FunctionComponent<InputType> = (props) => {
  const language = React.useContext(languageContext);
  const [success, setSuccess] = useSuccess();
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();
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
            let letterMatchCount;
            if (props.secretWord) {
              letterMatchCount = getLetterMatchCount(
                currentGuess,
                props.secretWord
              );
              const newGuessedWords = [
                ...guessedWords,
                {
                  guessedWord: currentGuess,
                  letterMatchCount: letterMatchCount,
                },
              ];
              setGuessedWords(newGuessedWords);
            }
            if (currentGuess === props.secretWord) {
              setSuccess(true);
            }
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
