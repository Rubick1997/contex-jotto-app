import React, { useEffect } from "react";
import { Container, CircularProgress } from "@material-ui/core";
import "./App.css";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import { getSecretWord } from "./actions";
import languageContext from "./contexts/languageContext";
import { SuccessProvider } from "./contexts/successContext";
import LanguagePicker from "./LanguagePicker";
import guessedWordsContext from "./contexts/guessedWordsContext";

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
      The secret word is  {state.secretWord}
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <guessedWordsContext.GuessedWordsProvider>
          <SuccessProvider>
            <Congrats />
            <Input secretWord={state.secretWord} />
          </SuccessProvider>
          <GuessedWords />
        </guessedWordsContext.GuessedWordsProvider>
      </languageContext.Provider>
    </Container>
  );
}

export default App;
