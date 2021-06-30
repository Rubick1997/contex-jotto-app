import React, { useEffect, useState } from "react";
import { Container, Grid } from "@material-ui/core";
import "./App.css";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import { getSecretWord } from "./actions";

function App() {
  const [secretWord, setSecretWord] = useState<string>("");
  const success = false;
  const guessedWords: [] = [];

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

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
