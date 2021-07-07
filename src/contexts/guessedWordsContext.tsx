import React, { FunctionComponent } from "react";
import { GuessedWordsType } from "../types";

const guessedWordsContext = React.createContext<
  | (
      | GuessedWordsType[]
      | React.Dispatch<React.SetStateAction<GuessedWordsType[]>>
    )[]
  | undefined
>(undefined);

const useGuessedWords = () => {
  const context = React.useContext(guessedWordsContext);
  if (!context) {
    throw new Error(
      "useGuessedWords must be used within UseGuessedWordsProvider"
    );
  }
  return context;
};

const GuessedWordsProvider: FunctionComponent = (props): JSX.Element => {
  const [guessedWords, setGuessedWords] = React.useState<GuessedWordsType[]>(
    []
  );

  const value = React.useMemo(
    () => [guessedWords, setGuessedWords],
    [guessedWords]
  );
  return (
    <guessedWordsContext.Provider value={value} {...props}>
      {props.children}
    </guessedWordsContext.Provider>
  );
};
const instruments = { GuessedWordsProvider, useGuessedWords };
export default instruments;
