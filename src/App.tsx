import React, { useEffect } from "react";
import { Container, CircularProgress } from "@material-ui/core";
import "./App.css";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import { getSecretWord } from "./actions";

export interface State {
  secretWord: string | null;
}

export type Action = {
  type: string;
  payload: string | null;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    default:
      throw new Error(`Invalid action type:${action.type}`);
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null });

  const success = false;
  const guessedWords: [] = [];

  const setSecretWord = (secretWord: string) => {
    dispatch({ type: "setSecretWord", payload: secretWord });
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
      <Congrats success={success} />
      <Input success={success} secretWord={state.secretWord} />
      <GuessedWords guessedWords={guessedWords} />
    </Container>
  );
}

export default App;
