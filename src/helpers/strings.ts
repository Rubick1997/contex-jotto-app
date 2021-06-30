const languageStrings = {
  en: {
    congrats: "Congratulations! You guessed the word!",
    submit: "Submit",
    guessPrompt: "Try to guess the secret word!",
    guessInputPlaceholder: "enter guess",
    guessColumnHeader: "Guessed Words",
    guessedWords: "Guesses",
    matchingLettersColumnHeader: "Matching Letters",
  },
  emoji: {
    congrats: "🎯🎉",
    submit: "🚀",
    guessPrompt: "🤔🤫🔤",
    guessInputPlaceholder: "⌨️🤔",
    guessedWords: "🤷‍🔤",
    guessColumnHeader: "🤷‍",
    matchingLettersColumnHeader: "✅",
  },
};

interface Languages {
  [key: string]: { [key: string]: string };
}

const getStringByLanguage = (
  languageCode: string,
  stringKey: string,
  strings: Languages = languageStrings
) => {
  if (!strings[languageCode] || !strings[languageCode][stringKey]) {
    return strings.en[stringKey];
  }
  return strings[languageCode][stringKey];
};

export { getStringByLanguage };
