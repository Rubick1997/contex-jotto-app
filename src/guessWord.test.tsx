import React from "react";
import { mount, ReactWrapper } from "enzyme";

import App from "./App";
import { findByTestAttr } from "../test/testUtils";

const setup = (state = {}) => {
  //apply state
  const wrapper = mount(<App />);

  //add value to input box
  const inputBox = findByTestAttr(wrapper, "input-box");
  inputBox.simulate("change", { target: { value: "hero" } });

  //simulate click on submit button
  const submitButton = findByTestAttr(wrapper, "submit-button");
  submitButton.simulate("click", { preventDefault() {} });

  return wrapper;
};

describe('invalid word guessed',() => {
  test.todo("guessedWords table does not get another row")
} )

describe.skip("no words guessed", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup({
      secretWord: "attack",
      success: false,
      guessedWords: [],
    });
  });

  test("creates GuessedWords table with one row", () => {
    const guessedWordRows = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordRows).toHaveLength(1);
  });
});

describe.skip("some words guessed", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup({
      secretWord: "attack",
      success: false,
      guessedWords: [{ guessedWord: "potter", letterMatchCount: 1 }],
    });
  });

  test("adds rows to guessedWords table", () => {
    const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordNodes).toHaveLength(2);
  });
});

describe.skip("guess secret word", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup({
      secretWord: "attack",
      success: false,
      guessedWords: [{ guessedWord: "potter", letterMatchCount: 1 }],
    });
    const inputBox = findByTestAttr(wrapper, "input-box");
    inputBox.simulate("change", { target: { value: "attack" } });

    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click", { preventDefault() {} });
  });

  test("adds rows to guesssed table", () => {
    const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordNodes).toHaveLength(3);
  });

  test("displays congrats component", () => {
    const congrats = findByTestAttr(wrapper, "component-congrats");
    expect(congrats.text().length).toBeGreaterThan(0);
  });

  test("does not display input component contents",() => {
    const inputBox = findByTestAttr(wrapper,"input-box");
    expect(inputBox.exists()).toBe(false);

    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.exists()).toBe(false)
  } )
});
