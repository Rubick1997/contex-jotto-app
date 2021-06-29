import React, { useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import "./App.css";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import { getSecretWord } from "./actions";

function App() {
  const success = false;
  const secretWord = "titans";
  const guessedWords: [] = [];

  useEffect(() => {
    getSecretWord();
  },[])

  return (
    <Container data-test="component-app">
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input success={success} secretWord={secretWord} />
      <GuessedWords guessedWords={guessedWords} />
    </Container>
  );
}

export default App;
