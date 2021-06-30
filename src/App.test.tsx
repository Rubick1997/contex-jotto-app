import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";
import { getSecretWord as mockGetSecretWord } from "./actions";
import { mocked } from "ts-jest/utils";
import React from "react";
import { Wrapper } from "./types";
//activate global mock
jest.mock("./actions");

const setup = () => {
  //use mount, because useEffect is not called on shallow
  return mount(<App />);
};

describe.each([
  [null, true, false],
  ["attack", false, true],
])("renders with secretWord as %s", (secretWord, loadingShows, appShows) => {
  let wrapper: Wrapper;
  let originalUserReducer: typeof React.useReducer;

  beforeEach(() => {
    originalUserReducer = React.useReducer;
    const mockUserReducer = jest
      .fn()
      .mockReturnValue([{ secretWord }, jest.fn()]);
    React.useReducer = mockUserReducer;
    wrapper = setup();
  });
  afterEach(() => {
    React.useReducer = originalUserReducer;
  });

  test(`renders loading spinner:${loadingShows}`, () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");
    expect(spinnerComponent.exists()).toBe(loadingShows);
  });

  test(`renders app`, () => {
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.exists()).toBe(appShows);
  });
});

describe("get Secret word", () => {
  beforeEach(() => {
    mocked(mockGetSecretWord).mockClear();
  });
  test("getSecretWord  on app mount", () => {
    const wrapper = setup();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });

  test("getSecretWord does not run on app update", () => {
    const wrapper = setup();
    mocked(mockGetSecretWord).mockClear();

    wrapper.setProps({});

    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});
