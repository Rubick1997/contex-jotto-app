import React, { useEffect } from "react";
import { Container, CircularProgress } from "@material-ui/core";
import "./App.css";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import { getSecretWord } from "./actions";
import languageContext from "./contexts/languageContext";
import LanguagePicker from "./LanguagePicker";

export interface State {
  secretWord: string;
  language: string;
}

export type Action = {
  type: string;
  payload: string;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    case "setLanguage":
      return { ...state, language: action.payload };
    default:
      throw new Error(`Invalid action type:${action.type}`);
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: "",
    language: "en",
  });

  const success = false;
  const guessedWords: [] = [];

  const setSecretWord: React.Dispatch<any> = (secretWord: string) => {
    dispatch({ type: "setSecretWord", payload: secretWord });
  };

  const setLanguage: React.Dispatch<any> = (language: string) => {
    dispatch({ type: "setLanguage", payload: language });
  };

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  if (state.secretWord === null) {
    return (
      <Container data-test="spinner">
        <CircularProgress />
        <p>Loading secret word...</p>
      </Container>
    );
  }

  return (
    <Container data-test="component-app">
      <h1>Jotto</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <Congrats success={success} />
        <Input success={success} secretWord={state.secretWord} />
        <GuessedWords guessedWords={guessedWords} />
      </languageContext.Provider>
    </Container>
  );
}

export default App;
