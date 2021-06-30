import React, { useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import "./App.css";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import { getSecretWord } from "./actions";

interface State {
  secretWord: string;
}

type Action = {
  type: string;
  payload: string;
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
  const [state, dispatch] = React.useReducer(reducer, { secretWord: "" });

  const success = false;
  const guessedWords: [] = [];

  const setSecretWord = (secretWord: string) => {
    dispatch({ type: "setSecretWord", payload: secretWord });
  };

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

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
