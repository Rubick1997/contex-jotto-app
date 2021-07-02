import React, { FunctionComponent, Dispatch, SetStateAction } from "react";

const guessedWordsContext = React.createContext<
  (never[] | Dispatch<SetStateAction<never[]>>)[] | null
>(null);

const useGuessedWords = () => {
  const context = React.useContext(guessedWordsContext);
  if (!context) {
    throw new Error(
      "useGuessedWords must be used within UseGuessedWordsProvider"
    );
  }
  return context;
};

const GuessedWordsProvider: FunctionComponent = (
  props: Object
): JSX.Element => {
  const [guessedWords, setGuessedWords] = React.useState([]);

  const value = React.useMemo(
    () => [guessedWords, setGuessedWords],
    [guessedWords]
  );
  return <guessedWordsContext.Provider value={value} {...props} />;
};

export { GuessedWordsProvider, useGuessedWords };
