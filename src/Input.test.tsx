import React, { ComponentState } from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import Input from "./Input";
import { InputType, Wrapper } from "./types";
import languageContext from "./contexts/languageContext";
import { SuccessProvider } from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

//if we want to use useState insea of React.useState
// const mockSetCurrentGuess = jest.fn();
// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useState:(initialState:string)=>[initialState,mockSetCurrentGuess]
// }));

const setup = ({ language, secretWord, success }: InputType) => {
  language = language || "en";
  secretWord = secretWord || "attack";
  success = success || false;
  return mount(
    <languageContext.Provider value={language}>
      <SuccessProvider value={[success, jest.fn()]}>
        <guessedWordsContext.GuessedWordsProvider>
          <Input secretWord={secretWord} />
        </guessedWordsContext.GuessedWordsProvider>
      </SuccessProvider>
    </languageContext.Provider>
  );
};

describe("render", () => {
  describe("success is true", () => {
    let wrapper: Wrapper;
    beforeEach(() => {
      wrapper = setup({ success: true });
    });

    test("renders without error", () => {
      const inputComponent = findByTestAttr(wrapper, "component-input");
      expect(inputComponent.length).toBe(1);
    });

    test("input box does not show", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.exists()).toBe(false);
    });

    test("submit button does not show", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.exists()).toBe(false);
    });
  });

  describe("success is false", () => {
    let wrapper: Wrapper;
    beforeEach(() => {
      wrapper = setup({ success: false });
    });

    test("renders without error", () => {
      const inputComponent = findByTestAttr(wrapper, "component-input");
      expect(inputComponent.length).toBe(1);
    });

    test("input box shows", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.exists()).toBe(true);
    });

    test("submit button shows", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.exists()).toBe(true);
    });
  });
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess: jest.Mock = jest.fn();
  let wrapper: Wrapper;
  let originalUseState: ComponentState;
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    originalUseState = React.useState;
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({});
  });

  afterEach(() => {
    React.useState = originalUseState;
  });
  test("state updates with value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");
    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });

  test("field is cleared upon submit button click", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click", { preventDefault() {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});

describe("languagePicker", () => {
  test("correctly renders submit string in English", () => {
    const wrapper = setup({ language: "en" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("Submit");
  });
  test("correctly renders submit string in emoji", () => {
    const wrapper = setup({ language: "emoji" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("🚀");
  });
});
