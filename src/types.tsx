import { ShallowWrapper, ReactWrapper } from "enzyme";

export interface LanguageContextType {
  success?: boolean;
  language?: string;
}

export interface GuessedWordsType {
  guessedWords: { guessedWord: string; letterMatchCount: number }[];
}

export interface InputType {
  language?: string;
  secretWord?: string;
  success?: boolean;
}

export type Wrapper = ShallowWrapper | ReactWrapper;
