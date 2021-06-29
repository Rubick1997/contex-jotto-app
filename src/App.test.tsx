import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";
import { getSecretWord as mockGetSecretWord } from "./actions";
import { mocked } from 'ts-jest/utils';
//activate global mock
jest.mock("./actions");

const setup = () => {
  //use mount, because useEffect is not called on shallow
  return mount(<App />);
};

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent).toHaveLength(3);
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
